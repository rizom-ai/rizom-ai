# rizom.ai consolidation — IA note (Phase 0)

Settles the information-architecture decisions for folding `rizom.work` and
`rizom.foundation` into one site at `rizom.ai`
(see `docs/plans/rizom-consolidation.md` in the brains monorepo, rev-5 mockups).

## Merged sitemap

| Path | Role | Backed by |
| --- | --- | --- |
| `/` | Platform home (hero → growth → problem → your-data → quickstart → mission → faces → colophon) | `@brains/site-rizom-ai` sections (built) |
| `/work` | Practice room (diagnostic hero, workshop, personas, proof, roster) | `@brains/site-rizom-ai` sections (built) |
| `/foundation` | Journal room (masthead, research index, chapters, support, follow) | `@brains/site-rizom-ai` sections (built) |
| `/writing` | The one index for everything published — posts, foundation essays (as a series), decks | blog + series + decks plugins |
| `/events` | Gatherings | events content (foundation's events section graduates to a route when entries exist) |
| `/network` | Agent directory | agent-discovery plugin (today's `rizom.foundation/agents`) |
| `/docs` ↗ | External | docs.rizom.ai |
| `/chat` | Public chat with the brain | web-chat interface |

Unchanged and non-negotiable: `rizom.ai/.well-known/*` and the atproto lexicon
registry endpoints (`ai.rizom.brain.*`) keep serving identically.

## Section survival

The rev-5 section sets in `@brains/site-rizom-ai` are the surviving copy for all
three rooms. The `site-content/home/*` entities in all three content repos are
**retired, not imported** — the package's schema-validated fallbacks supersede
them, and future copy edits happen through content entities in the new
`rizom-ai-site` namespace.

## Old domains (redirect map dropped)

The old sites were barely used and every list page on them is empty (verified
2026-07-09 against live sitemaps and pages), so there is no per-path redirect
map. Each retiring zone gets **one domain-level 301**:

- `rizom.work/*` → `https://rizom.ai/work`
- `rizom.foundation/*` → `https://rizom.ai/foundation`

One rule per zone, no origin, no certs. The rooms' sitebands already
acknowledge the move ("previously rizom.work — you were redirected here").

## Publishing decision (was an open decision in the plan)

**Resolved: yes, the consolidated brain publishes.** The question mostly
dissolves under the rover transition: the brain composes rover's `default`
preset, which already carries blog, series, decks, site-builder, and analytics.
On top of that:

- `add: [atproto-registry, products, rizom-ecosystem, newsletter]` —
  the registry must not lapse (canonical lexicons), products/ecosystem carry
  ranger-ai's product entities, and newsletter backs the `/foundation` follow
  band ("Follow the research"), which the approved design commits to.
- `content-pipeline` and `social-media` stay **out**: every `/social-posts`
  list on all three live sites is empty — there is no cadence to carry, and
  automated generation schedules shouldn't outrun an actual practice.

## Content-merge collision policy (executed in Phase 3, 2026-07-09)

The three content repos are `rizom-ai-content`, `rizom-work-content`, and
`rizom-foundation-content` (cloned as each app repo's `brain-data/`). Both
sources merged into `rizom-ai-content` with full history (`-s ours` merge +
selective checkout). Resolutions:

- **Identity entities resolve to rizom-ai** (`anchor-profile`,
  `brain-character`, `site-info`, `HOME`, `product/*`) — the losing copies
  were placeholders or trivially-divergent punctuation.
- **work-unique content imported**: six workshop skills, eleven extracted
  topics (not re-derivable — work's conversations don't migrate, only
  foundation's runtime state does), its three assessment/memory prompts, and
  its **newer `link-extraction` prompt with accuracy rules, which beat
  rizom-ai's older copy** (the one exception to identity-wins).
- **work-vs-foundation collisions all went to work** (newer by a month):
  `swot/swot.md` (foundation's was an empty derived stub) and the three
  shared pipeline prompts.
- **foundation-unique content imported**: the decks (`2025`, `cococo`,
  `declaration`, `tutorial`), *The Future of Work is Play* (becomes the first
  entry of the foundation-essays series on `/writing`), `RizomBrandBook`,
  `RizomBusinessBrief`.
- **`site-content/*` retirement is deferred to cutover** — the content repo
  feeds the live rizom.ai brain on push, so the merge stays additive; the
  old site-content entities are deleted in the same step that switches the
  deployment to the consolidated site package.
