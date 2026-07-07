# COMET Change Proposal (CCP)

**CCP title:** Fix required-field gaps in the All-Fields sample
**Author(s):** COMET Standards Committee (originated from schema validation)
**Date:** 2026-07-06
**Status:** Draft
**Target version:** (sample correction — no standard change)

## 1. Summary

The `examples/All-Fields-COMET-example.csv` sample leaves two always-required
fields blank. This corrects the sample so it conforms to the standard.

## 2. Motivation

Validating `All-Fields-COMET-example.csv` against the Table Schema reported
`constraint-error` on two columns marked `required: yes`:

- `PrimaryContentType` — blank in every data row
- `Unit Depth` — blank in some rows

Because this is the *canonical example of a complete file*, it should validate
cleanly; otherwise it teaches implementers the wrong thing and makes the CI
example-check noisy. The standard itself is correct — only the sample is wrong.

## 3. Proposed change

- **File:** `examples/All-Fields-COMET-example.csv` (documentation/sample only)
- **Change:** populate the missing required cells with valid example values:
  - `PrimaryContentType` → a valid picklist value, e.g. `Original Content`
  - `Unit Depth` → a plausible measurement, e.g. `0.1`
- **No change** to any field definition, picklist, or schema.

## 4. Version impact

- [x] **None to the standard** — this is a sample-file correction. (Optionally
      note it under a PATCH release changelog entry as a documentation fix.)
- [ ] PATCH / MINOR / MAJOR

## 5. Backward compatibility

No impact. Only a sample file changes.

## 6. Alternatives considered

- **Make the fields optional to match the sample** — wrong direction; the fields
  are legitimately required. Rejected.
- **Remove the columns from the sample** — it's the *all-fields* example, so it
  must include them. Rejected.

## 7. Open questions

- Should the CI example-validation step be made **strict** (fail the build on a
  non-conformant example) once the bundled samples are clean? Real-world captures
  like the Lunar file would then live in a separate, non-gating `examples/real/`
  folder. (Recommendation: yes.)
