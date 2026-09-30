# COMET Data Wish List

This is the **front of the adoption pipeline** — the low-bar intake for needs the
industry has raised. Entries describe the **need, problem, or gap**, not a solution.

Getting onto this list is deliberately easy, and **being on it implies no
commitment**. The Standards Committee prioritizes from here and advances selected
items to *Proposed* (a CCP in this directory) when there is appetite to work on them.

```
Wish List (here)  →  Proposed (CCP)  →  Candidate  →  Published standard  →  Adoption timeline
```

To add an entry: raise it in a quarterly meeting, email help@cometstandard.com, or
open an issue. Keep it to the need — "we can't tell X from Y" — and leave the
solution to the proposal stage.

---

## Open needs

### W-001 — Distinguishing a new edition of already-printed material
**Raised by:** Betsy Golden · 2026-07-09

There is no way to signal that a product is a **new edition** of material that has
already been printed. This matters when the content is unchanged (or lightly
revised) but the product is commercially distinct — internally it gets a new ISBN,
and the trade refers to it as e.g. "(2026 Edition)". Retailers and data consumers
currently cannot tell a new edition from a reprint or from the original.

Related existing fields: `Reprint`, `Printing`. Neither expresses "new edition."

---

### W-002 — Sorting within a title family
**Raised by:** Alex Morales (Marvel) · 2026-07-09

`TitleFamilyID` groups related titles, but there is nothing that expresses the
**order** of members within that family. Consumers building reading order or
display order from a family have to infer it. The need is a family-level sort
companion to the existing grouping field.

Related existing fields: `TitleFamilyID`, `SeriesFamily`, `IssueSort`.

---

### W-003 — Connected one-shots that each carry #1
**Raised by:** JC Cunningham · 2026-07-09

A set of one-shots can tell one sequential story while each issue is numbered #1.
Nothing in COMET expresses that reading sequence, so these products sort and
display as unrelated #1s. The need is a way to convey narrative order across
separately-numbered one-shots.

Related existing fields: `IssueSort`, `Storyline`, `SeriesFamily`.

---

### W-004 — Bundles whose component issues have no metadata
**Raised by:** Megan (Fort Psycho / Oni) · 2026-07-09

A bundle was orderable while the single issue inside it had no metadata of its own.
Data consumers could sell the bundle but had nothing to describe or catalog its
contents. The gap is that bundle components are not guaranteed to exist as
described products.

Related existing fields: `BundleQuantity`, `BundleUPCs`, `ContentItems`.

---

### W-005 — Physical make-up of the product: cover stock
**Raised by:** April 2026 meeting

No way to express cover stock **weight, finish, or treatment** (foil, spot gloss,
embossing, etc.). Retailers use this to set expectations on premium editions and to
justify price differences to customers.

---

### W-006 — Physical make-up of the product: paper stock
**Raised by:** April 2026 meeting

No way to express interior paper **weight or treatment**. Same motivation as W-005 —
it is part of what distinguishes editions at different price points.

---

### W-007 — Packaging type
**Raised by:** April 2026 meeting; reinforced 2026-07-09

No standard way to express how a product is packaged — polybagged, bagged,
blind-bagged, boxed, shrink-wrapped. This affects handling, returnability
expectations, and how the product is described to customers. The 2026-07-09
discussion noted the terms are also used inconsistently, so a shared vocabulary is
part of the need.

---

### W-008 — Publisher bridge
**Raised by:** April 2026 meeting

Raised as a need to connect a publisher's own identifiers/records to COMET's
`PublisherName` / `PublisherCode` / `DistributorPublisherCode`. The precise gap
needs restating by the requester before this can advance.

> **Needs clarification** — carried forward so it is not lost.

---

## Guidance gaps

These are **not** requests for new fields. The field exists; what is missing is
documented guidance on how to use it. They advance as documentation work rather
than as normative changes.

### G-001 — Implementation guidance on every field
**Raised by:** 2026-07-09

Fields carry a description but often not enough guidance to be used consistently.
The ask is per-field implementation guidance across the dictionary.

> **Status: scoping.** Answer (2026-09): explore what doing this would involve.

**Where things stand (measured 2026-09-29).**

| | Fields |
|---|---|
| Total fields | 125 |
| With no `notes` at all | 97 |
| Whose `notes` only point to a pick list | 6 |
| With no `example` | 17 |
| Required or conditionally required, with no `notes` | 19 |

By tier, the fields with no notes are 2 essential, 56 core, and 39 extended.

**What it would involve.**

1. **Agree a guidance template.** A short, fixed set of things every field's notes
   should answer: what goes in it, the expected format, the default or what to do
   when there is no value, a normal example plus an edge case, and common mistakes.
2. **Write it where the guidance already lives.** Each field's `notes` in
   `standard/fields/` is already published on the docs site, so no new tooling is
   needed. Guidance is non-normative, so none of this needs a version bump.
3. **Work in batches, most-used fields first.**
   - Batch 1: the 19 required or conditional fields with no notes, plus the essential tier.
   - Batch 2: the remaining core fields.
   - Batch 3: the extended fields, which distributors own. Distributor input will matter here.
4. **Review each batch** with the Committee before it is published.

**Decision needed:** approve the template and start Batch 1. G-002 and G-003 below
already cover IssueSort, FullTitle, SeriesName, SubTitle, CoverDescription, and Printing.

### G-002 — `IssueSort`: intended use and default value
**Raised by:** Jothan · 2026-07-09

Is the default for issue sort the issue number, or empty? The goal is for
distributors and publishers to actually populate it. Legacy (LGY) numbering appears
to be solved by this field, but that is not written down anywhere. Needs documented
guidance including the default.

> **Answered (2026-09).** The default IssueSort is the issue number (SeriesNumber).
> When an issue falls outside the regular numbering, use a decimal value that places
> it between its neighbors. Example: if issue #0 falls between #14 and #15, its
> IssueSort is 14.5. Now written into `standard/fields/037-IssueSort.yaml`. Still
> open: whether to document IssueSort as the answer to legacy (LGY) numbering.

### G-003 — Naming conventions
**Raised by:** 2026-07-09

Publish the conventions COMET expects, covering at minimum:

- Capitalization — Title Case vs. sentence case.
- `FullTitle` assembly for periodicals and for collected editions/GN/TPB/HC.
- Polybagged vs. bagged vs. blind-bagged (see also W-007).
- New vs. reprint, and using "(2026 Printing)" rather than "New Printing".
- Packaging type terminology.

> The `FullTitle` assembly pattern itself was corrected on 2026-08-07 — it had
> referenced a non-existent "variant description" field instead of
> `CoverDescription`. See `standard/fields/004-FullTitle.yaml`.

> **Answered in part (2026-09).** Now written into the field notes for FullTitle,
> SeriesName, SubTitle, CoverDescription, and Printing.
>
> - **Capitalization.** FullTitle, SeriesName, and SubTitle are Title Case.
>   CoverDescription may be sentence case.
> - **FullTitle for periodicals:** SeriesName, SeriesNumber, SubTitle, CoverDescription.
> - **FullTitle for collected editions/GN/TPB/HC:** SeriesName, VolumeTag,
>   SeriesNumber, SubTitle, CoverDescription, then the FormatType description.
> - **Reprints.** The printing label goes in SubTitle. Collected editions, GN, TPB,
>   and HC use "YYYY Printing". Periodicals use "X Print" (for example, "2nd Print").
>
> Still open: polybagged vs. bagged vs. blind-bagged, and packaging type
> terminology (see W-007).

---

## Open questions

Process and technical questions raised alongside the wish list. They are recorded
here so they get answered, but they are not field requests.

| # | Question | Raised | Status |
|---|---|---|---|
| Q-001 | Does a change to a field's `position` count as a breaking update? | 2026-07-09 | **Answered** — see below |
| Q-002 | Should the main interchange file stay CSV, or should JSON be offered? How are serialized/repeating fields represented? | 2026-07-09 | **Answered (part)** — see below |

**Q-001 — Answered.** A change to a field's `position` does **not** count as a breaking
update. COMET files are read by **header name**, not by column position, so positions
may change as long as header formats stay consistent. To ease transitions, **positions
will not be moved during the 1.x.x line**; from **2.0.0 onward, a position change no
longer requires a version bump.** This is now written into the versioning policy in
`GOVERNANCE.md`.

**Q-002 — Answered (part).** CSV remains the **primary** interchange format, and **JSON
may be offered as an additional format.** (A machine-readable JSON Schema already exists
alongside the Frictionless Table Schema — see the Schemas page.) Still open: exactly how
serialized / repeating fields are represented in the JSON form — to be specified when the
JSON format is published.

Consistent with the Q-001 answer, any JSON form must be keyed by **field name, not
position** (which JSON is by nature), so the "read by header/key name, not column
position" rule carries over to JSON unchanged. This should be stated explicitly in the
JSON format specification when it is published.
