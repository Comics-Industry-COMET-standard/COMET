# COMET Standard — reference documentation site

A [Docusaurus](https://docusaurus.io) site that renders the COMET Standard as a clean,
searchable, always-current reference. Published to GitHub Pages at
**https://docs.cometstandard.com**.

## The one principle

**Every reference page is generated from the repo's YAML at build time — never hand-written.**
`scripts/generate.js` reads `../standard/fields/*.yaml` and `../standard/picklists/*.yaml`
and emits the field, picklist, and data-dictionary pages. It runs automatically before
`start` and `build` (npm `prestart` / `prebuild` hooks). Change a field's YAML, rebuild,
and the site reflects it. Do not edit the generated files.

### What's generated vs. authored

| Generated (git-ignored, rebuilt every time) | Authored (committed) |
|---|---|
| `docs/fields/{essential,core,extended}.md` | `docs/intro.mdx` (home) |
| `docs/picklists/*.md` (+ `index.md`) | `docs/data-dictionary.mdx` (wraps the table component) |
| `docs/implementation-guide.md` (copied from `../docs/`) | `src/components/DataDictionary/` |
| `docs/white-paper.md` (copied from `../docs/`) | `docusaurus.config.js`, `sidebars.js`, `src/css/` |
| `docs/changelog.md` (copied from `../CHANGELOG.md`) | |
| `src/data/fields.json`, `src/data/meta.json` | |

`docs/project-plan.md` and `docs/DOCUSAURUS-BUILD.md` are intentionally **not** published.

## Develop

```bash
npm install
npm start        # regenerates, then serves at http://localhost:3000 with live reload
npm run build    # regenerates, then builds static site into ./build (fails on broken links)
npm run serve    # preview the production build locally
npm run generate # just run the YAML → MDX generator
```

Requires Node 18+ (CI uses Node 20).

## Deploy

Pushing to `main` triggers `.github/workflows/docs.yml`, which builds and deploys to
GitHub Pages. Pull requests build the site as a check (broken internal links fail the build)
but do not deploy.

### ⚠️ One manual step for the repo owner: DNS

The site is configured for the custom domain `docs.cometstandard.com`
(`docusaurus.config.js` `url`/`baseUrl` + `static/CNAME`). For that domain to resolve you
must, **at the domain registrar**, add a DNS record:

```
CNAME   docs   comics-industry-comet-standard.github.io
```

(or the four A records for GitHub Pages apex hosting if you prefer). Until DNS is set, the
site is reachable at the `*.github.io` Pages URL. Also enable **Settings → Pages → Source:
GitHub Actions** in the repository once.
