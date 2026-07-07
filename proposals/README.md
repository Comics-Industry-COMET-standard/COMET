# COMET Change Proposals (CCPs)

This directory holds COMET Change Proposals — the documented record of significant
changes to the standard. Each CCP follows [`.github/CHANGE_PROPOSAL_TEMPLATE.md`](../.github/CHANGE_PROPOSAL_TEMPLATE.md)
and moves through the process defined in [`GOVERNANCE.md`](../GOVERNANCE.md):

```
Idea → Proposal (this file) → Discussion → Committee review → Accepted & merged → Released
```

## Log

| CCP | Title | Status | Version impact |
|---|---|---|---|
| [0001](CCP-0001-catalogmonth-yearmonth.md) | Correct `CatalogMonth` to a year-month type | Draft | **1.1.11** (normative) |
| [0002](CCP-0002-fix-all-fields-sample.md) | Fix required-field gaps in the All-Fields sample | Draft | non-normative — no bump |
| [0003](CCP-0003-mediarating-aliases.md) | Handle non-standard MediaRating values (`T-Teen`) | Draft | non-normative (Option A) — no bump |

All three originated from validating the real example files against the new
Frictionless Table Schema.

**Versioning note.** Per [GOVERNANCE.md](../GOVERNANCE.md), only *normative*
changes to the standard bump the version. Of these three, only CCP-0001 changes
normative content (a field's declared type), so it alone earns a version
(**1.1.11**). CCP-0002 (an example fix) and CCP-0003 Option A (guidance docs) are
non-normative — recorded in the changelog under the release they ship with, but
they do not consume a version number.
