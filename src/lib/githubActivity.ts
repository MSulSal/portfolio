export interface ActivityMetric {
  label: string;
  value: string;
}

export interface ActivityChartPoint {
  label: string;
  value: number;
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
  charts: {
    commitsByDay: ActivityChartPoint[];
    issuesByWeek: ActivityChartPoint[];
    commitsByRepo: ActivityChartPoint[];
  };
  context: {
    reposScanned: number;
    privateReposScanned: number;
    publicReposScanned: number;
    commitsLoaded: number;
    issuesClosedLoaded: number;
  };
  hasLiveData: boolean;
  fetchedAt: string;
}

interface GitHubRepo {
  full_name: string;
  pushed_at?: string | null;
  archived: boolean;
  private?: boolean;
}

interface GitHubCommit {
  sha: string;
  html_url: string;
  commit?: {
    message?: string;
    author?: {
      date?: string | null;
    };
  };
}

interface GitHubIssue {
  closed_at?: string | null;
  pull_request?: unknown;
}

const WINDOW_DAYS = 30;
const ISSUE_WEEKS = 8;
const TOP_REPOS = 8;
const MAX_FEED_ITEMS = 20;
const PER_PAGE = 100;
const REVALIDATE_SECONDS = 900;
const CONCURRENCY = 5;

function getAuthToken() {
  return (
    process.env.GH_ACTIVITY_FN_TOKEN ||
    process.env.GITHUB_ACTIVITY_TOKEN ||
    process.env.GITHUB_TOKEN ||
    ""
  );
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

function parseNextUrl(linkHeader: string | null): string | null {
  if (!linkHeader) {
    return null;
  }

  for (const rawPart of linkHeader.split(",")) {
    const part = rawPart.trim();
    if (!part.includes('rel="next"')) {
      continue;
    }

    const start = part.indexOf("<");
    const end = part.indexOf(">");

    if (start >= 0 && end > start) {
      return part.slice(start + 1, end);
    }
  }

  return null;
}

async function githubFetchPage<T>(
  url: string,
  token: string
): Promise<{ data: T; nextPageUrl: string | null }> {
  const response = await fetch(url, {
    headers: buildHeaders(token),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with ${response.status}`);
  }

  return {
    data: (await response.json()) as T,
    nextPageUrl: parseNextUrl(response.headers.get("link")),
  };
}

function sanitizeCommitMessage(message: string): string {
  const firstLine = message.split("\n")[0]?.trim() ?? "";
  return firstLine || "Commit message unavailable";
}

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

async function fetchRepos(username: string, token: string): Promise<GitHubRepo[]> {
  const fetchRepoPages = async (initialUrl: string) => {
    let nextUrl: string | null = initialUrl;
    const collected: GitHubRepo[] = [];

    while (nextUrl) {
      const page: { data: GitHubRepo[]; nextPageUrl: string | null } =
        await githubFetchPage<GitHubRepo[]>(nextUrl, token);

      collected.push(...(Array.isArray(page.data) ? page.data : []));
      nextUrl = page.nextPageUrl;
    }

    return collected;
  };

  const affiliation = "owner,collaborator,organization_member";
  const repos: GitHubRepo[] = [];

  if (token) {
    const privateRepos = await fetchRepoPages(
      `https://api.github.com/user/repos?visibility=private&sort=pushed&direction=desc&per_page=${PER_PAGE}&affiliation=${affiliation}`
    );
    const publicRepos = await fetchRepoPages(
      `https://api.github.com/user/repos?visibility=public&sort=pushed&direction=desc&per_page=${PER_PAGE}&affiliation=${affiliation}`
    );

    repos.push(...privateRepos, ...publicRepos);

    if (repos.length === 0) {
      const fallback = await fetchRepoPages(
        `https://api.github.com/user/repos?sort=pushed&direction=desc&per_page=${PER_PAGE}&affiliation=${affiliation}`
      );
      repos.push(...fallback);
    }
  } else {
    const publicOwnedRepos = await fetchRepoPages(
      `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=${PER_PAGE}&type=owner`
    );
    repos.push(...publicOwnedRepos);
  }

  const deduped = Array.from(
    repos.reduce((map, repo) => {
      if (!map.has(repo.full_name)) {
        map.set(repo.full_name, repo);
      }
      return map;
    }, new Map<string, GitHubRepo>()).values()
  );

  return deduped
    .filter((repo) => !repo.archived)
    .sort(
      (a, b) =>
        new Date(b.pushed_at || 0).getTime() - new Date(a.pushed_at || 0).getTime()
    );
}

async function fetchRepoCommits(
  repoFullName: string,
  token: string,
  sinceMs: number
): Promise<CommitFeedItem[]> {
  let nextUrl: string | null =
    `https://api.github.com/repos/${repoFullName}/commits?per_page=${PER_PAGE}`;
  const commits: CommitFeedItem[] = [];

  try {
    while (nextUrl) {
      const page: { data: GitHubCommit[]; nextPageUrl: string | null } =
        await githubFetchPage<GitHubCommit[]>(nextUrl, token);

      const pageItems = (Array.isArray(page.data) ? page.data : []).map((item) => {
        const createdAt = item.commit?.author?.date || "";

        return {
          id: `${repoFullName}-${item.sha}`,
          repo: repoFullName,
          message: sanitizeCommitMessage(item.commit?.message || ""),
          url: item.html_url,
          shortSha: item.sha.slice(0, 7),
          relativeTime: formatRelativeTime(createdAt),
          createdAt,
        };
      });

      if (pageItems.length === 0) {
        break;
      }

      commits.push(...pageItems);

      const oldestItem = pageItems[pageItems.length - 1];
      const oldestTimestamp = oldestItem?.createdAt
        ? new Date(oldestItem.createdAt).getTime()
        : Number.NEGATIVE_INFINITY;

      if (!Number.isNaN(oldestTimestamp) && oldestTimestamp < sinceMs) {
        break;
      }

      nextUrl = page.nextPageUrl;
    }

    return commits;
  } catch {
    return [];
  }
}

async function fetchClosedIssueTimestamps(
  repoFullName: string,
  token: string,
  sinceIso: string,
  sinceMs: number
): Promise<number[]> {
  let nextUrl: string | null =
    `https://api.github.com/repos/${repoFullName}/issues` +
    `?state=closed&since=${encodeURIComponent(sinceIso)}&per_page=${PER_PAGE}`;

  const closedAtTimestamps: number[] = [];

  try {
    while (nextUrl) {
      const page: { data: GitHubIssue[]; nextPageUrl: string | null } =
        await githubFetchPage<GitHubIssue[]>(nextUrl, token);

      for (const item of Array.isArray(page.data) ? page.data : []) {
        if (item.pull_request || !item.closed_at) {
          continue;
        }

        const closedAtMs = new Date(item.closed_at).getTime();
        if (!Number.isNaN(closedAtMs) && closedAtMs >= sinceMs) {
          closedAtTimestamps.push(closedAtMs);
        }
      }

      nextUrl = page.nextPageUrl;
    }

    return closedAtTimestamps;
  } catch {
    return [];
  }
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  if (items.length === 0) {
    return [];
  }

  const results = new Array<R>(items.length);
  let cursor = 0;

  const runWorker = async () => {
    while (true) {
      const index = cursor;
      cursor += 1;

      if (index >= items.length) {
        return;
      }

      results[index] = await worker(items[index]);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker())
  );

  return results;
}

function formatLabelDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function buildCommitsByDay(
  commits: CommitFeedItem[],
  sinceMs: number
): ActivityChartPoint[] {
  const dayMs = 24 * 60 * 60 * 1000;
  const buckets = Array.from({ length: WINDOW_DAYS }, (_, offset) => {
    const date = new Date(Date.now() - (WINDOW_DAYS - 1 - offset) * dayMs);
    const key = date.toISOString().slice(0, 10);
    return {
      key,
      label: formatLabelDate(date),
      value: 0,
    };
  });

  const bucketIndex = new Map<string, number>();
  buckets.forEach((bucket, index) => {
    bucketIndex.set(bucket.key, index);
  });

  for (const commit of commits) {
    const timestamp = new Date(commit.createdAt).getTime();
    if (Number.isNaN(timestamp) || timestamp < sinceMs) {
      continue;
    }

    const key = new Date(timestamp).toISOString().slice(0, 10);
    const index = bucketIndex.get(key);
    if (index === undefined) {
      continue;
    }

    buckets[index].value += 1;
  }

  return buckets.map((bucket) => ({
    label: bucket.label,
    value: bucket.value,
  }));
}

function buildIssuesByWeek(issueClosedAt: number[]): ActivityChartPoint[] {
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const startMs = Date.now() - ISSUE_WEEKS * weekMs;

  const buckets = Array.from({ length: ISSUE_WEEKS }, (_, index) => {
    const bucketStart = startMs + index * weekMs;
    return {
      start: bucketStart,
      end: bucketStart + weekMs,
      label: formatLabelDate(new Date(bucketStart)),
      value: 0,
    };
  });

  for (const closedAtMs of issueClosedAt) {
    if (Number.isNaN(closedAtMs) || closedAtMs < startMs) {
      continue;
    }

    for (const bucket of buckets) {
      if (closedAtMs >= bucket.start && closedAtMs < bucket.end) {
        bucket.value += 1;
        break;
      }
    }
  }

  return buckets.map((bucket) => ({
    label: bucket.label,
    value: bucket.value,
  }));
}

function buildCommitsByRepo(
  commits: CommitFeedItem[],
  sinceMs: number
): ActivityChartPoint[] {
  const counts = new Map<string, number>();

  for (const commit of commits) {
    const timestamp = new Date(commit.createdAt).getTime();
    if (Number.isNaN(timestamp) || timestamp < sinceMs) {
      continue;
    }

    counts.set(commit.repo, (counts.get(commit.repo) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_REPOS)
    .map(([label, value]) => ({ label, value }));
}

export async function getPortfolioActivity(
  username: string,
  projectCount: number
): Promise<PortfolioActivity> {
  const sinceMs = Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const sinceIso = new Date(sinceMs).toISOString();
  const token = getAuthToken();

  try {
    const repos = await fetchRepos(username, token);
    const repoNames = Array.from(new Set(repos.map((repo) => repo.full_name)));
    const privateReposScanned = repos.filter((repo) => Boolean(repo.private)).length;
    const publicReposScanned = repos.length - privateReposScanned;

    const commitsByRepo = await mapWithConcurrency(
      repoNames,
      CONCURRENCY,
      (repoName) => fetchRepoCommits(repoName, token, sinceMs)
    );

    const issueTimestampsByRepo = await mapWithConcurrency(
      repoNames,
      CONCURRENCY,
      (repoName) => fetchClosedIssueTimestamps(repoName, token, sinceIso, sinceMs)
    );

    const commits = commitsByRepo
      .flat()
      .filter((commit) => Boolean(commit.createdAt))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const issueTimestamps = issueTimestampsByRepo.flat();

    const commitsLast30Days = commits.filter((commit) => {
      const timestamp = new Date(commit.createdAt).getTime();
      return !Number.isNaN(timestamp) && timestamp >= sinceMs;
    }).length;

    const issuesClosedLast30Days = issueTimestamps.length;

    return {
      metrics: [
        { label: "Commits (30d)", value: String(commitsLast30Days) },
        { label: "Issues Closed (30d)", value: String(issuesClosedLast30Days) },
        { label: "Projects Overall", value: String(projectCount) },
      ],
      commits: commits.slice(0, MAX_FEED_ITEMS),
      charts: {
        commitsByDay: buildCommitsByDay(commits, sinceMs),
        issuesByWeek: buildIssuesByWeek(issueTimestamps),
        commitsByRepo: buildCommitsByRepo(commits, sinceMs),
      },
      context: {
        reposScanned: repoNames.length,
        privateReposScanned,
        publicReposScanned,
        commitsLoaded: commits.length,
        issuesClosedLoaded: issueTimestamps.length,
      },
      hasLiveData: repoNames.length > 0,
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
      charts: {
        commitsByDay: [],
        issuesByWeek: [],
        commitsByRepo: [],
      },
      context: {
        reposScanned: 0,
        privateReposScanned: 0,
        publicReposScanned: 0,
        commitsLoaded: 0,
        issuesClosedLoaded: 0,
      },
      hasLiveData: false,
      fetchedAt: new Date().toISOString(),
    };
  }
}
