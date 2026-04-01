import Link from "next/link";

import ProofCharts from "@/components/ProofCharts";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import {
  employmentHistory,
  featuredProjects,
  profile,
  technicalSkillGroups,
} from "@/data/portfolioData";
import { getPortfolioActivity } from "@/lib/githubActivity";

const ResumePage = async () => {
  const activity = await getPortfolioActivity(profile.githubUsername);

  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto space-y-10">
        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Resume</span>
          <h1 className="h1-fluid mt-4 text-primary">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg font-semibold text-primary">{profile.title}</p>
          <p className="mt-1 text-sm uppercase tracking-[0.08em] muted-text">
            {profile.location}
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] muted-text">
            Target roles: Front End Developer, Full-Stack Engineer, Backend Engineer
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
            Full-stack software engineer with experience building responsive
            interfaces in React and Next.js, along with backend services and
            REST APIs in Node.js and Java/Spring Boot. Hands-on with
            WordPress, PHP, and Elementor for business-facing website delivery,
            with an emphasis on maintainable implementation, testing
            discipline, and clean handoff for non-technical stakeholders.
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
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="surface-subtle p-5">
                <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed muted-text">
                  {project.oneLiner}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((skill) => (
                    <TechBadge key={skill} tech={skill} />
                  ))}
                </div>
                <div className="mt-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="link-inline text-sm uppercase tracking-[0.08em]"
                  >
                    View project
                  </Link>
                </div>
              </article>
            ))}
          </div>
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
