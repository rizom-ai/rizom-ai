# rizom.ai

Standalone `rizom.ai` brain instance for the Rizom product site.

## Status

This repo keeps app-local Rizom ownership in:

- `src/site.ts` for site overrides
- `src/site-content.ts` for landing-page content definitions
- `src/sections/*` for app-owned section layouts

Shared runtime/framework packages come from npm:

- `@rizom/brain`
- `@rizom/ui`

## Setup

```bash
cp .env.example .env
touch .env.local

# optional: add local-only bootstrap secrets to .env.local
# e.g. OP_SERVICE_ACCOUNT_TOKEN / KAMAL_SSH_PRIVATE_KEY

bun install
bun run start
```

Optional shell helper:

```bash
direnv allow
```

## Files

| File | Purpose |
| --- | --- |
| `brain.yaml` | instance config |
| `.env.example` | runtime + deploy secret template |
| `.env.schema` | varlock/env-spec contract |
| `config/deploy.yml` | Kamal deploy config |
| `.github/workflows/*` | repo-owned publish/deploy workflows |
| `src/site.ts` | app-local site overrides |
| `src/site-content.ts` | app-local content definitions |
| `brain-data/` | local durable content checkout |

## Content sync

`brain.yaml` keeps `directory-sync` pointed at the Rizom content repo:

- `rizom-ai/rizom-ai-content`

The local `brain-data/` directory is the working checkout used by the runtime.

## Deployment

This repo uses the scaffolded repo-local flow:

1. `Publish Image`
2. `Deploy`

The deploy workflow reads `brain.yaml`, validates `.env.schema` via varlock, publishes the repo-owned image, provisions/reuses the server, updates Cloudflare DNS, and runs Kamal.

## Notes

- shared docs still live in the main `rizom-ai/brains` repo
- app UI code links to shared documentation there intentionally
