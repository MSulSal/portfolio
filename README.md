# Suleman Saleem Portfolio

Next.js portfolio site focused on frontend execution with full-stack depth.

## Local Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Featured Projects Source

Featured project cards are generated from GitHub pinned repositories for `MSulSal`.

Order and inclusion behavior:

1. Fetch pinned repos from GitHub (GraphQL).
2. Apply local presentation overrides from `src/data/projectOverrides.ts`.
3. Hide repos when `hidden: true` in the override map.
4. If pinned fetch is unavailable, fall back to a recent-repo list.

## Environment Variables

```bash
# GitHub project/activity access
GH_ACTIVITY_FN_TOKEN=github_token_with_repo_access
# optional explicit token for pinned repo fetch
GITHUB_PINNED_REPOS_TOKEN=github_token_with_repo_access

# Contact form email send (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_gmail@example.com
# optional
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```
