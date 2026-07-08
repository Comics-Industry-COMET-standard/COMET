# Contributing to the COMET Standard

Thank you for helping improve the COMET Standard. It is a *living* standard, and it gets better when the people who use it — publishers, distributors, retailers, and software developers — propose improvements.

You do **not** need to be a programmer to contribute. Choose the path that fits you.

## The easy way: open an issue

If you have found a problem, or want to suggest a change, open a GitHub issue using one of our templates:

- **Propose a new field** — something the standard doesn't yet capture.
- **Change a picklist value** — add, rename, or clarify a controlled-vocabulary entry.
- **Report an error** — a wrong description, typo, or inconsistency.

Describe the *what* and the *why*. That's enough to start the conversation.

## The direct way: submit a pull request

If you're comfortable with GitHub, you can propose the exact change:

1. **Fork** the repository and create a branch.
2. **Set up the tooling** (one time). The schema generators and validator are Python and need two packages:

   ```
   pip3 install -r tools/requirements.txt
   ```

   On macOS you may hit an "externally-managed-environment" error; add `--break-system-packages`, or use a virtual environment:

   ```
   python3 -m venv .venv && source .venv/bin/activate && pip install -r tools/requirements.txt
   ```
3. **Make your edit** in the right place:
   - A field lives in `standard/fields/NNN-FieldName.yaml` (one file per field).
   - A controlled vocabulary lives in `standard/picklists/Name.yaml`.
   - Documentation lives in `docs/`.
4. **Do not hand-edit** the files in `schema/`. Regenerate them with `python3 tools/generate.py` and `python3 tools/generate_table_schema.py`, and commit the regenerated files alongside your change.
5. **Open a pull request** describing the change and the reasoning.

Automated checks validate that your YAML is well-formed and that both schemas are up to date (`--check`) before a human review. If you skip the regeneration step, CI will fail — so always run the generators after editing any field or picklist.

## For anything significant: write a Change Proposal

For new fields, required/type changes, or anything that affects backward compatibility, please accompany your issue or PR with a **COMET Change Proposal (CCP)** using `.github/CHANGE_PROPOSAL_TEMPLATE.md`. It captures the motivation, the proposed change, the compatibility impact, and alternatives considered. This gives the Standards Committee — and future readers — a clear record of *why* the standard is the way it is.

## Field file format

Each field is a small YAML file. Example:

```yaml
name: ProductCategory        # machine name (no spaces)
label: ProductCategory       # human-facing label
position: 16                 # ordinal position in the standard
tier: essential              # essential | core | extended
owner: publisher             # publisher | distributor
type: Pick List              # Number | Text | Decimal | Date | Boolean | Pick List
required: yes                # yes | no | for_comics | for_books |
                             #   for_comics_and_graphic_novels | for_variant_covers | for_kids_items
length: "24"                 # max length / precision
picklist: ProductCategories  # only for Pick List types; references standard/picklists/
description: |-
  Human-readable definition of the field.
example: Comics
notes: |-
  Any additional guidance.
```

## What happens next

The Standards Committee reviews your proposal (see [GOVERNANCE.md](GOVERNANCE.md)). A change is accepted only by **unanimous consent** of the Committee. Accepted changes are versioned and recorded in [CHANGELOG.md](CHANGELOG.md).

## Code of conduct

Be constructive and respectful. We're all here to make comics data better for the whole industry.
