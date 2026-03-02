import Link from "next/link";

import { Button } from "@/components/ui/button";
import { profile, proofPoints, roleTracks } from "@/data/portfolioData";

const ResumePage = () => {
  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto space-y-10">
        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Execution snapshot</span>
          <h1 className="h1-fluid mt-4 text-primary">
            Metrics and track record
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed muted-text">
            Current quality counters first, then capability-specific evidence.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {proofPoints.map((point) => (
              <article key={point.label} className="surface-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] muted-text">
                  {point.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  {point.value}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="/resume.pdf" download="Suleman-Saleem-Resume.pdf">
                Download resume PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Share project context</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {roleTracks.map((track) => (
            <article key={track.id} className="surface-card p-6">
              <span className="chip">{track.label}</span>
              <p className="mt-4 text-lg font-semibold text-primary">
                {track.summary}
              </p>
              <ul className="mt-4 space-y-2 text-sm muted-text">
                {track.topEvidence.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="surface-card p-7 sm:p-10">
          <h2 className="h2-fluid text-primary">Contact snapshot</h2>
          <p className="mt-4 text-base muted-text">
            {profile.name} | {profile.title} | {profile.location}
          </p>
          <p className="mt-2 text-base">
            <a href={`mailto:${profile.email}`} className="link-inline">
              {profile.email}
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[0.08em]">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-inline">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-inline">
              LinkedIn
            </a>
            <a href={profile.upwork} target="_blank" rel="noopener noreferrer" className="link-inline">
              Upwork
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
