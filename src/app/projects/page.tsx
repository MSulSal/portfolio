import Link from "next/link";

import { portfolioProjects } from "@/data/portfolioData";

const sectionOrder = [
  {
    track: "flagship",
    title: "Flagship",
    description:
      "Highest-signal project where architecture, delivery, and quality evidence are strongest.",
  },
  {
    track: "active",
    title: "Now Building",
    description:
      "Active projects that show current execution capability and implementation range.",
  },
  {
    track: "lab",
    title: "Labs",
    description:
      "Supporting tracks that prove technical depth and sustained learning velocity.",
  },
] as const;

const ProjectsPage = () => {
  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <span className="chip">Project index</span>
          <h1 className="h1-fluid mt-4 text-primary">
            Projects
          </h1>
          <p className="mt-4 text-base leading-relaxed muted-text">
            Flagship product first, active build lanes second, labs for
            long-horizon systems depth.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {sectionOrder.map((section) => {
            const projects = portfolioProjects.filter(
              (project) => project.track === section.track
            );

            if (projects.length === 0) {
              return null;
            }

            return (
              <section key={section.track} className="surface-card p-6 sm:p-7">
                <h2 className="h3-fluid text-primary">{section.title}</h2>
                <p className="mt-2 text-sm muted-text">{section.description}</p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {projects.map((project) => (
                    <article
                      key={project.slug}
                      className="surface-subtle p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="h3-fluid text-primary">{project.name}</h3>
                        <span className="chip">{project.status}</span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed muted-text">
                        {project.oneLiner}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[color:var(--border)] bg-[color:var(--code-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] muted-text"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="link-inline text-sm uppercase tracking-[0.1em]"
                        >
                          View details
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
