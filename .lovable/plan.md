## Goal
Rebuild the Ayoub Welfare CIC site as a **plain React (Vite) + React Router DOM** app, replacing the current TanStack Start setup, while keeping all existing pages, content, design tokens, and assets.

## Scope of changes

### 1. Dependencies
- Add: `react-router-dom`
- Remove: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-devtools`, `@cloudflare/vite-plugin`, `@lovable.dev/vite-tanstack-config`
- Add: standard `@vitejs/plugin-react`, `vite-tsconfig-paths`, `@tailwindcss/vite`

### 2. New entry points
- `index.html` (Vite SPA shell with `<div id="root">`)
- `src/main.tsx` — ReactDOM root, wraps app in `<BrowserRouter>` and `<HelmetProvider>` (react-helmet-async for per-page `<title>`/meta)
- `src/App.tsx` — `<Routes>` table mapping `/`, `/what-we-do`, `/our-story`, `/our-team`, `/impact`, `/transparency`, `/donate` to page components, wrapped in a shared `<SiteLayout>` with header/footer/`<Outlet>`

### 3. Page conversion
Convert each `src/routes/*.tsx` → `src/pages/*.tsx`:
- Strip `createFileRoute(...)` wrappers
- Replace `head: () => ({ meta, links })` with a `<Helmet>` block at the top of each component
- Replace `@tanstack/react-router` `Link` imports with `react-router-dom` `Link` (use `to=""` same syntax)

### 4. Layout
- New `src/components/site-layout.tsx` renders `<SiteHeader/> <Outlet/> <SiteFooter/>`
- Update `SiteHeader` nav `Link` imports to `react-router-dom`

### 5. Cleanup
- Delete: `src/routes/`, `src/routeTree.gen.ts`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `src/routes/__root.tsx`, `wrangler.jsonc`, `src/lib/error-page.ts`, `src/lib/error-capture.ts` (TanStack-specific)
- New `vite.config.ts` using vanilla `@vitejs/plugin-react` + `@tailwindcss/vite` + `vite-tsconfig-paths`
- Keep `src/styles.css`, `src/assets/*`, all `src/components/ui/*`, `src/lib/utils.ts`

### 6. SEO parity
- Each page renders `<Helmet>` with title, description, og:title, og:description, og:url, and canonical link — same content as before
- Root `index.html` carries viewport, charset, default OG site name

## Notes
- This is a one-way migration; SSR is removed (becomes a client-rendered SPA).
- All visual design, copy, routes, and assets remain identical.
- The Lovable runtime is set up for TanStack Start, so previews/builds may behave differently after migration.
