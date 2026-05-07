# vc-runtime-lab

Two demos exploring runtime composition with [Vercel Microfrontends](https://vercel.com/docs/microfrontends) and [`remote-components`](https://www.npmjs.com/package/remote-components).

## Demos

### `lab` — Vite host + 1 Next remote
Vite React host (`apps/host`) and a Next.js Remote Components remote (`apps/remote`). Covers remote navigation, shared React context, and open vs closed Shadow DOM. Local proxy: **3024**. Deployed at https://vc-runtime-lab-host.vercel.app/.

### `shop` — Multi-app microfrontend storefront
A bedroom-furniture storefront built with Next.js 16 native microfrontends + `remote-components`. Product imagery is rendered as CSS gradients (no external image hosts). Demonstrates two composition patterns side-by-side:
- **Vertical MFEs** — each owns a route, routed at the edge via `microfrontends.json`.
- **Horizontal MFEs** — expose components via `ExposeRemoteComponent`, consumed by any host via `ConsumeRemoteComponent`.

Local proxy: **3025**.

| App        | Port | Pattern    | Route(s)                            |
|------------|------|------------|-------------------------------------|
| `shell`    | 3000 | Default    | `/api/*`, fallback                  |
| `header`   | 3001 | Horizontal | `/components/header`                |
| `footer`   | 3002 | Horizontal | `/components/footer`                |
| `home`     | 3003 | Vertical   | `/`                                 |
| `beds`     | 3004 | Vertical   | `/beds`, `/mattresses`              |
| `pdp`      | 3005 | Vertical   | `/product/:id`                      |
| `checkout` | 3006 | Vertical   | `/checkout`                         |
| `sale`     | 3008 | Vertical   | `/sale`, `/sale/:category`          |

## Running locally

```bash
pnpm install
```

Run one demo at a time:

```bash
pnpm dev:shop   # 8-app storefront, proxy at http://localhost:3025
pnpm dev:lab    # Vite host + remote, proxy at http://localhost:3024
```

`pnpm dev` defaults to `dev:shop`.

## Workspace layout

```
vc-runtime-lab/
├── apps/
│   ├── host/          # lab demo — Vite host
│   ├── remote/        # lab demo — Next remote
│   ├── shell/         # shop demo — default app, /api/*, microfrontends.json
│   ├── header/        # shop demo — horizontal remote
│   ├── footer/        # shop demo — horizontal remote
│   ├── home/          # shop demo — owns /
│   ├── beds/          # shop demo — owns /beds, /mattresses
│   ├── pdp/           # shop demo — owns /product/:id
│   ├── checkout/      # shop demo — owns /checkout
│   └── sale/          # shop demo — owns /sale
├── packages/
│   ├── ui/            # shop demo — Button, Input, Typography + Tailwind base
│   ├── api-client/    # shop demo — shared fetch helpers + types
│   └── tsconfig/      # shared TS configs
├── design-reference/  # shop demo — design mockup PNGs
└── scripts/           # shop demo — Vercel Blob asset upload helper
```

## Type-check

```bash
pnpm typecheck:lab
pnpm typecheck:shop
```
