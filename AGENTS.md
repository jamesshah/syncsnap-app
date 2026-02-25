# SyncSnap Development Notes

## Cursor Cloud specific instructions

**Product**: SyncSnap is a Next.js 15 (App Router, Turbopack) SaaS app for cross-device file uploads. Built with the T3 stack (tRPC, Drizzle ORM, Tailwind CSS v4). Single package, not a monorepo.

### Quick reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3000, Turbopack) |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Lint + typecheck | `npm run check` |
| Format check | `npm run format:check` |
| Format fix | `npm run format:write` |
| DB push schema | `npm run db:push` |
| DB generate migration | `npm run db:generate` |

### External services required

The app depends on two external services that need real credentials:

1. **Clerk** (auth) — requires `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. Without valid Clerk keys, the middleware rejects all requests (even public routes like `/`) with "Publishable key not valid".
2. **SingleStore** (MySQL-compatible DB) — requires `SINGLESTORE_HOST`, `SINGLESTORE_PORT`, `SINGLESTORE_USER`, `SINGLESTORE_PASSWORD`, `SINGLESTORE_DB`. Used via Drizzle ORM with `mysql2` driver + SSL.
3. **ENCRYPTION_KEY** — must be 32+ chars, used for AES-256-GCM API key encryption.

### Environment setup caveats

- Set `SKIP_ENV_VALIDATION=true` in `.env` to start the dev server without valid credentials. The server will compile and start, but Clerk middleware will return 500 on all routes.
- The `.env.example` file is missing the `ENCRYPTION_KEY` variable; ensure it is added to `.env`.
- No automated test suite exists in this codebase (no test runner configured). Lint and typecheck are the primary code quality checks.
- Package manager is **npm** (lockfile: `package-lock.json`). Do not use pnpm/yarn.
