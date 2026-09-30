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

CCPs are kept permanently — they are the record of *why* the standard changed, which
the changelog (the *what*) does not capture. Nothing is deleted once implemented; a
proposal simply moves through these stages:

- **Open** — proposed or under discussion; not yet approved.
- **Accepted** — approved by the Committee and merged, but not (or not yet) part of a
  released standard version — e.g. non-normative fixes and governance changes.
- **Adopted** — approved and released as part of a versioned standard release; in force.
- **Closed** — declined, withdrawn, or superseded. Kept for the record, with the reason it did not proceed.

### Open

| CCP | Title | Notes |
|---|---|---|
| [0003](CCP-0003-mediarating-aliases.md) | Handle non-standard MediaRating values (`T-Teen`) | Awaiting Committee choice of Option A or B |
| [0004](CCP-0004-field-adoption-pipeline.md) | Adopt a five-stage field adoption pipeline | Direction agreed 2026-07-09; governance only |

### Accepted

| CCP | Title | Notes |
|---|---|---|
| [0002](CCP-0002-fix-all-fields-sample.md) | Fix required-field gaps in the All-Fields sample | Merged; non-normative (no version bump) |

### Adopted

| CCP | Title | Released in |
|---|---|---|
| [0001](CCP-0001-catalogmonth-yearmonth.md) | Correct `CatalogMonth` to a year-month type | **v1.1.11** (normative) |

### Closed

_None yet._ Declined, withdrawn, or superseded proposals are listed here with the reason, and their files retained.

CCPs 0001–0003 originated from validating the real example files against the
Frictionless Table Schema; CCP-0004 came out of the 2026-07-09 quarterly meeting.

**Versioning note.** Per [GOVERNANCE.md](../GOVERNANCE.md), only *normative* changes to
the standard bump the version. Among these, only CCP-0001 changes normative content, so
it alone earns a version (**1.1.11**). Non-normative items (example fixes, guidance,
governance) are recorded in the changelog under the release they ship with but do not
consume a version number.
