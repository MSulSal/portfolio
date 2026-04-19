import Link from "next/link";
import { notFound } from "next/navigation";

import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolioData";
import { getFeaturedProjectsFromGitHub } from "@/lib/githubPinnedProjects";

type ParamsPromise = Promise<{
  type: string;
}>;

export default async function ProjectDetailPage({
  params,
}: {
  params: ParamsPromise;
}) {
  const resolved = await params;
  const featuredWork = await getFeaturedProjectsFromGitHub(profile.githubUsername);
  const project = featuredWork.projects.find((item) => item.slug === resolved.type);

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
                <span className="chip">{project.type || "Project"}</span>
                <h1 className="h1-fluid mt-4 text-primary">{project.title}</h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed muted-text">
                  {project.summary}
                </p>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="h3-fluid text-primary">Delivery highlights</h2>
              {project.highlights.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm muted-text">
                  {project.highlights.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm muted-text">
                  Repository details are documented in GitHub, including current
                  implementation scope and delivery status.
                </p>
              )}
            </section>

            <section className="mt-8">
              <h2 className="h3-fluid text-primary">Repository</h2>
              <p className="mt-4 text-sm muted-text">{project.repoFullName}</p>
              {project.updatedAt ? (
                <p className="mt-1 text-sm muted-text">
                  Last updated:{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(project.updatedAt))}
                </p>
              ) : null}
            </section>

            <section className="mt-8">
              <h2 className="h3-fluid text-primary">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tech) => (
                  <TechBadge key={`${project.repoFullName}-${tech}`} tech={tech} />
                ))}
              </div>
            </section>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Preview
                  </a>
                </Button>
              ) : null}

              {project.repoUrl ? (
                <Button variant="outline" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    Repository
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
