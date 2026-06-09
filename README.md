# Brenda Mello Makeup — web app

Vite + React + TypeScript SPA. Production output is static files in `dist/`.

## Prerequisites

- **Node.js 20+** (see `engines` in `package.json`)
- npm (comes with Node)

## Local development

```bash
npm install
npm run dev
```

Open the URL shown (default `http://localhost:5173`).

## Production build & preview

```bash
npm run build
npm run preview
```

`npm run build` runs TypeScript checks (`tsc --noEmit`) then `vite build`. Upload **`dist/`** contents to any static host, or use the options below.

## Deploy

### Vercel

1. Import the Git repository in [Vercel](https://vercel.com/).
2. Framework preset: **Vite** (auto-detected).
3. Build: `npm run build`, output: `dist`.
4. `vercel.json` includes SPA rewrites so routes like `/services/wedding` work after refresh.

### Netlify

1. New site from Git, or drag-and-drop **`dist/`** after a local build.
2. Build command: `npm run build`, publish directory: `dist`.
3. `netlify.toml` (and `public/_redirects` copied into `dist`) send all paths to `index.html` for client-side routing.

### Docker (nginx)

```bash
docker build -t brenda-mello-web .
docker run -p 8080:80 brenda-mello-web
```

App: `http://localhost:8080`

### Any static host / VPS

- Serve the **`dist`** folder as the site root.
- Configure the server so **non-file URLs** fall back to **`index.html`** (same idea as `nginx.conf` in this repo).

### GitHub Pages (project site)

If the site is served from a subpath (e.g. `https://user.github.io/repo/`), set in `vite.config.ts`:

```ts
export default defineConfig({
  base: "/repo-name/",
  // ...
});
```

Rebuild; internal asset paths will use that prefix.

## Launch checklist

- [ ] `npm run build` and `npm run lint` pass.
- [ ] Run `npm run preview` and click every nav item, service link, and portfolio route; refresh on a deep link (e.g. `/services/makeup`) and confirm the page loads.
- [ ] Confirm **images** under `public/assets/` are committed (paths like `/assets/img/...`).
- [ ] Set your **production domain** in the host’s dashboard and enable **HTTPS**.
- [ ] Update **contact** details (email, phone, social) in the source if needed.
- [ ] Optional: **analytics** (e.g. Plausible, GA) via `index.html` or a small React snippet.

## Scripts

| Script        | Description                          |
|---------------|--------------------------------------|
| `npm run dev` | Dev server with HMR                  |
| `npm run build` | Typecheck + production bundle to `dist` |
| `npm run preview` | Serve `dist` locally             |
| `npm run lint` | ESLint                               |

## Project layout

- `src/` — React app and routes
- `public/` — static assets copied to `dist` as-is (`robots.txt`, favicon, `_redirects`, CSS, images)
- `dist/` — build output (ignored by git)
