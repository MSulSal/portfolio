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
  title: "Software Engineer",
  focus:
    "Build operational software with test-first delivery, production-safe architecture, and clear execution discipline.",
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
      "WordPress hospitality platform evolving from Chama Station Inn toward Hearthstone Hospitality with guest-facing experience and operational workflows.",
    summary:
      "Hospitality product direction centered on WordPress-native operations, stakeholder handoff docs, and production-minded implementation planning.",
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
      "WordPress + Elementor delivery package for a school site with explicit owner-edit workflows and launch runbooks.",
    summary:
      "Content-managed site build focused on handoff clarity, predictable edits, and operational continuity after delivery.",
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
    title: "Feature Delivery and Ownership",
    detail:
      "Own scoped features end-to-end with clean implementation, testing depth, and production-ready handoff.",
  },
  {
    title: "Quality and Reliability Hardening",
    detail:
      "Increase confidence with stronger test coverage, failure-path handling, and release guardrails.",
  },
  {
    title: "Architecture and Stabilization",
    detail:
      "Improve boundaries, reduce fragility, and make systems easier to evolve under real product pressure.",
  },
];

export const technicalSkillGroups: TechnicalSkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["PHP", "TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    id: "backend",
    title: "Backend and Architecture",
    skills: [
      "WordPress",
      "Node.js",
      "Express",
      "RESTful APIs",
      "Webhook Reliability",
      "Idempotency Patterns",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: ["Elementor", "HTML/CSS", "JavaScript", "Responsive UI"],
  },
  {
    id: "cloud-infra",
    title: "Data, Cloud and Infrastructure",
    skills: ["PostgreSQL", "SQLite", "Docker", "GitHub Pages", "Vercel"],
  },
  {
    id: "delivery",
    title: "Delivery and Tooling",
    skills: ["GitHub Actions", "Vitest", "Playwright", "Git/GitHub"],
  },
];

export const employmentHistory: EmploymentEntry[] = [
  {
    id: "fullstack-contract",
    title: "Full-Stack Engineer (Contract)",
    company: "Hospitality Guest Ordering and Operations Platform",
    period: "05/2025 - Current",
    location: "McKinney, TX",
    highlights: [
      "Architected and delivered a cross-platform Progressive Web App (React/Next.js) supporting restaurant and retail ordering, CRM, and real-time operational analytics.",
      "Built backend services with Java/Spring Boot and PostgreSQL using event-driven architecture for live order tracking and analytics dashboards.",
      "Integrated Stripe for secure tokenized payments and deposit workflows with production-safe transaction handling.",
      "Designed role-based authentication and access controls for guests, staff, and admin with isolated data flows.",
      "Delivered the solution from prototype to production-ready system, including architecture decisions, documentation, and deployment planning.",
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
