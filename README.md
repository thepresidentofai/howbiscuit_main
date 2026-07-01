# How Biscuit Site

Static starter for `howbiscuit.com`.

## Purpose

How Biscuit is a general-purpose explainer blog for testing broad informational SEO strategies outside client or agency properties.

## Deployment

Target platform: Cloudflare Pages

Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | `None` |
| Build command | blank |
| Build output directory | `public` |
| Production branch | `main` |

## Local Structure

- `public/` contains deployable static files.
- `content/` contains source briefs and future article drafts.
- `experiments/` tracks SEO tests, hypotheses, and outcomes.

## First Launch Checklist

- Create GitHub repo `thepresidentofai/howbiscuit-site`.
- Push this repo to `main`.
- Create Cloudflare Pages project `howbiscuit`.
- Attach `howbiscuit.com` and `www.howbiscuit.com`.
- Enable separate Cloudflare Web Analytics for this project.
