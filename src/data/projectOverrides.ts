export interface ProjectPresentationOverride {
  hidden?: boolean;
  displayTitle?: string;
  summary?: string;
  type?: string;
  highlights?: string[];
  featuredBadge?: string;
  preferredCtaLabel?: string;
  forceLiveUrl?: string;
  forceRepoUrl?: string;
  tags?: string[];
}

export const projectPresentationOverrides: Record<
  string,
  ProjectPresentationOverride
> = {
  "makshouse-hook": {
    displayTitle: "Mak's House Website",
    summary:
      "Responsive restaurant website prototype with shared design system, interactive navigation, and production-ready static deployment.",
    type: "Frontend",
    highlights: [
      "Implements responsive layout patterns, mobile navigation, hero interactions, and gallery filtering.",
      "Built for straightforward launch and maintenance on standard static hosting.",
    ],
  },
  "aurcade-hook": {
    displayTitle: "Aurcade Interface Concepts",
    summary:
      "Frontend concept workspace for an arcade platform UI, focused on information architecture, reusable layouts, and content-heavy page composition.",
    type: "Frontend",
    highlights: [
      "Explores multi-page frontend structure, navigation patterns, and data-rich interface composition.",
      "Useful as UI implementation evidence for browser-based product work and rapid iteration.",
    ],
  },
  "stripe-webhook-reliability-service": {
    displayTitle: "Stripe Webhook Reliability Service",
    summary:
      "Backend reliability service that reinforces API integration, correctness, and failure-path handling for web products.",
    type: "Backend",
  },
  portfolio: {
    hidden: true,
  },
};
