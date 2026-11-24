# Suleman Saleem Portfolio

Next.js portfolio site focused on full-stack product engineering across frontend, APIs, integrations, data workflows, testing, and delivery.

## Local Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Featured Projects Source

Featured project cards are generated from GitHub pinned repositories for `MSulSal`.

Order and inclusion behavior:

1. Fetch public pinned repos from GitHub (GraphQL) in profile order.
2. Apply local presentation overrides from `src/data/projectOverrides.ts`.
3. Hide repos when `hidden: true` in the override map.
4. If the token is missing or GitHub is unavailable, use the saved public pin snapshot in `src/data/pinnedProjectSnapshot.ts`. Successful fetches always use the current pins, including an empty list.

Optional project previews use real screenshots in `public/projects/`. Set `forceLiveUrl: null` for a project whose demo should be hidden.

## Environment Variables

```bash
# Optional GitHub API token. Grant public-repository read access only.
# Never give this portfolio token access to private repositories.
GH_ACTIVITY_FN_TOKEN=github_token_with_public_repo_read_access
# Optional explicit token for pinned public-repository fetch
GITHUB_PINNED_REPOS_TOKEN=github_token_with_public_repo_read_access

# Contact form email send (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_gmail@example.com
# optional
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```
