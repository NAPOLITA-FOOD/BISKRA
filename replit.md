# NAPOLITA FOOD

A single-page marketing/ordering site for a Biskra-based Italian food brand ("Napolita Food") — hero video-intro loading screen, menu categories, and cart UI, all running on hardcoded local data (no backend).

## Run & Operate

- `pnpm --filter @workspace/napolita-food run dev` — run the frontend (served via the `artifacts/napolita-food: web` workflow, port 24531)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- No database or API server is wired up; the frontend is fully self-contained.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind, Radix UI, wouter, framer-motion
- Menu content lives in `artifacts/napolita-food/src/data/menuData.ts` (no API calls)

## Where things live

- `artifacts/napolita-food/` — the only active artifact (frontend)
- `lib/db`, `lib/api-spec`, `lib/api-zod`, `lib/api-client-react` — unused backend/API scaffolding left over from before the repo's "remove backend" cleanup; not wired into the frontend

## Admin Dashboard

- URL: `/admin` — password-protected (password stored in `VITE_ADMIN_PASSWORD` env var, default `napolita2024`)
- Add / edit / delete menu products; changes are persisted to JSONbin and reflected live on the storefront on next page load
- JSONbin bin ID stored in `VITE_JSONBIN_BIN_ID` env var; master key in `VITE_JSONBIN_API_KEY` secret
- ⚠️ Current security model: client-side password gate only. Both the API key and password are bundled in client JS (VITE_ prefix). Suitable for an internal owner tool; see Task #2 for a proper server-side proxy upgrade.

## Architecture decisions

- Imported from GitHub with `artifacts/napolita-food/.replit-artifact/artifact.toml` already present but not yet registered as a live workflow; registered it manually via `configureWorkflow` (see Gotchas) rather than `createArtifact`, since the artifact directory already existed.
- Menu data is loaded at runtime from JSONbin (bin `6a4e1c68f5f4af5e29711681`); falls back silently to hardcoded `src/data/menuData.ts` if the fetch fails.

## Product

Single-page site: animated logo intro (~3.5s), then the Napolita Food home page with menu/category browsing and a cart drawer.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The app requires `PORT` and `BASE_PATH` env vars (vite.config.ts throws if missing) — the workflow command sets `PORT=24531 BASE_PATH=/` inline.
- On load there's a ~3.5s branded loading animation (`VideoLoader.tsx`) before the home page renders — a blank/dark screen in a screenshot is likely mid-animation, not a bug.
- `lib/db`, `lib/api-spec`, `lib/api-zod`, `lib/api-client-react` are unused leftovers from a removed backend; safe to ignore unless the project grows a backend again.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
