import Link from "next/link";

import ProofCharts from "@/components/ProofCharts";
import { Button } from "@/components/ui/button";
import {
  employmentHistory,
  profile,
  skillRankings,
} from "@/data/portfolioData";
import { getPortfolioActivity } from "@/lib/githubActivity";

const ResumePage = async () => {
  const activity = await getPortfolioActivity(profile.githubUsername);

  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto space-y-10">
        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Engineering dashboard</span>
          <h1 className="h1-fluid mt-4 text-primary">
            Delivery trends and execution depth
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed muted-text">
            Interactive charts summarize commit cadence, issue resolution, and
            repository-level delivery distribution.
          </p>

          <div className="mt-7">
            <ProofCharts
              commitsByDay={activity.charts.commitsByDay}
              issuesByWeek={activity.charts.issuesByWeek}
              commitsByRepo={activity.charts.commitsByRepo}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.08em] muted-text">
            <span>
              Repos scanned: {activity.context.reposScanned} (
              {activity.context.privateReposScanned} private /{" "}
              {activity.context.publicReposScanned} public)
            </span>
            <span>Commits processed: {activity.context.commitsLoaded}</span>
            <span>Issues processed: {activity.context.issuesClosedLoaded}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="/resume.pdf" download="Suleman-Saleem-Resume.pdf">
                Download resume PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Share project context</Link>
            </Button>
          </div>
        </section>

        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Skill ranking</span>
          <h2 className="h2-fluid mt-4 text-primary">Core strengths from shipped work</h2>
          <p className="mt-4 text-base leading-relaxed muted-text">
            Ranked by demonstrated depth across active repositories and delivery outcomes.
          </p>

          <div className="mt-7 grid gap-5 xl:grid-cols-2">
            {skillRankings.map((skill) => (
              <article key={skill.id} className="surface-subtle p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-semibold text-primary">{skill.skill}</p>
                  <p className="text-sm font-semibold text-accent">{skill.score}/100</p>
                </div>

                <div className="mt-3 h-2 rounded-full bg-[color:var(--code-bg)]">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-relaxed muted-text">
                  {skill.summary}
                </p>
                <ul className="mt-3 space-y-2 text-sm muted-text">
                  {skill.evidence.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Employment history</span>
          <h2 className="h2-fluid mt-4 text-primary">Experience timeline</h2>
          <p className="mt-4 text-base leading-relaxed muted-text">
            Summary of recent roles and delivery context. Edit titles, dates, and outcomes as needed.
          </p>

          <div className="mt-7 space-y-5">
            {employmentHistory.map((entry) => (
              <article key={entry.id} className="surface-subtle p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-primary">{entry.title}</p>
                    <p className="text-sm font-semibold muted-text">{entry.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{entry.period}</p>
                    <p className="text-xs uppercase tracking-[0.08em] muted-text">
                      {entry.location}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm muted-text">
                  {entry.highlights.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card p-7 sm:p-10">
          <h2 className="h2-fluid text-primary">Contact snapshot</h2>
          <p className="mt-4 text-base muted-text">
            {profile.name} | {profile.title} | {profile.location}
          </p>
          <p className="mt-2 text-base">
            <a href={`mailto:${profile.email}`} className="link-inline">
              {profile.email}
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[0.08em]">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-inline">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-inline">
              LinkedIn
            </a>
            <a href={profile.upwork} target="_blank" rel="noopener noreferrer" className="link-inline">
              Upwork
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
