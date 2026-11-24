import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import GitActivityPanel from "@/components/GitActivityPanel";
import ProjectCard, { ProjectPreview } from "@/components/ProjectCard";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { profile, services } from "@/data/portfolioData";
import { getFeaturedProjectsFromGitHub } from "@/lib/githubPinnedProjects";

export default async function Home() {
  const { projects } = await getFeaturedProjectsFromGitHub(profile.githubUsername);
  const featured = projects.find((project) => project.preview);

  return (
    <main className="portfolio-shell">
      <section aria-labelledby="home-title" className={featured?.preview ? "portfolio-hero portfolio-hero-split" : "portfolio-hero"}>
        <div className="min-w-0">
          <p className="portfolio-label flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-accent">{profile.name}</span>
            <span aria-hidden="true">/</span>
            <span>{profile.title}</span>
          </p>
          <h1 id="home-title" className="portfolio-hero-title mt-5 text-primary">
            I build web apps and the systems behind them.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed muted-text sm:text-lg">
            Responsive interfaces, APIs, and integrations for customer-facing products and internal tools.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button asChild>
              <Link href="#selected-work" className="gap-2">
                View work <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Link href="/resume" className="font-semibold text-primary underline decoration-[color:var(--border)] underline-offset-4 hover:text-accent">
              Resume
            </Link>
          </div>
        </div>

        {featured?.preview ? (
          <Link href={`/projects/${featured.slug}`} className="hero-preview group min-w-0">
            <figure>
              <div className="hero-preview-frame">
                <div className="hero-preview-bar" aria-hidden="true">
                  <span /><span /><span />
                </div>
                <ProjectPreview preview={featured.preview} sizes="(max-width: 767px) 100vw, 55vw" priority />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm muted-text">
                <strong className="text-primary group-hover:text-accent">{featured.title}</strong>
                {featured.type ? <span>{featured.type}</span> : null}
                <ArrowRight className="size-4 text-accent" aria-hidden="true" />
                <span className="sr-only">Project details</span>
              </figcaption>
            </figure>
          </Link>
        ) : null}
      </section>

      <section id="selected-work" aria-labelledby="work-title" className="portfolio-section">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="work-title" className="h2-fluid text-primary">Selected work</h2>
          <Link href="/projects" className="link-inline inline-flex items-center gap-2 text-sm">
            All projects <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        {projects.length > 0 ? (
          <div className="work-grid mt-6">
            {projects.map((project) => <ProjectCard key={project.repoFullName} project={project} />)}
          </div>
        ) : (
          <p className="mt-5 muted-text">More work is available on <a href={profile.github} className="link-inline">GitHub</a>.</p>
        )}
      </section>

      <section aria-labelledby="capabilities-title" className="portfolio-section">
        <h2 id="capabilities-title" className="h2-fluid text-primary">What I build</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-3">
          {services.map((service) => (
            <li key={service.title}>
              <h3 className="text-lg text-primary">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed muted-text">{service.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="activity-title" className="portfolio-section">
        <h2 id="activity-title" className="h3-fluid text-primary">GitHub activity</h2>
        <Suspense fallback={<p className="mt-4 text-sm muted-text" role="status">Loading recent commits…</p>}>
          <GitActivityPanel />
        </Suspense>
      </section>

      <footer className="portfolio-section flex flex-wrap items-center justify-between gap-5">
        <Link href="/contact" className="link-inline inline-flex items-center gap-2">
          Get in touch <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Socials
          containerStyles="flex gap-3"
          iconStyles="flex size-10 items-center justify-center rounded-lg border border-[color:var(--border)] text-primary hover:border-accent hover:text-accent"
        />
      </footer>
    </main>
  );
}
