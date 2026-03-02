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

export interface SkillRanking {
  id: string;
  skill: string;
  score: number;
  summary: string;
  evidence: string[];
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
    slug: "chama-inn",
    name: "Chama Inn PWA",
    status: "Live Prototype",
    track: "flagship",
    oneLiner:
      "Hospitality operations platform combining CRM, restaurant ordering, gift-shop ecommerce, and realtime staff analytics.",
    summary:
      "Production hospitality stack with schema design, API contracts, layered testing, and repeatable delivery workflows.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "GitHub Actions",
      "Playwright",
      "pgTAP",
    ],
    highlights: [
      "Shipped CRM API contracts for GET/POST/PATCH/DELETE with integration coverage.",
      "Implemented deterministic quality gates across CI and local pre-push workflows.",
      "Maintained architecture, tracker, and implementation logs as auditable delivery artifacts.",
    ],
    proof: [
      "22-table schema spanning CRM, orders, ecommerce, inventory, and event tracking.",
      "48 role-based RLS policies for guest/staff/manager/admin boundaries.",
      "146 pgTAP assertions for schema objects, constraints, and policy behavior.",
      "Playwright CRM smoke coverage wired into CI.",
    ],
    links: {
      live: "https://chama-inn-cyo4.vercel.app/",
    },
  },
  {
    slug: "opsledger",
    name: "OpsLedger",
    status: "Active Build",
    track: "active",
    oneLiner:
      "Spring Boot and React operations platform for service businesses managing clients, work orders, invoices, and deposit payments.",
    summary:
      "OpsLedger demonstrates enterprise-oriented Java/Spring delivery with test-first implementation practices and operational discipline.",
    stack: [
      "Java 21",
      "Spring Boot 3",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Flyway",
      "Docker",
      "GitHub Actions",
    ],
    highlights: [
      "Structured around clean backend layering and migration safety from day one.",
      "Roadmap is publicly documented for transparent execution.",
      "Built to demonstrate realistic business software delivery, not tutorial-only code.",
    ],
    proof: [
      "Public engineering practices and roadmap docs are already in place.",
      "Project targets full service-business workflow from intake to billing.",
      "Workflow emphasizes issue-linked commits and regression discipline.",
    ],
    links: {
      docs: "https://github.com/MSulSal/opsledger",
    },
  },
  {
    slug: "forced-design-lab",
    name: "Forced Design Frontend",
    status: "Active Build",
    track: "active",
    oneLiner:
      "Frontend lab built to pressure-test design decisions under real product constraints, not template reuse.",
    summary:
      "Design-focused frontend build exploring high-contrast systems, hierarchy, and motion under practical product constraints.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    highlights: [
      "Explores deliberate visual systems and high-contrast communication layouts.",
      "Designed as a practical showcase for conversion-focused frontend decision making.",
      "Acts as a design-forward complement to backend-heavy flagship work.",
    ],
    proof: [
      "Built to show intentional typography, layout hierarchy, and usability clarity.",
      "Targets portfolio differentiation against generic template-heavy sites.",
      "Used as a sandbox for interface systems you can apply to client work quickly.",
    ],
    links: {},
  },
  {
    slug: "labs",
    name: "Technical Labs (Crypto, Concurrency, Graphics, Neural Nets, MCP)",
    status: "Lab Track",
    track: "lab",
    oneLiner:
      "Long-horizon labs focused on deeper systems understanding and practical experimentation.",
    summary:
      "Long-horizon tracks in cryptography, concurrency, graphics, neural nets, and MCP integrations.",
    stack: ["Rust", "C/C++", "CUDA", "Python", "Node.js"],
    highlights: [
      "Crypto lab focuses on threat models, reproducible benchmarks, and secure implementation choices.",
      "Concurrency lab targets correctness, performance, and distributed systems intuition.",
      "Graphics and neural-net labs develop first-principles systems thinking and research discipline.",
    ],
    proof: [
      "Documented roadmaps and learning plans across multiple deep technical domains.",
      "Commit-driven progression with explicit definitions of done.",
      "Clear translation of learning artifacts into practical engineering outcomes.",
    ],
    links: {},
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

export const skillRankings: SkillRanking[] = [
  {
    id: "fullstack-delivery",
    skill: "Full-Stack Product Delivery",
    score: 96,
    summary:
      "Ships scoped features across frontend, backend, data, and release workflow with production readiness.",
    evidence: [
      "Delivered CRM, ordering, ecommerce, and analytics flows in a unified platform build.",
      "Maintained implementation velocity while preserving test and deployment discipline.",
    ],
  },
  {
    id: "backend-architecture",
    skill: "Backend Architecture and API Design",
    score: 93,
    summary:
      "Designs domain models and API boundaries that support scale, maintainability, and operational clarity.",
    evidence: [
      "Built typed API contracts and service-layer structure across multiple stacks.",
      "Designed multi-domain schemas with policy-aware data access boundaries.",
    ],
  },
  {
    id: "quality-automation",
    skill: "Quality Engineering and Test Automation",
    score: 92,
    summary:
      "Implements layered quality gates to reduce regressions and improve release confidence.",
    evidence: [
      "Unit, integration, DB assertions, and E2E checks wired into CI workflows.",
      "Fail-fast checks align local development and pipeline behavior.",
    ],
  },
  {
    id: "frontend-systems",
    skill: "Frontend Systems and UX Implementation",
    score: 88,
    summary:
      "Builds conversion-focused, responsive interfaces with deliberate hierarchy and interaction design.",
    evidence: [
      "Developed design-forward frontend systems under practical product constraints.",
      "Balanced visual clarity with implementation speed and maintainability.",
    ],
  },
  {
    id: "devops-reliability",
    skill: "Delivery Operations and Reliability",
    score: 86,
    summary:
      "Creates predictable engineering loops through CI guardrails, clear tracking, and recoverable workflows.",
    evidence: [
      "Established repeatable release gates for lint, type, test, and build verification.",
      "Used issue-linked execution and documented recovery practices to stabilize delivery.",
    ],
  },
];

export const employmentHistory: EmploymentEntry[] = [
  {
    id: "independent-engineer",
    title: "Independent Software Engineer",
    company: "Contract and Freelance",
    period: "2023 - Present",
    location: "Remote | Dallas-Fort Worth, TX",
    highlights: [
      "Delivered full-stack product slices for service and operations workflows from scope to deploy-ready handoff.",
      "Owned architecture decisions, implementation, testing, and stakeholder communication across active engagements.",
      "Worked in fast-turn cycles with measurable output through commits, issue resolution, and release checkpoints.",
    ],
  },
  {
    id: "product-engineer",
    title: "Product Engineer",
    company: "Chama Inn Platform Build",
    period: "2024 - Present",
    location: "Product Development",
    highlights: [
      "Built and iterated a hospitality operations platform spanning CRM, ordering, ecommerce, and analytics.",
      "Implemented policy-aware data design and automated quality coverage in support of production behavior.",
      "Maintained roadmap-to-delivery execution with transparent progress and outcome tracking.",
    ],
  },
  {
    id: "history-template",
    title: "Previous Role (Edit)",
    company: "Add Company Name",
    period: "Add Dates",
    location: "Add Location",
    highlights: [
      "Replace this entry with your prior employment role and concrete outcomes.",
      "Use metrics where possible: delivery volume, uptime, cycle-time improvements, or team impact.",
    ],
  },
];

export const roleTracks: RoleTrack[] = [
  {
    id: "sde",
    label: "SDE",
    summary: "Production-focused full-stack engineering with architecture depth and verifiable delivery outcomes.",
    topEvidence: [
      "Core schema and API delivery across CRM flows with tested contracts.",
      "Strong L4-L5 evidence in architecture ownership and release readiness.",
      "Cross-stack implementation in Next.js/Supabase and Spring Boot tracks.",
    ],
  },
  {
    id: "sdet",
    label: "SDET",
    summary: "Layered quality strategy using unit, integration, database contract, and browser E2E gates.",
    topEvidence: [
      "146 pgTAP assertions plus CI-enforced quality gates.",
      "Deterministic Playwright smoke coverage integrated into release flow.",
      "Risk-based testing discipline with explicit failure-path coverage.",
    ],
  },
  {
    id: "devops-sre",
    label: "DevOps/SRE",
    summary: "Early-stage operational rigor: CI enforcement, release guardrails, rollback readiness, and runbook discipline.",
    topEvidence: [
      "CI gate stack active on PR and main workflows.",
      "Local pre-push parity for fail-fast reliability.",
      "Operational docs and recovery automation for repeatable execution.",
    ],
  },
  {
    id: "data-analyst",
    label: "Data Analyst",
    summary: "Analytics-ready data architecture with SQL quality controls and KPI-focused evolution path.",
    topEvidence: [
      "Event-ready schema design and role-governed data boundaries.",
      "Database tests validating constraints and policy assumptions.",
      "Clear next roadmap for KPI dictionary, marts, and analysis memos.",
    ],
  },
];

export const labTracks = [
  {
    name: "MCP Sandbox",
    objective: "Ship MCP integrations with production-style engineering hygiene.",
  },
  {
    name: "Crypto Lab",
    objective: "Build cryptography depth from first principles to system-level tradeoffs.",
  },
  {
    name: "Concurrency Lab",
    objective: "Develop rigorous intuition for correctness, parallelism, and distributed behavior.",
  },
  {
    name: "Graphics Lab",
    objective: "Build rendering systems from scratch with architecture-first constraints.",
  },
  {
    name: "Neural Nets Sandbox",
    objective: "Implement neural and agentic systems from fundamentals to reproducible experiments.",
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export const featuredProjects = portfolioProjects.filter(
  (project) => project.track !== "lab"
);
