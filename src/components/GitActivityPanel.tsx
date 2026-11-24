import AnimatedMetricValue from "@/components/AnimatedMetricValue";
import { profile } from "@/data/portfolioData";
import { getPortfolioActivity } from "@/lib/githubActivity";

export default async function GitActivityPanel() {
  const activity = await getPortfolioActivity(profile.githubUsername);

  return (
    <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <div>
        <a href={profile.github} className="link-inline text-sm">View GitHub profile</a>
        {activity.hasLiveData ? (
          <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {activity.metrics.map((item) => (
              <div key={item.label} className="surface-subtle p-3">
                <dt className="text-xs muted-text">{item.label}</dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums text-primary">
                  <span className="sr-only">{item.value}</span>
                  <span aria-hidden="true" className="motion-reduce:hidden"><AnimatedMetricValue value={item.value} /></span>
                  <span aria-hidden="true" className="hidden motion-reduce:inline">{item.value}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {activity.commits.length > 0 ? (
        <div className="surface-subtle p-4">
          <h3 id="recent-commits" className="text-sm font-semibold text-primary">Recent commits</h3>
          <div role="region" aria-labelledby="recent-commits" tabIndex={0} className="mt-2 max-h-64 overflow-y-auto overscroll-contain pr-2">
            <ul className="divide-y divide-[color:var(--border)]">
              {activity.commits.map((commit) => (
                <li key={commit.id} className="py-3">
                  <div className="flex flex-wrap justify-between gap-x-3 text-xs muted-text">
                    <span className="break-all font-mono">{commit.repo}</span>
                    <time dateTime={commit.createdAt}>{commit.relativeTime}</time>
                  </div>
                  <a href={commit.url} className="mt-1 inline-block break-words text-sm font-semibold text-primary hover:text-accent">
                    {commit.message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-sm muted-text">
          {activity.hasLiveData ? "No recent public commits to show." : "GitHub activity is temporarily unavailable."}
        </p>
      )}
    </div>
  );
}
