import {
  projectPresentationOverrides,
  type ProjectPresentationOverride,
} from "@/data/projectOverrides";
import { pinnedProjectSnapshot } from "@/data/pinnedProjectSnapshot";

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
  preview?: ProjectPresentationOverride["preview"];
  workflow?: ProjectPresentationOverride["workflow"];
}

export interface FeaturedProjectsResult {
  projects: FeaturedProject[];
  source: "pinned" | "snapshot" | "none";
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
  visibility: "PUBLIC" | "PRIVATE" | "INTERNAL";
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

const REVALIDATE_SECONDS = 900;
const PINNED_LIMIT = 12;

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
    "next.js": "Next.js",
    nodejs: "Node.js",
    node: "Node.js",
    "node.js": "Node.js",
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
    sqlite: "SQLite",
    elementor: "Elementor",
  };

  if (Object.hasOwn(dictionary, normalized)) {
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
    liveUrl: normalizeHomepageUrl(
      override?.forceLiveUrl === undefined
        ? project.homepageUrl
        : override.forceLiveUrl ?? undefined
    ),
    updatedAt: project.updatedAt,
    featuredBadge: override?.featuredBadge,
    preferredCtaLabel: override?.preferredCtaLabel,
    preview: override?.preview,
    workflow: override?.workflow,
  };
}

async function fetchPinnedRepos(
  username: string,
  token: string
): Promise<RawRepoProject[]> {
  const query = `
    query PinnedRepositories($login: String!, $limit: Int!) {
      user(login: $login) {
        pinnedItems(first: $limit, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              nameWithOwner
              visibility
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
    signal: AbortSignal.timeout(5000),
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

  const nodes = payload.data?.user?.pinnedItems?.nodes;
  if (!Array.isArray(nodes)) {
    throw new Error("GitHub did not return a pinned repository list");
  }

  return nodes
    .filter((node): node is GitHubPinnedRepository => node?.visibility === "PUBLIC")
    .map(normalizeRepoFromPinned);
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

  if (token) {
    try {
      const pinnedRepos = await fetchPinnedRepos(username, token);
      return {
        projects: applyOverridesInOrder(pinnedRepos),
        source: "pinned",
      };
    } catch {
      // Use the public snapshot when authenticated pin sync is unavailable.
    }
  }

  if (username.toLowerCase() !== pinnedProjectSnapshot.username.toLowerCase()) {
    return { projects: [], source: "none" };
  }

  const fallback = pinnedProjectSnapshot.repos.map((repo) => {
    const fullName = `${pinnedProjectSnapshot.username}/${repo.name}`;
    return { ...repo, fullName, url: `https://github.com/${fullName}` };
  });
  return { projects: applyOverridesInOrder(fallback), source: "snapshot" };
}
