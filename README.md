# HolyShield 2025 Frontend

Single-page React experience for the HolyShield 2025 security festival. The app is built with Vite + TypeScript and ships as a static bundle that can be served directly through Nginx or any static host.

## Prerequisites

- Node.js `>=22`
- npm `>=10`

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on <http://localhost:5173>. Hot Module Replacement (HMR) is enabled out of the box.

## Useful Scripts

| Script            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                               |
| `npm run build`   | Type-check and create a production build in `dist/`     |
| `npm run preview` | Preview the built app locally using Vite preview server |
| `npm run lint`    | Run ESLint                                              |
| `npm run lint:fix`| Auto-fix lint issues where possible                     |
| `npm run format`  | Format the project with Prettier                        |

`nodemon` is available in the dev dependencies in case you prefer process restarts for custom scripts.

## Project Structure

```
src/
  components/    # UI building blocks (hero, countdown, speaker cards, layout)
  config/        # Content configuration (event details, navigation, speakers)
  styles/        # Global styling
```

- Update event copy and assets through `src/config/site.ts`.
- Static assets (e.g. `logo.png`, `banner.png`) live under `public/`.

## Formatting & Linting

The project includes ESLint + TypeScript ESLint and Prettier. Editor settings are aligned via `.editorconfig`.

```bash
npm run lint
npm run format
```

## Container Image

Build and run the production image locally:

```bash
docker compose up --build
```

This uses a multi-stage build (Node -> Nginx) and serves the compiled assets at <http://localhost:8080>.

## Deployment Notes

- The app is entirely static; any CDN or container runtime can host the files in `dist/`.
- Use the provided `docker-compose.yml` for quick local parity with production.
- Environment variables prefixed with `VITE_` (see `.env.example`) are exposed to the client at build time.
