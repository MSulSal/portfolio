import TechBadge from "@/components/TechBadge";
import { profile } from "@/data/portfolioData";
import { getFeaturedProjectsFromGitHub } from "@/lib/githubPinnedProjects";

const ProjectsPage = async () => {
  const featuredWork = await getFeaturedProjectsFromGitHub(profile.githubUsername);
  const projects = featuredWork.projects;

  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <span className="chip">Projects</span>
          <h1 className="h1-fluid mt-4 text-primary">Projects</h1>
          <p className="mt-4 text-base leading-relaxed muted-text">
            Full-stack product work spanning responsive interfaces, APIs,
            integrations, data workflows, testing, and reliable delivery.
          </p>
        </div>

        <section className="mt-12 surface-card p-6 sm:p-7">
          <h2 className="h2-fluid text-primary">Featured Work</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed muted-text">
            Selected projects pulled from my current GitHub pinned repositories,
            emphasizing end-to-end engineering decisions and verifiable delivery
            across frontend, backend, data, and operations.
          </p>

          {projects.length > 0 ? (
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article key={project.repoFullName} className="surface-subtle p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="h3-fluid text-primary">{project.title}</h3>
                    {project.type ? <span className="chip">{project.type}</span> : null}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed muted-text">
                    {project.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 6).map((tech) => (
                      <TechBadge key={`${project.repoFullName}-${tech}`} tech={tech} />
                    ))}
                  </div>

                  {project.highlights.length > 0 ? (
                    <ul className="mt-4 space-y-2 text-sm muted-text">
                      {project.highlights.slice(0, 2).map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[0.08em]">
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
            <div className="mt-6 surface-subtle p-5">
              <p className="text-sm muted-text">
                GitHub featured projects are syncing. Check back shortly.
              </p>
            </div>
          )}

          {featuredWork.source !== "pinned" ? (
            <p className="mt-5 text-xs uppercase tracking-[0.08em] muted-text">
              Pinned repository data is temporarily unavailable; displaying a
              fallback repository list.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default ProjectsPage;
