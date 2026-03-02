import Link from "next/link";

import TechBadge from "@/components/TechBadge";
import { portfolioProjects } from "@/data/portfolioData";

const sectionOrder = [
  {
    track: "flagship",
    title: "Featured Product",
    description:
      "End-to-end build with the strongest production architecture and delivery depth.",
  },
  {
    track: "active",
    title: "In Progress",
    description:
      "Current builds in active development across product and systems work.",
  },
  {
    track: "lab",
    title: "Technical Labs",
    description:
      "Exploratory tracks focused on systems depth, experiments, and fundamentals.",
  },
] as const;

const ProjectsPage = () => {
  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <span className="chip">Project index</span>
          <h1 className="h1-fluid mt-4 text-primary">Projects</h1>
          <p className="mt-4 text-base leading-relaxed muted-text">
            Featured product work first, current builds second, and technical
            labs as supporting depth.
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
                    <article key={project.slug} className="surface-subtle p-5">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="h3-fluid text-primary">{project.name}</h3>
                        <span className="chip">{project.status}</span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed muted-text">
                        {project.oneLiner}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.slice(0, 5).map((tech) => (
                          <TechBadge key={tech} tech={tech} />
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
