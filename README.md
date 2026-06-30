# Wizard Ops — wizardops.ca

The public marketing site for **Wizard Ops**: lifetime software for local
field-service businesses. Buy your kit once, own it forever — zero
subscriptions.

> The anti-SaaS pitch, built on the same stack as the product: a showcase site,
> instant quoting, field dispatch and auto-invoicing — welded together and
> branded to each client.

## Stack

- **Bun** — runtime + package manager
- **TanStack Start** (SSR + file-based routing, Nitro server) on **Vite 8**
- **React 19** + **Tailwind CSS v4** (CSS-variable design tokens)
- **framer-motion** + **lenis** (motion / smooth scroll)
- **next-themes** (light-grey / dark-grey, system-detected + toggle)
- **Resend** (contact / "book a demo" lead delivery, server-only)
- **zod** (validation), **sonner** (toasts), **lucide-react** (icons)

No proprietary build wrappers — a clean, self-contained TanStack Start config you
fully own.

## Features

- **Bilingual** EN (default) / FR, auto-detected from the visitor's device, with a
  manual toggle. All copy lives in one dictionary (`src/lib/i18n.tsx`).
- **Light / dark** grey themes, system-detected, with a toggle.
- One-page landing (hero, the subscription-trap comparison, the kit/features,
  how-it-works, pricing + interactive ROI calculator + SaaS comparison, trades,
  tech stack, FAQ) plus `/manifeste` and `/contact`.
- Animated hex-grid + violet-spotlight background, glassmorphism, 3D tilt cards.
- Brand name + canonical URL centralized in `src/lib/brand.ts` (one-line rebrand).

## Develop

```bash
bun install
bun run dev      # http://localhost:3000
```

## Quality gates

```bash
bunx tsc --noEmit   # type-check (strict)
bun run lint        # eslint + prettier
bun run build       # production build (client + SSR)
```

## Environment

Copy `.env.example` to `.env`. All vars are optional in dev — the contact form
soft-succeeds (logs, no email) until `RESEND_API_KEY` is set.

| Var | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required to actually deliver "book a demo" leads. |
| `RESEND_FROM` | Verified sender (default `Wizard Ops <onboarding@resend.dev>`). |
| `LEADS_TO` | Where demo requests are emailed. |
| `PUBLIC_SITE_URL` | Canonical origin for `<head>` tags. |

## Deploy

The `nitro()` Vite plugin is the deploy adapter. On **Vercel** the build
auto-detects the platform and emits the Build Output API (`.vercel/output/`), so
import the repo and deploy — no extra config. Reproduce that output locally with
`NITRO_PRESET=vercel bun run build`. A plain `bun run build` emits a portable
node-server build in `.output/` (also works on **Cloudflare Pages**). Point
`wizardops.ca` at the deployment and set the env vars above.
