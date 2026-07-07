# COMET Change Proposal (CCP)

**CCP title:** Correct `CatalogMonth` to a year-month type
**Author(s):** COMET Standards Committee (originated from schema validation)
**Date:** 2026-07-06
**Status:** Draft
**Target version:** 1.1.11

## 1. Summary

`CatalogMonth` carries a year-month value (e.g. `2021-02`), but the standard types
it as a full `Date`. This proposal changes its declared type to a year-month so
the type matches the actual data and the schema can validate it correctly.

## 2. Motivation

When the example files were validated against the new Frictionless Table Schema,
`CatalogMonth` failed with a `type-error`: the value `2025-06` is not a full ISO
date (`YYYY-MM-DD`). This is not bad data — the field is defined as a year-month.
The field's own description says *"(YYYY-MM)"* and its length is `7`, both
confirming a year-month, yet the `type` is `Date`. As written, every valid
`CatalogMonth` value fails strict validation, which undermines the schema.

## 3. Proposed change

- **Field:** `CatalogMonth` (position 97, extended, distributor, optional)
- **Change:** `type: Date` → `type: YearMonth`
- **Value format:** `YYYY-MM` (unchanged from current usage)
- **Schema mapping:** the Table Schema generator maps `YearMonth` to the
  Frictionless `yearmonth` type; the JSON Schema keeps it as a string with a
  `^\d{4}-\d{2}$` pattern.
- **Generator:** add `YearMonth` to the type map in
  `tools/generate_table_schema.py` and `tools/generate.py`.

## 4. Version impact

- [x] **PATCH** — corrective clarification. `CatalogMonth` already stores
      `YYYY-MM` values; this only aligns the declared type to the data the field
      has always held. No accepted value changes and no existing file is
      affected. Target **1.1.11**.
- [ ] MINOR
- [ ] MAJOR

> GOVERNANCE.md bumps the *minor* version for a type change that alters the data
> contract. This case is a **corrective type clarification** — the accepted value
> format (`YYYY-MM`) is unchanged — so it is treated as a PATCH. See the
> clarifying note under "Versioning policy" in GOVERNANCE.md.

## 5. Backward compatibility

Non-breaking for data: existing files already store `CatalogMonth` as `YYYY-MM`,
so no file needs to change. The effect is that validation now *passes* for values
that previously (incorrectly) failed. Implementations that treated the field as a
generic string are unaffected.

## 6. Alternatives considered

- **Leave as `Date`, relax the schema to string** — hides the real semantics and
  loses validation of the year-month shape. Rejected.
- **Store a full date (`YYYY-MM-01`)** — changes existing data and misrepresents
  month-granularity solicitation dates. Rejected.

## 7. Open questions

- Two related date-family fields surfaced during the same validation and likely
  warrant their own CCPs: `ReturnWindow` holds a **date range**
  (`2024-08-01:2024-08-15`) while typed as `Date`, and the `OnSaleDate` example in
  the dictionary is a stray Excel serial (`45735`) rather than an ISO date. Should
  these be bundled into a single "date-family cleanup" release, or handled
  separately? (Recommendation: separate CCPs, likely the same 1.1.11 patch
  release since they are all corrective clarifications.)
