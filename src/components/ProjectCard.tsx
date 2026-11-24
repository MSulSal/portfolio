import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import TechBadge from "@/components/TechBadge";
import type { FeaturedProject } from "@/lib/githubPinnedProjects";

export function ProjectPreview({
  preview,
  sizes = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
  priority = false,
}: {
  preview: NonNullable<FeaturedProject["preview"]>;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={preview.src}
      alt={preview.alt}
      width={1280}
      height={800}
      sizes={sizes}
      priority={priority}
      className="block h-auto w-full"
    />
  );
}

export default function ProjectCard({ project }: { project: FeaturedProject }) {
  const detailsHref = `/projects/${project.slug}`;

  return (
    <article className="work-card">
      {project.preview ? (
        <div className="work-card-visual">
          <ProjectPreview preview={project.preview} />
        </div>
      ) : project.workflow ? (
        <div className="work-card-visual work-card-workflow">
          <p className="portfolio-label">{project.workflow.label}</p>
          <ol className="mt-3 flex flex-col gap-1 font-mono text-xs sm:text-sm">
            {project.workflow.steps.map((step, index) => (
              <li key={step}>
                {index > 0 ? <ArrowDown className="mb-1 size-3 text-accent" aria-hidden="true" /> : null}
                {step}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4 sm:px-3">
        <h3 className="text-xl text-primary sm:text-2xl">
          <Link href={detailsHref} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed muted-text">{project.summary}</p>
        {project.type ? <p className="portfolio-label mt-4">{project.type}</p> : null}

        {project.tags.length > 0 ? (
          <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag}><TechBadge tech={tag} /></li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline inline-flex items-center gap-1.5"
              aria-label={`${project.preferredCtaLabel || "Live demo"}: ${project.title}`}
            >
              {project.preferredCtaLabel || "Live demo"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          ) : null}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold muted-text hover:text-accent"
            aria-label={`Repository: ${project.title}`}
          >
            Repository
          </a>
        </div>
      </div>
    </article>
  );
}
