export type WorkTrack = "flagship" | "active" | "lab";

export type ProjectStatus = "Live Prototype" | "Active Build" | "Lab Track";

export interface PortfolioProject {
  slug: string;
  name: string;
  status: ProjectStatus;
  track: WorkTrack;
  oneLiner: string;
  summary: string;
  stack: string[];
  highlights: string[];
  proof: string[];
  links: {
    live?: string;
    repo?: string;
    docs?: string;
  };
}

export interface RoleTrack {
  id: string;
  label: string;
  summary: string;
  topEvidence: string[];
}

export interface TechnicalSkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface EmploymentEntry {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export const profile = {
  name: "Suleman Saleem",
  title: "Full-Stack Software Engineer",
  focus:
    "I build responsive interfaces in React and Next.js, backend services in Node.js and Java/Spring Boot, and WordPress implementations that non-technical owners can actually maintain. Strong on execution, testing discipline, and clean handoff.",
  location: "Dallas-Fort Worth, TX",
  email: "msulemansaleem01@gmail.com",
  github: "https://github.com/MSulSal",
  githubUsername: "MSulSal",
  linkedin: "https://www.linkedin.com/in/m-suleman-saleem/",
  upwork: "https://www.upwork.com/freelancers/~0155bc92ca790b58b7",
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "hearthstone-hospitality",
    name: "Hearthstone Hospitality Platform",
    status: "Active Build",
    track: "flagship",
    oneLiner:
      "WordPress hospitality platform combining guest-facing experience, responsive presentation, and operational workflows for non-technical site ownership.",
    summary:
      "WordPress/PHP/Elementor hospitality implementation focused on frontend experience quality, operational workflows, and maintainable stakeholder handoff.",
    stack: [
      "WordPress",
      "PHP",
      "Elementor",
      "JavaScript",
      "SCSS/CSS",
      "Handlebars",
    ],
    highlights: [
      "Built around client-facing handoff artifacts covering product intent, architecture, and delivery phases.",
      "Uses WordPress as the operational control surface for non-technical stakeholder editing.",
      "Connects brand refresh direction with practical back-of-house workflow requirements.",
    ],
    proof: [
      "Repository includes `app`, `conf`, and structured `docs/client-handoff` implementation packet.",
      "Client handoff set includes architecture, acceptance walkthrough, and launch-direction docs.",
      "Current public site context is mapped to a full guest-stay app pivot plan.",
    ],
    links: {
      live: "https://chamastationinn.com/",
      repo: "https://github.com/MSulSal/chamastationinn",
      docs: "https://github.com/MSulSal/chamastationinn/tree/main/docs/client-handoff",
    },
  },
  {
    slug: "chestnut-square-academy",
    name: "Chestnut Square Academy Website",
    status: "Active Build",
    track: "active",
    oneLiner:
      "Responsive WordPress + Elementor school website built for maintainable content editing, launch readiness, and non-technical owner handoff.",
    summary:
      "Frontend-forward WordPress delivery with owner-edit workflows, structured launch preparation, and handoff artifacts for long-term maintainability.",
    stack: [
      "WordPress",
      "PHP",
      "Elementor",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    highlights: [
      "Includes owner handoff, launch-day runbook, and fact-verification documentation.",
      "Implements editing profiles to support non-technical site maintenance.",
      "Organized for repeatable client delivery, not one-off theme edits.",
    ],
    proof: [
      "Repository contains dedicated `docs` and `scripts` paths for delivery operations.",
      "README documents current status and edit-mode behavior for client ownership.",
      "Recent commit history reflects active maintenance in 2026.",
    ],
    links: {
      repo: "https://github.com/MSulSal/chestnut-square-academy",
    },
  },
  {
    slug: "stripe-webhook-reliability-service",
    name: "Stripe Webhook Reliability Service",
    status: "Active Build",
    track: "active",
    oneLiner:
      "Backend reliability service focused on Stripe webhook correctness, idempotency, and failure recovery.",
    summary:
      "Service-oriented backend implementation with replay-safe event processing and production-support diagnostics.",
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "Stripe SDK",
      "SQLite",
      "Docker",
      "Vitest",
      "GitHub Actions",
    ],
    highlights: [
      "Verifies Stripe signatures on inbound webhook requests.",
      "Implements idempotency and retry-safe processing for event handling.",
      "Ships with structured logging, test coverage, and containerized local run support.",
    ],
    proof: [
      "Repository includes `tests`, Docker config, and CI workflow support.",
      "README documents reliability guarantees and operational behavior.",
      "Designed around duplicate prevention and failed-event recovery paths.",
    ],
    links: {
      repo: "https://github.com/MSulSal/stripe-webhook-reliability-service",
    },
  },
  {
    slug: "tnoc-interactive",
    name: "TNOC Interactive",
    status: "Lab Track",
    track: "lab",
    oneLiner:
      "Interactive adaptation of The Nature of Code with browser-based simulations and visual learning flows.",
    summary:
      "Simulation-focused frontend build used to demonstrate computational thinking and interactive system behavior.",
    stack: ["JavaScript", "HTML", "CSS"],
    highlights: [
      "Published with live GitHub Pages deployment.",
      "Positions computational simulations as an explorable user experience.",
      "Maintained as an active visual systems lab in the public profile.",
    ],
    proof: [
      "Public repository + live site demonstrate complete project packaging.",
      "Description and implementation align around educational simulation goals.",
      "Useful as a polished technical depth signal without over-claiming production scope.",
    ],
    links: {
      live: "https://msulsal.github.io/tnoc/",
      repo: "https://github.com/MSulSal/tnoc",
    },
  },
];

export const services = [
  {
    title: "Full-Stack Feature Delivery",
    detail:
      "Ship scoped features across frontend and backend with clean implementation, testing depth, and production-ready handoff.",
  },
  {
    title: "Frontend and Web Implementation",
    detail:
      "Build responsive interfaces, business websites, and maintainable UI flows in React, Next.js, and WordPress.",
  },
  {
    title: "Quality and Reliability",
    detail:
      "Increase confidence with stronger test coverage, failure-path handling, and release guardrails.",
  },
];

export const technicalSkillGroups: TechnicalSkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Responsive UI",
    ],
  },
  {
    id: "cms-web",
    title: "CMS / Web Delivery",
    skills: ["WordPress", "PHP", "Elementor"],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      "Node.js",
      "Java",
      "Spring Boot",
      "RESTful APIs",
      "Microservices",
      "MySQL",
      "PostgreSQL",
      "SQLite",
    ],
  },
  {
    id: "delivery",
    title: "Testing / Delivery",
    skills: [
      "Git",
      "GitHub Actions",
      "Vitest",
      "Playwright",
      "CI/CD",
    ],
  },
  {
    id: "cloud-infra",
    title: "Cloud / Infrastructure",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Vercel",
      "GitHub Pages",
    ],
  },
];

export const employmentHistory: EmploymentEntry[] = [
  {
    id: "independent-software-engineer",
    title: "Independent Software Engineer (Freelance / Contract)",
    company: "Self-Employed",
    period: "05/2025 - Current",
    location: "Dallas-Fort Worth, TX",
    highlights: [
      "Built and shipped WordPress/PHP/Elementor prototypes and implementation packages for hospitality and education leads, including stakeholder handoff docs and launch runbooks.",
      "Developed full-stack proof-of-concept web apps using React/Next.js and TypeScript to validate workflow, UX direction, and integration feasibility.",
      "Implemented backend services and API integrations in Node.js and Java/Spring Boot, including Stripe webhook reliability, idempotency controls, and structured logging.",
      "Owned end-to-end delivery lifecycle across requirements gathering, architecture, implementation, testing, deployment preparation, and stakeholder demos.",
      "Maintained an active GitHub engineering portfolio with frequent commits across web product delivery and backend reliability projects.",
    ],
  },
  {
    id: "software-development-engineer",
    title: "Software Development Engineer",
    company: "Anko Retail, Inc.",
    period: "06/2021 - 11/2023",
    location: "Seattle, WA",
    highlights: [
      "Built scalable microservices and RESTful APIs for inventory management across 300+ stores using Java/Spring Boot and Node.js.",
      "Developed internal tools for automated data integrity testing and SFTP file transfer and processing.",
      "Designed responsive UIs in React and Next.js and wrote backend integration and unit tests.",
      "Collaborated in agile teams with CI/CD pipelines, trunk-based development, and event-driven data processing.",
    ],
  },
  {
    id: "software-engineer-intern",
    title: "Software Engineer Intern",
    company: "UNT Systems",
    period: "01/2021 - 05/2021",
    location: "Denton, TX",
    highlights: [
      "Assisted in design and development of a mobile app for theft and identity protection using React Native.",
      "Implemented real-time security rating updates, geolocation features, and user authentication.",
      "Developed permissions-based functionality for multiple user roles, improving usability and security.",
    ],
  },
];

export const roleTracks: RoleTrack[] = [
  {
    id: "sde",
    label: "SDE",
    summary:
      "Production-focused full-stack engineering with architecture depth and verifiable delivery outcomes.",
    topEvidence: [
      "Current portfolio work spans WordPress product delivery and backend reliability services.",
      "Projects include client handoff planning, implementation docs, and production-minded delivery packaging.",
      "Cross-functional delivery evidence across PHP/WordPress and TypeScript/Node tracks.",
    ],
  },
  {
    id: "sdet",
    label: "SDET",
    summary:
      "Layered quality strategy using unit, integration, database contract, and browser E2E gates.",
    topEvidence: [
      "Webhook reliability service includes automated tests and CI-backed verification paths.",
      "Failure-path coverage emphasizes replay safety, duplicate prevention, and robust error handling.",
      "Testing narrative is tied to operational behavior, not only happy-path validation.",
    ],
  },
  {
    id: "devops-sre",
    label: "DevOps/SRE",
    summary:
      "Early-stage operational rigor: CI enforcement, release guardrails, rollback readiness, and runbook discipline.",
    topEvidence: [
      "CI gate stack active on PR and main workflows.",
      "Local pre-push parity for fail-fast reliability.",
      "Operational docs and recovery automation for repeatable execution.",
    ],
  },
  {
    id: "data-analyst",
    label: "Data Analyst",
    summary:
      "Analytics-ready data architecture with SQL quality controls and KPI-focused evolution path.",
    topEvidence: [
      "Hospitality builds are scoped with measurable operations and guest-experience outcomes.",
      "Documentation artifacts include implementation mapping and launch-readiness checklists.",
      "Execution style emphasizes clear metrics and decision-ready project reporting.",
    ],
  },
];

export const labTracks = [
  {
    name: "Computational Motion Lab",
    objective:
      "Build interactive simulation intuition through browser-first computational experiments.",
  },
  {
    name: "Interface Systems Lab",
    objective:
      "Iterate on visual hierarchy, interaction hooks, and conversion-focused static experiences.",
  },
];

export function getProjectBySlug(slug: string) {
  if (slug === "chama-inn") {
    return portfolioProjects.find(
      (project) => project.slug === "hearthstone-hospitality",
    );
  }

  return portfolioProjects.find((project) => project.slug === slug);
}

export const featuredProjects = portfolioProjects.filter(
  (project) => project.track !== "lab",
);
