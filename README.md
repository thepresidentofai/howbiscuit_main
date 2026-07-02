# How Biscuit Site

Astro Starlight publishing shell for `howbiscuit.com`, skinned as the Biscuit Field Guide.

## Purpose

How Biscuit is a general-purpose explainer blog for testing broad informational SEO strategies outside client or agency properties. The current build establishes the publishing shell, trust pages, divisions, and reusable article components without expanding the article library beyond the two existing starter routes.

## Deployment

Target platform: Cloudflare Pages

Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |

## Local Commands

```powershell
npm install
npm run qa
npm run build
```

## Local Structure

- `src/content/docs/` contains Starlight pages and MDX articles.
- `src/components/` contains reusable MDX/Astro article components.
- `src/pages/` contains generated support routes for RSS, robots, and sitemap output.
- `public/` contains Cloudflare passthrough files that do not conflict with Astro routes.
- `content/` contains source briefs and future article drafts.
- `experiments/` tracks SEO tests, hypotheses, and outcomes.

## Preserved Routes

- `/articles/how-does-baking-powder-work/`
- `/articles/why-are-some-answers-better-than-others/`

## Publishing Shell

Public divisions:

- Math
- Research & Writing
- Cooking
- Home Tech
- Make-Do Lab
- Tools

Trust pages:

- About
- Editorial Policy
- Corrections
- Privacy
- Affiliate Disclosure
- Contact

## First Launch Checklist

- GitHub repo: `thepresidentofai/howbiscuit_main`.
- Push this repo to `main`.
- Create Cloudflare Pages project `howbiscuit`.
- Attach `howbiscuit.com` and `www.howbiscuit.com`.
- Enable separate Cloudflare Web Analytics for this project.
