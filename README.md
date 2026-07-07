# The COMET Standard

**COMET** is an open metadata standard for the comics industry — a common language for describing comics products (periodicals, graphic novels, and related items) across publishers, distributors, and retailers.

This repository is the **authoritative, versioned source of truth** for the standard. The human-readable reference site is generated from the files here.

- **Current version:** 1.1.10
- **License:** Content and documentation are licensed [CC BY 4.0](LICENSE). See [LICENSE](LICENSE).
- **Governed by:** the COMET Standards Committee — see [GOVERNANCE.md](GOVERNANCE.md).
- **Backed by:** [ComicsPRO](https://comicspro.org).

## What's in here

```
standard/
  fields/        One YAML file per field (125 fields). The canonical data dictionary.
  picklists/     Controlled vocabularies (15 lists) referenced by fields.
schema/
  comet.table-schema.json  Frictionless Table Schema — validates COMET CSV files
                           (types, required columns, picklist values). Primary schema.
  comet.schema.json        JSON Schema (draft-07) — structural inventory for JSON/API tooling.
docs/            Implementation Guide, white paper, and project plan.
examples/        Real-world sample files used as conformance fixtures.
tools/           Generation and validation scripts.
CHANGELOG.md     Version history of the standard.
GOVERNANCE.md    Who decides, and how changes are made.
CONTRIBUTING.md  How to propose a change.
```

## The three data tiers

Every field belongs to one of three tiers, which also determines who owns it:

| Tier | Owner | Purpose |
|---|---|---|
| **Essential** | Publisher | The minimum to identify a product: title, primary identifier (UPC/ISBN/EAN), price, category. |
| **Core** | Publisher | Everything that describes *what the product is*. |
| **Extended** | Distributor | Everything that describes *how to order it*. |

Current composition: **6 essential, 77 core, 42 extended** — 125 fields total, of which 23 are always required and a further 14 are conditionally required (e.g. for comics, for books, for variant covers).

## How to propose a change

The standard is *living*. Anyone can propose a change — read [CONTRIBUTING.md](CONTRIBUTING.md). In short: open an issue using one of the templates, or submit a pull request. All changes are reviewed and merged by the Standards Committee.

## How the reference site is built

The reference documentation site is generated directly from `standard/fields/` and `standard/picklists/`, so it can never drift from the standard itself. Regenerate the JSON Schema and validate examples with:

```
python3 tools/generate.py                # rebuild schema/comet.schema.json (JSON Schema)
python3 tools/generate_table_schema.py   # rebuild schema/comet.table-schema.json (Table Schema)
python3 tools/validate_table.py FILE     # validate a CSV against the standard (needs: pip install frictionless)
python3 tools/validate.py FILE           # lightweight column/required check (no dependencies)
```

---

The COMET Standard is © ComicsPRO, released under CC BY 4.0.
