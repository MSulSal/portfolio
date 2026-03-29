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
      "Workflow emphasizes milestone-linked commits and regression discipline.",
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
    stack: ["HTML", "CSS", "Vanilla JavaScript"],
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

export const technicalSkillGroups: TechnicalSkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["Java", "TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    id: "backend",
    title: "Backend and Architecture",
    skills: [
      "Spring Boot",
      "Node.js",
      "RESTful APIs",
      "Microservices",
      "Event-Driven Architecture",
      "Serverless",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: ["React", "Next.js", "React Native", "Redux", "HTML/CSS"],
  },
  {
    id: "cloud-infra",
    title: "Data, Cloud and Infrastructure",
    skills: ["PostgreSQL", "MySQL", "Docker", "Kubernetes", "AWS"],
  },
  {
    id: "delivery",
    title: "Delivery and Tooling",
    skills: ["GitHub Actions", "Jenkins", "Test Automation", "Git/GitHub"],
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
      "Core schema and API delivery across CRM flows with tested contracts.",
      "Strong L4-L5 evidence in architecture ownership and release readiness.",
      "Cross-stack implementation in Next.js/Supabase and Spring Boot tracks.",
    ],
  },
  {
    id: "sdet",
    label: "SDET",
    summary:
      "Layered quality strategy using unit, integration, database contract, and browser E2E gates.",
    topEvidence: [
      "146 pgTAP assertions plus CI-enforced quality gates.",
      "Deterministic Playwright smoke coverage integrated into release flow.",
      "Risk-based testing discipline with explicit failure-path coverage.",
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
      "Event-ready schema design and role-governed data boundaries.",
      "Database tests validating constraints and policy assumptions.",
      "Clear next roadmap for KPI dictionary, marts, and analysis memos.",
    ],
  },
];

export const labTracks = [
  {
    name: "MCP Sandbox",
    objective:
      "Ship MCP integrations with production-style engineering hygiene.",
  },
  {
    name: "Crypto Lab",
    objective:
      "Build cryptography depth from first principles to system-level tradeoffs.",
  },
  {
    name: "Concurrency Lab",
    objective:
      "Develop rigorous intuition for correctness, parallelism, and distributed behavior.",
  },
  {
    name: "Graphics Lab",
    objective:
      "Build rendering systems from scratch with architecture-first constraints.",
  },
  {
    name: "Neural Nets Sandbox",
    objective:
      "Implement neural and agentic systems from fundamentals to reproducible experiments.",
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
