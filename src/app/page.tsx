import Link from "next/link";

import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import {
  activeExecutionLane,
  featuredProjects,
  labTracks,
  profile,
  proofPoints,
  services,
} from "@/data/portfolioData";

const Home = () => {
  return (
    <main>
      <section className="section-wrap pb-12 pt-16">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div className="space-y-7">
            <span className="chip">Shipping full-stack systems</span>

            <h1 className="h1-fluid max-w-4xl text-primary">
              Built systems. Tested paths. Production-ready handoff.
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed muted-text">
              22 Postgres domain tables, 48 RLS policies, 146 pgTAP assertions,
              and CI gates from lint to E2E.
            </p>

            <p className="max-w-3xl text-base font-medium muted-text">
              {profile.focus}
            </p>

            <div className="code-panel max-w-3xl">
              <p className="uppercase tracking-[0.1em] muted-text">
                core loop
              </p>
              <pre className="mt-3 overflow-auto whitespace-pre-wrap text-primary">
                {`scope() -> implement() -> test() -> ship() -> document()`}
              </pre>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/projects">Review projects</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Talk about your project</Link>
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] muted-text">
                References
              </p>
              <Socials
                containerStyles="flex gap-3"
                iconStyles="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-primary hover:border-accent hover:text-accent"
              />
            </div>
          </div>

          <aside className="surface-card p-6 sm:p-7">
            <p className="chip">Execution baseline</p>
            <ul className="mt-4 space-y-2 text-sm muted-text">
              <li>- Clear architecture and API contracts.</li>
              <li>- Test-first delivery with visible quality gates.</li>
              <li>- Predictable communication and scope tracking.</li>
              <li>- Production-ready handoff, not prototype-only code.</li>
            </ul>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] muted-text">
              {activeExecutionLane.label}
            </p>
            <p className="mt-2 text-base font-semibold text-primary">
              {activeExecutionLane.value}
            </p>

            <div className="mt-7 space-y-3">
              {proofPoints.map((item) => (
                <div key={item.label} className="surface-subtle p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] muted-text">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-primary">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-wrap py-12">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="chip">Selected work</p>
              <h2 className="h2-fluid mt-4 text-primary">
                Selected projects
              </h2>
            </div>
            <Link href="/projects" className="link-inline">
              View full project index
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="surface-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl text-primary">{project.name}</h3>
                  <span className="chip">{project.status}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed muted-text">
                  {project.oneLiner}
                </p>
                <ul className="mt-5 space-y-2 text-sm muted-text">
                  {project.highlights.slice(0, 2).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="link-inline text-sm uppercase tracking-[0.1em]"
                  >
                    View case details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap py-12">
        <div className="container mx-auto grid gap-8 md:grid-cols-2">
          <div className="surface-card p-7">
            <p className="chip">Working model</p>
            <h2 className="h2-fluid mt-4 text-primary">Ways I can help</h2>
            <ul className="mt-5 space-y-4">
              {services.map((service) => (
                <li key={service.title}>
                  <p className="text-lg font-semibold text-primary">
                    {service.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed muted-text">
                    {service.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-7">
            <p className="chip">Depth tracks</p>
            <h2 className="h2-fluid mt-4 text-primary">Technical labs</h2>
            <p className="mt-4 text-sm leading-relaxed muted-text">
              Labs stay visible as supporting signal for systems depth while
              product projects remain the primary evidence surface.
            </p>
            <ul className="mt-5 space-y-3 text-sm muted-text">
              {labTracks.map((lab) => (
                <li key={lab.name}>
                  <p className="font-semibold text-primary">{lab.name}</p>
                  <p className="muted-text">{lab.objective}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
