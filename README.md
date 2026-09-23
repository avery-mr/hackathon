# Hackathon Project Finder

A client-side web app for browsing hackathon projects, joining a team, and proposing new ideas. This repository currently contains the Hello World shell.

## Prerequisites

- [Node.js](https://nodejs.org/) 20.19 or later, or 22.12 or later
- npm 10 or later (included with Node.js)

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`. The page shows the heading **Hackathon Project Finder — Hello World**.

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
npm run lint
npm run typecheck
```

`lint` runs [Oxlint](https://oxc.rs/docs/guide/usage/linter). `typecheck` runs the TypeScript project build (`tsc -b`) without emitting a bundle.
