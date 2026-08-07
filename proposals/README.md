# COMET Change Proposals (CCPs)

This directory holds COMET Change Proposals — the documented record of significant
changes to the standard. Each CCP follows [`.github/CHANGE_PROPOSAL_TEMPLATE.md`](../.github/CHANGE_PROPOSAL_TEMPLATE.md)
and moves through the process defined in [`GOVERNANCE.md`](../GOVERNANCE.md):

```
Idea → Proposal (this file) → Discussion → Committee review → Accepted & merged → Released
```

Ahead of the proposal stage sits the **[Data Wish List](WISHLIST.md)** — the low-bar
intake for needs that have been raised but not yet taken up. Items advance from
there into a CCP when the Committee prioritizes them.

## Log

| CCP | Title | Status | Version impact |
|---|---|---|---|
| [0001](CCP-0001-catalogmonth-yearmonth.md) | Correct `CatalogMonth` to a year-month type | **Accepted** — released v1.1.11 | **1.1.11** (normative) |
| [0002](CCP-0002-fix-all-fields-sample.md) | Fix required-field gaps in the All-Fields sample | **Accepted** — merged | non-normative — no bump |
| [0003](CCP-0003-mediarating-aliases.md) | Handle non-standard MediaRating values (`T-Teen`) | Draft — awaiting Committee choice of Option A or B | non-normative (Option A) — no bump |
| [0004](CCP-0004-field-adoption-pipeline.md) | Adopt a five-stage field adoption pipeline | Draft — direction agreed 2026-07-09 | governance only — no bump |

CCPs 0001–0003 originated from validating the real example files against the
Frictionless Table Schema. CCP-0004 came out of the 2026-07-09 quarterly meeting.

**Versioning note.** Per [GOVERNANCE.md](../GOVERNANCE.md), only *normative*
changes to the standard bump the version. Of these three, only CCP-0001 changes
normative content (a field's declared type), so it alone earns a version
(**1.1.11**). CCP-0002 (an example fix) and CCP-0003 Option A (guidance docs) are
non-normative — recorded in the changelog under the release they ship with, but
they do not consume a version number.
