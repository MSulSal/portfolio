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
  location: "Dallas-Fort Worth, TX",
  email: "msulemansaleem01@gmail.com",
  github: "https://github.com/MSulSal",
  githubUsername: "MSulSal",
  linkedin: "https://www.linkedin.com/in/m-suleman-saleem/",
  upwork: "https://www.upwork.com/freelancers/~0155bc92ca790b58b7",
};

export const services = [
  {
    title: "Frontend Engineering",
    detail:
      "Build responsive, maintainable web interfaces in React, Next.js, TypeScript, HTML, CSS, and JavaScript with strong implementation discipline and production polish.",
  },
  {
    title: "API Integration and Product UI",
    detail:
      "Connect frontend experiences to backend services cleanly, unblock product work at the integration layer, and turn requirements into usable flows that hold up in real-world use.",
  },
  {
    title: "Debugging, Quality, and Delivery",
    detail:
      "Resolve UI bugs, improve responsiveness and stability, and ship with stronger confidence through testing discipline, cleanup, and practical release readiness.",
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
      "RESTful APIs",
      "Microservices",
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "C#/.NET",
    ],
  },
  {
    id: "delivery",
    title: "Testing / Delivery",
    skills: ["Git", "GitHub Actions", "Vitest", "Playwright", "CI/CD"],
  },
  {
    id: "cloud-infra",
    title: "Cloud / Infrastructure",
    skills: ["AWS", "Docker", "Vercel", "GitHub Pages"],
  },
];

export const employmentHistory: EmploymentEntry[] = [
  {
    id: "techlink-nm-software-engineer",
    title: "Software Engineer",
    company: "TechLink NM",
    period: "06/2025 - Current",
    location: "McKinney, TX",
    highlights: [
      "Built a production-ready full-stack platform with Next.js, React, TypeScript, Tailwind CSS, and Vercel.",
      "Developed API-driven appointment intake, onboarding, customer communication, media, and transactional workflows with backend validation and recovery for incomplete submissions and edge cases.",
      "Integrated Square, Cloudinary, Twilio, Resend, and Google Maps APIs using webhooks, fallback behavior, and production troubleshooting.",
      "Managed CI/CD, deployment environments, production debugging, and release readiness.",
    ],
  },
  {
    id: "software-development-engineer",
    title: "Software Development Engineer",
    company: "Anko Retail, Inc.",
    period: "06/2021 - 11/2023",
    location: "Seattle, WA",
    highlights: [
      "Built scalable microservices and RESTful APIs for inventory management across 300+ stores.",
      "Developed internal tools for automated data integrity testing and SFTP file transfer and processing.",
      "Created responsive internal web interfaces and wrote backend integration and unit tests.",
      "Collaborated in agile teams with CI/CD pipelines, trunk-based development, and event-driven data processing.",
    ],
  },
  {
    id: "software-engineer-intern",
    title: "Software Engineer Intern",
    company: "UNT Cyber Forensics Lab",
    period: "01/2021 - 05/2021",
    location: "Denton, TX",
    highlights: [
      "Helped develop and test a mobile application with authentication, geolocation, and role-based permissions.",
      "Implemented and validated real-time security-rating updates and user workflows.",
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
