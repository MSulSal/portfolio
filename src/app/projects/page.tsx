import type { Metadata } from "next";

import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/data/portfolioData";
import { getFeaturedProjectsFromGitHub } from "@/lib/githubPinnedProjects";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const { projects } = await getFeaturedProjectsFromGitHub(profile.githubUsername);

  return (
    <main className="portfolio-shell pb-16 pt-12 sm:pt-16">
      <h1 className="h1-fluid text-primary">Projects</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed muted-text">
        Selected work across web applications, backend services, and WordPress.
      </p>

      {projects.length > 0 ? (
        <div className="work-grid mt-8">
          {projects.map((project) => <ProjectCard key={project.repoFullName} project={project} />)}
        </div>
      ) : (
        <p className="mt-8 muted-text">Explore my repositories on <a href={profile.github} className="link-inline">GitHub</a>.</p>
      )}
    </main>
  );
}
