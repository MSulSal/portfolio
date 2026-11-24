import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectPreview } from "@/components/ProjectCard";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolioData";
import { getFeaturedProjectsFromGitHub } from "@/lib/githubPinnedProjects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const [{ type }, { projects }] = await Promise.all([
    params,
    getFeaturedProjectsFromGitHub(profile.githubUsername),
  ]);
  const project = projects.find((item) => item.slug === type);

  if (!project) notFound();

  return (
    <main className="portfolio-shell pb-16 pt-12 sm:pt-16">
      <Link href="/projects" className="link-inline inline-flex items-center gap-2 text-sm">
        <ArrowLeft className="size-4" aria-hidden="true" /> All projects
      </Link>

      <article className="mt-7 max-w-5xl">
        {project.type ? <p className="portfolio-label">{project.type}</p> : null}
        <h1 className="h1-fluid mt-3 break-words text-primary">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed muted-text">{project.summary}</p>

        {project.tags.length > 0 ? (
          <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => <li key={tag}><TechBadge tech={tag} /></li>)}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {project.preferredCtaLabel || "Live demo"}
              </a>
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">Repository</a>
          </Button>
        </div>

        {project.preview ? (
          <figure className="mt-8 overflow-hidden rounded-xl border border-[color:var(--border)]">
            <ProjectPreview preview={project.preview} sizes="(max-width: 1023px) 92vw, 1024px" />
          </figure>
        ) : null}

        {project.highlights.length > 0 ? (
          <section className="portfolio-section mt-8 max-w-3xl" aria-labelledby="highlights-title">
            <h2 id="highlights-title" className="h3-fluid text-primary">Implementation highlights</h2>
            <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm leading-relaxed muted-text marker:text-accent">
              {project.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
