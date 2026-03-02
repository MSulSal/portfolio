import AnimatedMetricValue from "@/components/AnimatedMetricValue";
import { profile, portfolioProjects } from "@/data/portfolioData";
import { getPortfolioActivity } from "@/lib/githubActivity";
import { ScrollArea } from "@/components/ui/scroll-area";

const GitActivityPanel = async () => {
  const activity = await getPortfolioActivity(
    profile.githubUsername,
    portfolioProjects.length
  );

  return (
    <aside className="surface-card p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="chip">Live activity</p>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline text-xs uppercase tracking-[0.08em]"
        >
          GitHub
        </a>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {activity.metrics.map((item) => (
          <div key={item.label} className="surface-subtle p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] muted-text">
              {item.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-primary">
              <AnimatedMetricValue value={item.value} />
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] muted-text">
          Recent commits
        </p>

        <ScrollArea className="mt-3 h-[320px] pr-2">
          {activity.commits.length > 0 ? (
            <ul className="space-y-3">
              {activity.commits.map((commit) => (
                <li key={commit.id} className="surface-subtle p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold uppercase tracking-[0.08em] muted-text">
                      {commit.repo}
                    </p>
                    <span className="text-xs muted-text">{commit.relativeTime}</span>
                  </div>

                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm font-semibold text-primary hover:text-accent"
                  >
                    {commit.message}
                  </a>

                  <p className="mt-2 text-[11px] font-mono muted-text">
                    {commit.shortSha}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="surface-subtle p-4">
              <p className="text-sm muted-text">
                No recent commits were found for the connected repositories.
              </p>
            </div>
          )}
        </ScrollArea>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.08em] muted-text">
        {activity.context.reposScanned} repos scanned (
        {activity.context.privateReposScanned} private /{" "}
        {activity.context.publicReposScanned} public)
      </p>

      {!activity.hasLiveData ? (
        <p className="mt-4 text-xs muted-text">
          Live metrics could not be fetched. Ensure `GH_ACTIVITY_FN_TOKEN`
          (or `GITHUB_ACTIVITY_TOKEN`) has repository access.
        </p>
      ) : null}
    </aside>
  );
};

export default GitActivityPanel;
