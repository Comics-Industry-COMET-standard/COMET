# COMET Change Proposal (CCP)

**CCP title:** Handle non-standard MediaRating values (`T-Teen`)
**Author(s):** COMET Standards Committee (originated from schema validation)
**Date:** 2026-07-06
**Status:** Draft
**Target version:** docs (or 1.1.11 if an alias table is adopted)

## 1. Summary

A real publisher export (`Lunar-COMET-0725.csv`) uses `T-Teen` for `MediaRating`,
which is not a valid COMET value. This proposal decides how COMET should treat
common non-standard rating values.

## 2. Motivation

The Table Schema flagged `MediaRating = "T-Teen"` as an `enum` constraint error.
The valid COMET values are `Explicit Content`, `Mature`, `Parental Advisory SLC`,
`Rated T+`, `Rated T`, `All Ages`, `No Rating` (and blank). `T-Teen` is clearly
intended to mean `Rated T`, but publishers use varied house styles. Deciding a
policy now prevents ambiguity and helps adoption.

## 3. Proposed change

Two viable paths; the Committee should choose one:

**Option A (recommended) — keep the vocabulary strict, add non-normative mapping
guidance.** Do not add `T-Teen` as a value. Instead add a "Common mappings"
section to the MediaRating documentation and picklist notes, e.g.:

| Seen in the wild | Maps to COMET value |
|---|---|
| `T-Teen`, `Teen`, `T` | `Rated T` |
| `TeenPlus`, `T+` | `Rated T+` |
| `MA`, `Mature 17+` | `Mature` |

This keeps validation strict (bad values still fail) while guiding publishers to
correct their data. *Version impact: documentation only — no standard change.*

**Option B — add an alias mechanism to the picklist.** Introduce an optional
`aliases` list per picklist value that validators may accept and normalize. This
is more permissive and more work. *Version impact: PATCH (1.1.11), plus schema and
tooling changes.*

## 4. Version impact

- [x] **None / docs only** under Option A
- [ ] PATCH (1.1.11) under Option B
- [ ] MINOR / MAJOR

## 5. Backward compatibility

- Option A: none — strict validation is unchanged; only guidance is added.
- Option B: additive and backward-compatible, but changes validator behavior
  (previously-failing files may pass), which the Committee may or may not want.

## 6. Alternatives considered

- **Add `T-Teen` directly as a valid value** — fragments the vocabulary and
  invites every house style into the standard. Rejected.
- **Silently ignore unknown ratings** — defeats the purpose of a controlled
  vocabulary. Rejected.

## 7. Open questions

- Does the Committee prefer a strict standard with mapping guidance (A) or a
  built-in alias mechanism (B)? This choice sets precedent for how *all* picklists
  handle real-world variants.
