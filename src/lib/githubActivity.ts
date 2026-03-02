export interface ActivityMetric {
  label: string;
  value: string;
}

export interface CommitFeedItem {
  id: string;
  repo: string;
  message: string;
  url: string;
  shortSha: string;
  relativeTime: string;
  createdAt: string;
}

export interface PortfolioActivity {
  metrics: ActivityMetric[];
  commits: CommitFeedItem[];
  hasLiveData: boolean;
  fetchedAt: string;
}

const WINDOW_DAYS = 30;
const MAX_REPOS_WITH_TOKEN = 12;
const MAX_REPOS_NO_TOKEN = 4;
const MAX_COMMITS_PER_REPO = 30;
const MAX_ISSUES_PER_REPO = 100;
const MAX_FEED_ITEMS = 25;

function formatRelativeTime(dateInput: string): string {
  const time = new Date(dateInput).getTime();

  if (Number.isNaN(time)) {
    return "Unknown time";
  }

  const diffMs = Date.now() - time;
  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;

  if (diffMs < minuteMs) {
    return "Just now";
  }

  if (diffMs < hourMs) {
    return `${Math.floor(diffMs / minuteMs)}m ago`;
  }

  if (diffMs < dayMs) {
    return `${Math.floor(diffMs / hourMs)}h ago`;
  }

  if (diffMs < 14 * dayMs) {
    return `${Math.floor(diffMs / dayMs)}d ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(time));
}

function sanitizeCommitMessage(message: string): string {
  const firstLine = message.split("\n")[0]?.trim() ?? "";
  return firstLine || "Commit message unavailable";
}

function getAuthToken() {
  return process.env.GITHUB_ACTIVITY_TOKEN || process.env.GITHUB_TOKEN || "";
}

function buildHeaders(token: string): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function githubFetch<T>(url: string, token: string): Promise<T> {
  const response = await fetch(url, {
    headers: buildHeaders(token),
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

interface GitHubRepo {
  full_name: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
}

interface GitHubCommit {
  sha: string;
  html_url: string;
  commit?: {
    message?: string;
    author?: {
      date?: string;
    };
  };
}

interface GitHubIssue {
  closed_at?: string | null;
  pull_request?: unknown;
}

async function fetchRepos(username: string, token: string): Promise<GitHubRepo[]> {
  const endpoint = token
    ? "https://api.github.com/user/repos?sort=pushed&direction=desc&per_page=100&type=owner"
    : `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100&type=owner`;

  const repos = await githubFetch<GitHubRepo[]>(endpoint, token);

  return (Array.isArray(repos) ? repos : [])
    .filter((repo) => !repo.archived && !repo.fork)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );
}

async function fetchRepoCommits(
  repoFullName: string,
  username: string,
  token: string
): Promise<CommitFeedItem[]> {
  const endpoint =
    `https://api.github.com/repos/${repoFullName}/commits` +
    `?author=${encodeURIComponent(username)}&per_page=${MAX_COMMITS_PER_REPO}`;

  try {
    const commits = await githubFetch<GitHubCommit[]>(endpoint, token);

    return (Array.isArray(commits) ? commits : []).map((commit) => {
      const createdAt = commit.commit?.author?.date || "";

      return {
        id: `${repoFullName}-${commit.sha}`,
        repo: repoFullName,
        message: sanitizeCommitMessage(commit.commit?.message || ""),
        url: commit.html_url,
        shortSha: commit.sha.slice(0, 7),
        relativeTime: formatRelativeTime(createdAt),
        createdAt,
      };
    });
  } catch {
    return [];
  }
}

async function fetchClosedIssuesCount(
  repoFullName: string,
  sinceIso: string,
  token: string
): Promise<number> {
  const endpoint =
    `https://api.github.com/repos/${repoFullName}/issues` +
    `?state=closed&since=${encodeURIComponent(sinceIso)}&per_page=${MAX_ISSUES_PER_REPO}`;

  try {
    const issues = await githubFetch<GitHubIssue[]>(endpoint, token);

    return (Array.isArray(issues) ? issues : []).filter((issue) => {
      if (issue.pull_request) {
        return false;
      }

      if (!issue.closed_at) {
        return false;
      }

      return new Date(issue.closed_at).getTime() >= new Date(sinceIso).getTime();
    }).length;
  } catch {
    return 0;
  }
}

export async function getPortfolioActivity(
  username: string,
  projectCount: number
): Promise<PortfolioActivity> {
  const now = Date.now();
  const since = now - WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const sinceIso = new Date(since).toISOString();
  const token = getAuthToken();
  const repoLimit = token ? MAX_REPOS_WITH_TOKEN : MAX_REPOS_NO_TOKEN;

  try {
    const repos = await fetchRepos(username, token);
    const targetRepos = repos.slice(0, repoLimit);

    const [commitsByRepo, closedIssueCounts] = await Promise.all([
      Promise.all(
        targetRepos.map((repo) => fetchRepoCommits(repo.full_name, username, token))
      ),
      Promise.all(
        targetRepos.map((repo) =>
          fetchClosedIssuesCount(repo.full_name, sinceIso, token)
        )
      ),
    ]);

    const commits = commitsByRepo
      .flat()
      .filter((commit) => Boolean(commit.createdAt))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const commitsLast30Days = commits.filter(
      (commit) => new Date(commit.createdAt).getTime() >= since
    ).length;

    const issuesClosedLast30Days = closedIssueCounts.reduce(
      (total, value) => total + value,
      0
    );

    return {
      metrics: [
        { label: "Commits (30d)", value: String(commitsLast30Days) },
        { label: "Issues Closed (30d)", value: String(issuesClosedLast30Days) },
        { label: "Projects Overall", value: String(projectCount) },
      ],
      commits: commits.slice(0, MAX_FEED_ITEMS),
      hasLiveData: targetRepos.length > 0,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return {
      metrics: [
        { label: "Commits (30d)", value: "N/A" },
        { label: "Issues Closed (30d)", value: "N/A" },
        { label: "Projects Overall", value: String(projectCount) },
      ],
      commits: [],
      hasLiveData: false,
      fetchedAt: new Date().toISOString(),
    };
  }
}
