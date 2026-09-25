# Hackathon Project Finder

A client-side web app for browsing hackathon projects, joining a team, and proposing new ideas. This repository currently contains the Hello World shell. See [docs/requirements.md](docs/requirements.md) for the product requirements and [docs/TODO.md](docs/TODO.md) for the implementation plan.

## Prerequisites

- [Node.js](https://nodejs.org/) 24 LTS (pinned in `.nvmrc` and `package.json` `engines`)
- npm 11 or later (included with Node.js 24)

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`. The `/` route shows the heading **Hackathon Project Finder — Hello World**.

## Build

```bash
npm run build
```

This type-checks the project, then writes production files to `dist/`.

## Preview

After a production build:

```bash
npm run preview
```

Vite serves the contents of `dist/` on a local URL so you can check the production build.

## Checks

```bash
npm run lint          # ESLint (TypeScript + React Hooks rules)
npm run typecheck     # TypeScript project build (tsc -b), strict mode
npm run format:check  # Prettier, check only
```

Use `npm run lint:fix` and `npm run format` to fix issues automatically.

## Deploy

The app is a static site hosted on [Netlify](https://www.netlify.com/). Deploys are driven by the Netlify CLI from CI rather than a Netlify UI Git connection; setup is tracked in step 4 of [docs/TODO.md](docs/TODO.md).

Until CI deploys are in place, you can deploy manually:

```bash
npm run build
npx netlify-cli deploy --dir=dist          # draft (preview) deploy
npx netlify-cli deploy --dir=dist --prod   # production deploy
```

`public/_redirects` sends all paths to `index.html` so client-side routes work on Netlify.
