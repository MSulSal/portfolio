import type { IconType } from "react-icons";
import {
  SiAmazonwebservices,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedux,
  SiTypescript,
} from "react-icons/si";
import { FiCode } from "react-icons/fi";

import { cn } from "@/lib/utils";

interface TechBadgeProps {
  tech: string;
  className?: string;
}

function normalizeTech(value: string) {
  return value.trim().toLowerCase();
}

function iconForTech(tech: string): IconType {
  const normalized = normalizeTech(tech);

  const exact: Record<string, IconType> = {
    "node.js": SiNodedotjs,
    nodejs: SiNodedotjs,
    typescript: SiTypescript,
    javascript: SiJavascript,
    react: SiReact,
    "next.js": SiNextdotjs,
    "react native": SiReact,
    redux: SiRedux,
    postgresql: SiPostgresql,
    mysql: SiMysql,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    aws: SiAmazonwebservices,
    "github actions": SiGithubactions,
    jenkins: SiJenkins,
    python: SiPython,
    "html/css": SiHtml5,
    "git/github": SiGithub,
    "restful apis": SiFastapi,
    serverless: SiExpress,
  };

  if (exact[normalized]) {
    return exact[normalized];
  }

  if (normalized.includes("node")) {
    return SiNodedotjs;
  }
  if (normalized.includes("react")) {
    return SiReact;
  }
  if (normalized.includes("next")) {
    return SiNextdotjs;
  }
  if (normalized.includes("sql")) {
    return SiPostgresql;
  }
  if (normalized.includes("github")) {
    return SiGithub;
  }

  return FiCode;
}

const TechBadge = ({ tech, className }: TechBadgeProps) => {
  const Icon = iconForTech(tech);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--code-bg)] px-3 py-1 text-xs font-semibold tracking-[0.02em] text-[color:var(--muted)]",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 text-[color:var(--accent)]" aria-hidden="true" />
      <span>{tech}</span>
    </span>
  );
};

export default TechBadge;
