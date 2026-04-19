import Link from "next/link";

import ProofCharts from "@/components/ProofCharts";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import {
  employmentHistory,
  profile,
  technicalSkillGroups,
} from "@/data/portfolioData";
import { getPortfolioActivity } from "@/lib/githubActivity";
import { getFeaturedProjectsFromGitHub } from "@/lib/githubPinnedProjects";

const ResumePage = async () => {
  const [activity, featuredWork] = await Promise.all([
    getPortfolioActivity(profile.githubUsername),
    getFeaturedProjectsFromGitHub(profile.githubUsername),
  ]);
  const featuredProjects = featuredWork.projects;

  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto space-y-10">
        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Resume</span>
          <h1 className="h1-fluid mt-4 text-primary">
            Software engineer with strong frontend execution
          </h1>

          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            {profile.name}
          </p>
          <p className="mt-1 text-sm uppercase tracking-[0.08em] muted-text">
            {profile.location}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            <a href={`mailto:${profile.email}`} className="link-inline">
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              LinkedIn
            </a>
          </div>

          <p className="mt-4 max-w-4xl text-base leading-relaxed muted-text">
            Professional experience building responsive interfaces, integrating
            APIs, and shipping maintainable web products with React, Next.js,
            JavaScript, TypeScript, Node.js, and modern frontend tooling.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="/resume.pdf" download="Suleman-Saleem-Resume.pdf">
                Download resume PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">View projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </section>

        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Core skills</span>
          <h2 className="h2-fluid mt-4 text-primary">Technical stack</h2>
          <p className="mt-4 text-base leading-relaxed muted-text">
            Skills aligned to full-stack product delivery with strong frontend
            implementation.
          </p>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {technicalSkillGroups.map((group) => (
              <article key={group.id} className="surface-subtle p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                  {group.title}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <TechBadge key={skill} tech={skill} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Experience</span>
          <h2 className="h2-fluid mt-4 text-primary">Experience timeline</h2>

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
          <span className="chip">Selected projects</span>
          <h2 className="h2-fluid mt-4 text-primary">Selected projects</h2>
          {featuredProjects.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project) => (
                <article key={project.repoFullName} className="surface-subtle p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-primary">{project.title}</h3>
                    {project.type ? <span className="chip">{project.type}</span> : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed muted-text">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((skill) => (
                      <TechBadge key={`${project.repoFullName}-${skill}`} tech={skill} />
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.08em]">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-inline"
                    >
                      Repository
                    </a>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-inline"
                      >
                        Live demo
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-7 surface-subtle p-5">
              <p className="text-sm muted-text">
                Featured repositories are syncing from GitHub.
              </p>
            </div>
          )}

          {featuredWork.source !== "pinned" ? (
            <p className="mt-4 text-xs uppercase tracking-[0.08em] muted-text">
              Pinned repository sync unavailable; showing fallback repositories.
            </p>
          ) : null}
        </section>

        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Education</span>
          <h2 className="h2-fluid mt-4 text-primary">Education</h2>
          <p className="mt-4 text-base leading-relaxed muted-text">
            Education details and full credential formatting are included in the
            downloadable PDF resume.
          </p>
        </section>

        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Engineering activity</span>
          <h2 className="h2-fluid mt-4 text-primary">Delivery snapshot</h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed muted-text">
            Commit activity across connected repositories.
          </p>

          <div className="mt-7">
            <ProofCharts
              commitsByDay={activity.charts.commitsByDay}
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
          </div>

          <p className="mt-5 text-sm muted-text">
            Upwork profile:{" "}
            <a
              href={profile.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              View profile
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
