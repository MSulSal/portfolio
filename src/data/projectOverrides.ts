export interface ProjectPresentationOverride {
	hidden?: boolean;
	displayTitle?: string;
	summary?: string;
	type?: string;
	highlights?: string[];
	featuredBadge?: string;
	preferredCtaLabel?: string;
	forceLiveUrl?: string | null;
	forceRepoUrl?: string;
	tags?: string[];
	preview?: { src: string; alt: string };
	workflow?: { label: string; steps: string[] };
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
			"An Express service that stores Stripe events before processing and retries recoverable failures.",
		type: "Backend",
		tags: ["TypeScript", "Node.js", "Express", "SQLite"],
		workflow: {
			label: "Webhook processing",
			steps: ["Verify signature", "Store event by ID", "Retry transient failures"],
		},
		highlights: [
			"A unique Stripe event ID and atomic event claiming prevent duplicate processing during retries and replays.",
			"Structured logs and a health endpoint help diagnose failures.",
		],
	},
	"charity-directory": {
		displayTitle: "Conrad's Charities",
		summary:
			"A searchable nonprofit directory and map for finding local help, donation links, and volunteer opportunities.",
		type: "Full-stack web app",
		tags: ["Next.js", "React", "TypeScript", "Leaflet"],
		preview: {
			src: "/projects/conrads-charities.webp",
			alt: "Conrad's Charities homepage with a search form for charity type and location",
		},
		highlights: [
			"The resource finder resolves cities and ZIP codes from the directory's own data, keeping location queries out of third-party geocoding services.",
			"Organization profiles link directly to donation, volunteer, and verification sources.",
		],
	},
	bridalelegancenm: {
		displayTitle: "Bridal Elegance NM",
		summary: "A bridal salon website rebuild with browsable collections and a showroom gallery.",
		type: "Business website",
		tags: ["Next.js", "React", "TypeScript"],
		preview: {
			src: "/projects/bridal-elegance.webp",
			alt: "Bridal Elegance NM homepage with a full-width bridal gown photograph",
		},
		highlights: ["A gallery lightbox lets visitors browse showroom photos without leaving the page."],
	},
	bifourcation: {
		displayTitle: "Bifourcation",
		summary: "An interactive canvas that reconstructs freehand drawings with Fourier rotors.",
		type: "Creative coding",
	},
	"hearthstone-hospitality": {
		type: "WordPress",
		forceLiveUrl: null,
	},
	portfolio: {
		hidden: true,
	},
};
