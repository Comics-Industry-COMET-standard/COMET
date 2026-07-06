# Handoff Brief: Build the COMET Reference Docs Site (Phase 2)

**Audience:** Claude Code (or any developer) picking up Phase 2 of the COMET living-repository project.
**Prereqs read:** `README.md`, `GOVERNANCE.md`, `docs/project-plan.md`.
**Status of the repo:** Phase 1 is complete. The standard is fully migrated to YAML, the JSON Schema generates and validates, and CI is in place. Your job is to build the documentation site that renders this repo as a browsable reference.

---

## 1. Goal

Build a Docusaurus site that presents the COMET Standard as a clean, searchable, always-current reference. The site is published to GitHub Pages at **`docs.cometstandard.com`**.

**The one non-negotiable principle:** every reference page is **generated from the repo's YAML at build time** — never hand-written and never a copy. If someone changes `standard/fields/044-Language.yaml`, the next build must reflect it automatically. This is what makes the standard "living." Do not create Markdown that duplicates field/picklist content by hand.

---

## 2. What already exists (your inputs)

```
standard/fields/NNN-FieldName.yaml   125 files — the canonical data dictionary
standard/picklists/Name.yaml          15 files — controlled vocabularies
schema/comet.schema.json              generated; do not hand-edit
docs/implementation-guide.md          authored prose — drop in as a page
docs/white-paper.md                   authored prose — drop in as a page
docs/project-plan.md                  internal; do NOT publish to the public site
tools/generate.py                     rebuilds the JSON Schema from field YAML
tools/validate.py                     checks a CSV against the standard
examples/*.csv                        real sample files (PRH, Lunar)
COMET-Assets/ (in the parent folder)  logos, icons, images for branding
```

### Field YAML shape

```yaml
name: ProductCategory        # machine name, no spaces (use for anchors/keys)
label: ProductCategory       # human label (some differ, e.g. "Unit Width")
position: 16                 # ordinal; sort by this
tier: essential              # essential | core | extended
owner: publisher             # publisher | distributor
type: Pick List              # Number | Text | Decimal | Date | Boolean | Pick List
required: yes                # yes | no | for_comics | for_books |
                             #   for_comics_and_graphic_novels | for_variant_covers | for_kids_items
length: "24"
picklist: ProductCategories  # present only for Pick List types; -> standard/picklists/ProductCategories.yaml
description: |-
  ...
example: Comics
notes: |-
  ...
```

### Picklist YAML shape

```yaml
name: SeriesType
source_columns: [SeriesType, Description]   # column names vary per list
count: 4
values:
  - SeriesType: One-Shot
    Description: A one-off item, is not connected to another series.
  - ...
```

Note picklists do **not** share a uniform column schema — `ProductCategories` has `ID/ProductCategory/HSCode`, `MediaRating` has `Media Rating/Description`, etc. Render them generically from `source_columns` + `values` rather than assuming fixed keys.

---

## 3. Decisions already made (do not re-litigate)

| Decision | Setting |
|---|---|
| Generator | Docusaurus (matches the Metron model we're emulating) |
| License | CC BY 4.0 — add an attribution footer sitewide |
| Field page structure | **Grouped by tier**, with a searchable master dictionary table. See §4. |
| Search | Start with an **offline/local search** plugin; Algolia DocSearch is a later option |
| Deploy | GitHub Pages via GitHub Actions, custom domain `docs.cometstandard.com` |
| Versioning label | Show current standard version (**1.1.10**) prominently |
| Marketing site | `cometstandard.com` (WordPress) stays as-is; this site is docs only and links back to it |

---

## 4. Required pages & structure

Build a generator (Node script preferred so it lives in the Docusaurus toolchain; Python is acceptable if you'd rather reuse `tools/`) that runs before/at build and emits:

1. **Home / Introduction** — what COMET is, the three tiers, current version, how to contribute (link to `CONTRIBUTING.md`). Can reuse white-paper intro content.

2. **Data Dictionary (master table)** — a single searchable, sortable table of all 125 fields: Name, Tier, Owner, Required, Type, and a link to the field's detail. This is the page most people will use. Consider client-side filtering by tier and required-status.

3. **Field reference, grouped by tier** — three sections (Essential, Core, Extended). Within each, one entry per field (sorted by `position`) rendering: label, machine name, required status (render the conditional values in plain English — e.g. `for_comics` → "Required for comics"), type, length, description, example, notes, and — for Pick List fields — a link to the picklist page.

4. **Picklists** — one page per picklist, rendered generically as a table from `source_columns` + `values`, with the count. Field pages link here; picklist pages should back-link to the fields that use them.

5. **Implementation Guide** — render `docs/implementation-guide.md`.

6. **White Paper** — render `docs/white-paper.md`.

7. **Changelog** — render `CHANGELOG.md`.

**Do not publish** `docs/project-plan.md` or this file to the public site.

---

## 5. Branding

- Logos/icons/images are in the sibling `COMET-Assets/` folder (`00-Web/` has web-ready logos, favicons under `ICONS/`). Copy what you need into the Docusaurus `static/` dir.
- Use the COMET wordmark in the navbar and a favicon. Pull the palette from the logo (dark/space theme). Keep it clean; this is a reference site, not a marketing page.

---

## 6. Deploy

- Add a GitHub Actions workflow that builds the site and deploys to GitHub Pages on merge to `main`.
- Configure the custom domain `docs.cometstandard.com`: set `url`/`baseUrl` in `docusaurus.config.js`, add a `static/CNAME` file, and enable Pages in repo settings.
- **The only step requiring the repo owner:** add a DNS `CNAME` record at the registrar pointing `docs.cometstandard.com` to the GitHub Pages host. Flag this; don't block the build on it — the site works on the `github.io` URL until DNS is set.

---

## 7. Acceptance checks (Milestone M2)

The build is done when:

- [ ] `npm run build` succeeds with no broken internal links.
- [ ] All **125 fields** appear in the master table and each has a detail entry.
- [ ] All **15 picklists** render, and every Pick List field links to the correct picklist page (and back).
- [ ] Conditional `required` values render as human-readable text, not raw slugs.
- [ ] Editing a field's YAML and rebuilding changes the rendered page (prove the generation, not duplication).
- [ ] Search returns field and picklist pages.
- [ ] The implementation guide, white paper, and changelog render; the project plan and this brief do **not**.
- [ ] CI builds the site on PRs (extend the existing `.github/workflows/` setup).

---

## 8. Suggested sequence

1. Scaffold Docusaurus in a `site/` subdirectory (keep the standard at the repo root).
2. Write the YAML→MDX generator; wire it to run before `docusaurus build`/`start`.
3. Build the master dictionary table + field-by-tier pages, then picklist pages with cross-links.
4. Drop in the authored docs (guide, white paper, changelog).
5. Branding + local search.
6. GitHub Pages workflow + custom-domain config; flag the DNS step.
7. Run the acceptance checklist.

Estimated effort: ~2–3 focused build days.
