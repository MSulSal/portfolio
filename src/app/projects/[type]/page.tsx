import Link from "next/link";
import { notFound } from "next/navigation";

import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, portfolioProjects } from "@/data/portfolioData";

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    type: project.slug,
  }));
}

type ParamsPromise = Promise<{
  type: string;
}>;

export default async function ProjectDetailPage({
  params,
}: {
  params: ParamsPromise;
}) {
  const resolved = await params;
  const project = getProjectBySlug(resolved.type);

  if (!project) {
    notFound();
  }

  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto">
        <div className="max-w-5xl space-y-8">
          <Link href="/projects" className="link-inline text-sm uppercase tracking-[0.1em]">
            Back to projects
          </Link>

          <div className="surface-card p-7 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="chip">{project.status}</span>
                <h1 className="h1-fluid mt-4 text-primary">{project.name}</h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed muted-text">
                  {project.summary}
                </p>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="h3-fluid text-primary">Delivery highlights</h2>
              <ul className="mt-4 space-y-2 text-sm muted-text">
                {project.highlights.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="h3-fluid text-primary">Key outcomes</h2>
              <ul className="mt-4 space-y-2 text-sm muted-text">
                {project.proof.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="h3-fluid text-primary">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </section>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.live ? (
                <Button asChild>
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    Live Preview
                  </a>
                </Button>
              ) : null}

              {project.links.repo ? (
                <Button variant="outline" asChild>
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                    Repository
                  </a>
                </Button>
              ) : null}

              {project.links.docs ? (
                <Button variant="outline" asChild>
                  <a href={project.links.docs} target="_blank" rel="noopener noreferrer">
                    Docs or Repo
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
