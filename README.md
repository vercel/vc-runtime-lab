# vc-runtime-lab

A small demo using [`remote-components`](https://www.npmjs.com/package/remote-components) with [Vercel Microfrontends](https://vercel.com/docs/microfrontends). Open the deployed host at https://vc-runtime-lab-host.vercel.app/. It has one React/Vite host and one Remote Component remote:

- `host`: Vite React host and default microfrontend app
- `remote`: Remote Component remote

The host covers remote navigation, shared React context, and open and closed Shadow DOM.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the app servers:

```bash
pnpm dev
```

Turborepo starts the Vercel Microfrontends local proxy automatically. Open the proxy URL printed by Turbo.
