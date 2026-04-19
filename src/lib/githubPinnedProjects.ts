import {
  projectPresentationOverrides,
  type ProjectPresentationOverride,
} from "@/data/projectOverrides";

export interface FeaturedProject {
  slug: string;
  repoName: string;
  repoFullName: string;
  title: string;
  summary: string;
  type?: string;
  tags: string[];
  highlights: string[];
  repoUrl: string;
  liveUrl?: string;
  updatedAt?: string;
  featuredBadge?: string;
  preferredCtaLabel?: string;
}

export interface FeaturedProjectsResult {
  projects: FeaturedProject[];
  source: "pinned" | "recent-fallback" | "none";
  warning?: string;
}

interface RawRepoProject {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepageUrl?: string;
  primaryLanguage?: string;
  topics: string[];
  updatedAt?: string;
}

interface GitHubPinnedRepository {
  name: string;
  nameWithOwner: string;
  description?: string | null;
  url: string;
  homepageUrl?: string | null;
  pushedAt?: string | null;
  primaryLanguage?: {
    name?: string | null;
  } | null;
  repositoryTopics?: {
    nodes?: Array<{
      topic?: {
        name?: string | null;
      } | null;
    } | null> | null;
  } | null;
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<GitHubPinnedRepository | null> | null;
      } | null;
    } | null;
  };
  errors?: Array<{
    message?: string;
  }>;
}

interface GitHubRestRepo {
  name: string;
  full_name: string;
  description?: string | null;
  html_url: string;
  homepage?: string | null;
  language?: string | null;
  topics?: string[] | null;
  pushed_at?: string | null;
  archived?: boolean;
}

const REVALIDATE_SECONDS = 900;
const PINNED_LIMIT = 12;
const FALLBACK_LIMIT = 8;

function getAuthToken() {
  return (
    process.env.GITHUB_PINNED_REPOS_TOKEN ||
    process.env.GH_ACTIVITY_FN_TOKEN ||
    process.env.GITHUB_ACTIVITY_TOKEN ||
    process.env.GITHUB_TOKEN ||
    ""
  );
}

function buildHeaders(token: string): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

function formatTag(value: string): string {
  const normalized = normalizeToken(value);

  const dictionary: Record<string, string> = {
    js: "JavaScript",
    javascript: "JavaScript",
    ts: "TypeScript",
    typescript: "TypeScript",
    react: "React",
    nextjs: "Next.js",
    next: "Next.js",
    nodejs: "Node.js",
    node: "Node.js",
    wordpress: "WordPress",
    php: "PHP",
    html: "HTML",
    html5: "HTML5",
    css: "CSS",
    css3: "CSS3",
    dotnet: ".NET",
    mysql: "MySQL",
    postgresql: "PostgreSQL",
    api: "API",
    apis: "APIs",
  };

  if (dictionary[normalized]) {
    return dictionary[normalized];
  }

  return normalized
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function formatTitleFromRepoName(repoName: string): string {
  return repoName
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((segment) => {
      const upper = segment.toUpperCase();
      if (segment.length <= 4 && segment === upper) {
        return segment;
      }
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join(" ");
}

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeRepoFromPinned(repo: GitHubPinnedRepository): RawRepoProject {
  const topics =
    repo.repositoryTopics?.nodes
      ?.map((entry) => entry?.topic?.name || "")
      .filter(Boolean) || [];

  return {
    name: repo.name,
    fullName: repo.nameWithOwner,
    description: repo.description?.trim() || "",
    url: repo.url,
    homepageUrl: repo.homepageUrl || undefined,
    primaryLanguage: repo.primaryLanguage?.name || undefined,
    topics,
    updatedAt: repo.pushedAt || undefined,
  };
}

function normalizeRepoFromRest(repo: GitHubRestRepo): RawRepoProject {
  return {
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description?.trim() || "",
    url: repo.html_url,
    homepageUrl: repo.homepage || undefined,
    primaryLanguage: repo.language || undefined,
    topics: repo.topics || [],
    updatedAt: repo.pushed_at || undefined,
  };
}

function normalizeHomepageUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function applyOverride(
  project: RawRepoProject,
  override?: ProjectPresentationOverride
): FeaturedProject | null {
  if (override?.hidden) {
    return null;
  }

  const tags = Array.from(
    new Set(
      [
        ...(override?.tags || []),
        project.primaryLanguage || "",
        ...project.topics,
      ]
        .map((value) => value.trim())
        .filter(Boolean)
        .map(formatTag)
    )
  );

  return {
    slug: toSlug(project.name),
    repoName: project.name,
    repoFullName: project.fullName,
    title: override?.displayTitle || formatTitleFromRepoName(project.name),
    summary:
      override?.summary ||
      project.description ||
      "Repository details are available in GitHub.",
    type: override?.type,
    tags,
    highlights: override?.highlights || [],
    repoUrl: override?.forceRepoUrl || project.url,
    liveUrl: override?.forceLiveUrl || normalizeHomepageUrl(project.homepageUrl),
    updatedAt: project.updatedAt,
    featuredBadge: override?.featuredBadge,
    preferredCtaLabel: override?.preferredCtaLabel,
  };
}

async function fetchPinnedRepos(
  username: string,
  token: string
): Promise<RawRepoProject[]> {
  if (!token) {
    return [];
  }

  const query = `
    query PinnedRepositories($login: String!, $limit: Int!) {
      user(login: $login) {
        pinnedItems(first: $limit, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              nameWithOwner
              description
              url
              homepageUrl
              pushedAt
              primaryLanguage {
                name
              }
              repositoryTopics(first: 12) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify({
      query,
      variables: { login: username, limit: PINNED_LIMIT },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Pinned repo fetch failed (${response.status})`);
  }

  const payload = (await response.json()) as GitHubGraphQLResponse;
  if (payload.errors?.length) {
    const message = payload.errors
      .map((entry) => entry.message || "Unknown GraphQL error")
      .join("; ");
    throw new Error(message);
  }

  const nodes = payload.data?.user?.pinnedItems?.nodes || [];
  return nodes
    .filter((node): node is GitHubPinnedRepository => Boolean(node?.name))
    .map(normalizeRepoFromPinned);
}

async function fetchFallbackRepos(
  username: string,
  token: string
): Promise<RawRepoProject[]> {
  const endpoint = token
    ? `https://api.github.com/user/repos?sort=updated&direction=desc&per_page=${FALLBACK_LIMIT}&affiliation=owner,collaborator,organization_member`
    : `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${FALLBACK_LIMIT}&type=owner`;

  const response = await fetch(endpoint, {
    headers: buildHeaders(token),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Fallback repo fetch failed (${response.status})`);
  }

  const repos = (await response.json()) as GitHubRestRepo[];
  return (Array.isArray(repos) ? repos : [])
    .filter((repo) => !repo.archived)
    .map(normalizeRepoFromRest);
}

function applyOverridesInOrder(repos: RawRepoProject[]): FeaturedProject[] {
  const result: FeaturedProject[] = [];

  for (const repo of repos) {
    const override = projectPresentationOverrides[repo.name.toLowerCase()];
    const project = applyOverride(repo, override);
    if (!project) {
      continue;
    }
    result.push(project);
  }

  return result;
}

export async function getFeaturedProjectsFromGitHub(
  username: string
): Promise<FeaturedProjectsResult> {
  const token = getAuthToken();

  try {
    const pinnedRepos = await fetchPinnedRepos(username, token);
    if (pinnedRepos.length > 0) {
      return {
        projects: applyOverridesInOrder(pinnedRepos),
        source: "pinned",
      };
    }
  } catch (error: unknown) {
    const warning =
      error instanceof Error ? error.message : "Unable to fetch pinned repositories.";

    try {
      const fallbackRepos = await fetchFallbackRepos(username, token);
      return {
        projects: applyOverridesInOrder(fallbackRepos),
        source: "recent-fallback",
        warning,
      };
    } catch {
      return {
        projects: [],
        source: "none",
        warning,
      };
    }
  }

  try {
    const fallbackRepos = await fetchFallbackRepos(username, token);
    return {
      projects: applyOverridesInOrder(fallbackRepos),
      source: "recent-fallback",
      warning:
        "Pinned repositories are unavailable without a GitHub token. Showing recently updated repositories.",
    };
  } catch {
    return {
      projects: [],
      source: "none",
      warning:
        "No GitHub project data is currently available. Check token and API limits.",
    };
  }
}
