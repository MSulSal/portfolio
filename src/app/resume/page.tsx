import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import ProofCharts from "@/components/ProofCharts";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import { employmentHistory, profile, technicalSkillGroups } from "@/data/portfolioData";
import { getPortfolioActivity } from "@/lib/githubActivity";

export const metadata: Metadata = { title: "Resume" };

async function DeliverySnapshot() {
  const activity = await getPortfolioActivity(profile.githubUsername);

  return activity.hasLiveData ? (
    <ProofCharts
      commitsByDay={activity.charts.commitsByDay}
      commitsByRepo={activity.charts.commitsByRepo}
    />
  ) : (
    <p className="text-sm muted-text">GitHub activity is temporarily unavailable.</p>
  );
}

export default function ResumePage() {
  return (
    <main className="portfolio-shell pb-16 pt-12 sm:pt-16">
      <header className="pb-8 sm:pb-10">
        <p className="portfolio-label">Resume</p>
        <h1 className="h1-fluid mt-3 text-primary">{profile.name}</h1>
        <p className="mt-3 text-lg font-semibold text-primary">{profile.title}</p>
        <p className="mt-1 text-sm muted-text">{profile.location}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 break-all text-sm">
          <a href={`mailto:${profile.email}`} className="link-inline">{profile.email}</a>
          <a href={profile.github} className="link-inline">GitHub</a>
          <a href={profile.linkedin} className="link-inline">LinkedIn</a>
          <a href={profile.upwork} className="link-inline">Upwork</a>
        </div>
        <p className="mt-5 max-w-[65ch] leading-relaxed muted-text">
          Professional experience building responsive React and Next.js interfaces, REST APIs, and database-backed workflows, with third-party integrations, automated tests, and production troubleshooting.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href="/resume.pdf" download="Suleman-Saleem-Full-Stack-Resume.pdf">Download resume PDF</a>
          </Button>
          <Button variant="outline" asChild><Link href="/projects">View projects</Link></Button>
          <Button variant="outline" asChild><Link href="/contact">Contact</Link></Button>
        </div>
      </header>

      <section aria-labelledby="experience-title" className="portfolio-section">
        <h2 id="experience-title" className="h2-fluid text-primary">Experience</h2>
        <div className="mt-6 grid gap-4">
          {employmentHistory.map((entry) => (
            <article key={entry.id} className="surface-subtle p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="text-lg text-primary">{entry.title}</h3>
                  <p className="text-sm muted-text">{entry.company}</p>
                </div>
                <p className="text-sm muted-text">{entry.period} · {entry.location}</p>
              </div>
              <ul className="mt-4 grid max-w-[95ch] list-disc gap-2 pl-4 text-sm leading-relaxed muted-text marker:text-accent">
                {entry.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-title" className="portfolio-section">
        <h2 id="skills-title" className="h2-fluid text-primary">Technical skills</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {technicalSkillGroups.map((group) => (
            <article key={group.id} className="surface-subtle p-5">
              <h3 className="text-base text-primary">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => <li key={skill}><TechBadge tech={skill} /></li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="education-title" className="portfolio-section">
        <h2 id="education-title" className="h2-fluid text-primary">Education</h2>
        <p className="mt-4 font-semibold text-primary">Bachelor of Science in Computer Science</p>
        <p className="mt-1 text-sm muted-text">University of North Texas · May 2021</p>
      </section>

      <section aria-labelledby="delivery-title" className="portfolio-section">
        <h2 id="delivery-title" className="h3-fluid text-primary">GitHub activity</h2>
        <div className="mt-5">
          <Suspense fallback={<p role="status" className="text-sm muted-text">Loading commit trends…</p>}>
            <DeliverySnapshot />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
