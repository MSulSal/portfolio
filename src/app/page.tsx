import Link from "next/link";

import GitActivityPanel from "@/components/GitActivityPanel";
import Socials from "@/components/Socials";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import { profile, services } from "@/data/portfolioData";
import { getFeaturedProjectsFromGitHub } from "@/lib/githubPinnedProjects";

const Home = async () => {
  const featuredWork = await getFeaturedProjectsFromGitHub(profile.githubUsername);
  const featuredProjects = featuredWork.projects;

  return (
    <main>
      <section className="section-wrap pb-12 pt-16">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div className="space-y-7">
            <span className="chip">
              Full-Stack Software Engineer | React, Next.js, Node.js, APIs & SQL
            </span>

            <h1 className="h1-fluid max-w-4xl text-primary">
              Full-stack product engineering from responsive UI to APIs, data,
              and production delivery.
            </h1>

            <p className="max-w-3xl text-base font-medium muted-text">
              I&apos;m a full-stack software engineer with professional experience
              building React and Next.js interfaces, API and microservice
              workflows, SQL-backed systems, third-party integrations, tests,
              and CI/CD paths. I connect the layers needed to ship reliable web
              products and troubleshoot them in production.
            </p>

            <div className="code-panel max-w-3xl">
              <p className="uppercase tracking-[0.1em] muted-text">
                full-stack delivery focus
              </p>
              <pre className="mt-3 overflow-auto whitespace-pre-wrap text-primary">
                {`React/Next.js UI -> API and webhook services -> SQL-backed workflows -> testing and CI/CD -> production support`}
              </pre>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/projects">View projects</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/resume">View resume</Link>
              </Button>
              <Link href="/contact" className="link-inline text-sm uppercase tracking-[0.1em]">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] muted-text">
                References
              </p>
              <Socials
                containerStyles="flex gap-3"
                iconStyles="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-primary hover:border-accent hover:text-accent"
              />
            </div>
          </div>

          <GitActivityPanel />
        </div>
      </section>

      <section className="section-wrap py-12">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="chip">Selected work</p>
              <h2 className="h2-fluid mt-4 text-primary">Selected projects</h2>
            </div>
            <Link href="/projects" className="link-inline">
              View full project index
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project) => (
                <article key={project.repoFullName} className="surface-card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl text-primary">{project.title}</h3>
                    {project.type ? <span className="chip">{project.type}</span> : null}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed muted-text">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 5).map((tag) => (
                      <TechBadge key={`${project.repoFullName}-${tag}`} tech={tag} />
                    ))}
                  </div>
                  {project.highlights.length > 0 ? (
                    <ul className="mt-5 space-y-2 text-sm muted-text">
                      {project.highlights.slice(0, 2).map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[0.08em]">
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
            <div className="surface-card p-6">
              <p className="text-sm muted-text">
                Featured repositories are syncing from GitHub.
              </p>
            </div>
          )}

          {featuredWork.source !== "pinned" ? (
            <p className="mt-4 text-xs uppercase tracking-[0.08em] muted-text">
              GitHub pinned sync unavailable; showing fallback repository data.
            </p>
          ) : null}
        </div>
      </section>

      <section className="section-wrap py-12">
        <div className="container mx-auto">
          <div className="surface-card p-7">
            <p className="chip">Services</p>
            <h2 className="h2-fluid mt-4 text-primary">Ways I can help</h2>
            <ul className="mt-5 space-y-4">
              {services.map((service) => (
                <li key={service.title}>
                  <p className="text-lg font-semibold text-primary">
                    {service.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed muted-text">
                    {service.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
