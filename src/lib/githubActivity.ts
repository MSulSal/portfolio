interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload?: {
    action?: string;
    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
}

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
const MAX_EVENTS = 100;
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

async function fetchPublicEvents(username: string): Promise<GitHubEvent[]> {
  const token = process.env.GITHUB_ACTIVITY_TOKEN || process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=${MAX_EVENTS}`,
    {
      headers,
      next: { revalidate: 900 },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub events request failed with ${response.status}`);
  }

  const data = (await response.json()) as GitHubEvent[];
  return Array.isArray(data) ? data : [];
}

export async function getPortfolioActivity(
  username: string,
  projectCount: number
): Promise<PortfolioActivity> {
  const now = Date.now();
  const since = now - WINDOW_DAYS * 24 * 60 * 60 * 1000;

  try {
    const events = await fetchPublicEvents(username);
    const commitMap = new Map<string, CommitFeedItem>();

    for (const event of events) {
      if (event.type !== "PushEvent") {
        continue;
      }

      for (const commit of event.payload?.commits ?? []) {
        if (!commit.sha || commitMap.has(commit.sha)) {
          continue;
        }

        commitMap.set(commit.sha, {
          id: `${event.id}-${commit.sha}`,
          repo: event.repo.name,
          message: sanitizeCommitMessage(commit.message),
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          shortSha: commit.sha.slice(0, 7),
          relativeTime: formatRelativeTime(event.created_at),
          createdAt: event.created_at,
        });
      }
    }

    const commits = Array.from(commitMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const commitsLast30Days = commits.filter(
      (commit) => new Date(commit.createdAt).getTime() >= since
    ).length;

    const issuesClosedLast30Days = events.filter(
      (event) =>
        event.type === "IssuesEvent" &&
        event.payload?.action === "closed" &&
        new Date(event.created_at).getTime() >= since
    ).length;

    return {
      metrics: [
        { label: "Commits (30d)", value: String(commitsLast30Days) },
        { label: "Issues Closed (30d)", value: String(issuesClosedLast30Days) },
        { label: "Projects Overall", value: String(projectCount) },
      ],
      commits: commits.slice(0, MAX_FEED_ITEMS),
      hasLiveData: true,
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
