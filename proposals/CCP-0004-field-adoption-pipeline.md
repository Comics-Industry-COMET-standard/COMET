# COMET Change Proposal (CCP)

**CCP title:** Adopt a five-stage field adoption pipeline
**Author(s):** COMET Standards Committee (direction set at the 2026-07-09 quarterly meeting)
**Date:** 2026-08-07
**Status:** Draft — direction agreed 2026-07-09, wording not yet ratified
**Target version:** governance only — no standard version bump

## 1. Summary

Define a five-stage lifecycle every new COMET field moves through — **Wish List →
Proposed → Candidate → Published standard → Adoption timeline** — and record it in
`GOVERNANCE.md` so the community has shared language for where any given field
stands.

## 2. Motivation

At the 2026-07-09 quarterly meeting the group set direction on this pipeline. The
problem it solves is that today there is no shared vocabulary for a field's
maturity. A field that has been *mentioned once in a meeting* and a field that
*distributors are already emitting* are both, informally, "coming soon." That
ambiguity has real cost:

- **Requesters** can't tell whether their need was heard or is being worked on.
- **Distributors and data consumers** can't tell when it is safe to start building
  against a field, so they wait for the standard, and the standard waits for
  implementations.
- **The Committee** has no defined moment where a field is "in," so every decision
  is relitigated.

The existing governance process (`Idea → Proposal → Discussion → Review → Accepted
→ Released`) describes how a *change* is decided. It does not describe how a
*field* matures from a vague need into something the industry actually populates.
The two are complementary: this pipeline is the field lifecycle, and the CCP
process is the decision mechanism used at each gate.

## 3. Proposed change

Add a **Field adoption pipeline** section to `GOVERNANCE.md` defining five stages.

**1. Data Wish List.** Motivation-focused intake describing the need/problem/gap,
not the solution. Requests arrive via meetings, help@cometstandard.com, or issues;
the Committee makes an editing pass before adding. Low bar to enter; **no guarantee
of advancement**. Lives at `proposals/WISHLIST.md`.

**2. Proposed.** The Committee prioritizes from the wish list and presents items to
the community for discussion, as a CCP in `proposals/`. Where the solution is
obvious, the Committee may draft it and present need and solution together; where
it is complex, the need is presented with several possible directions and an
explicit "what do you think."

**3. Candidate.** Reached once a proposed field has been discussed and has consensus
to approve. At this stage:
- Distributors begin emitting the field, even if it is blank for some time.
- Data consumers begin updating handlers to read it once it appears.
- Willing publishers begin updating procedures to supply the data.

A candidate field is **published in the repository and marked `candidate`**, so it
is visible and buildable-against, but it is not yet part of the required standard
and must not fail validation.

**4. Published standard.** The group decides by consensus when a candidate joins the
main standard. Suggested criterion, to be confirmed: **all major distributors and at
least one publisher are providing data** for the field.

**5. Adoption timeline.** The dates on which the new standard is adopted and
**enforced by tools** — i.e. when validators begin failing files that don't comply.

**Implementation note.** Stage 3 requires a way to mark a field's lifecycle stage.
The suggested mechanism is a `stage:` key on the field YAML (`candidate` |
`published`, defaulting to `published` for the existing 125 fields), surfaced on the
generated field pages and honored by the validators so candidate fields never gate a
build. This is mechanical and can follow once the stage definitions are ratified.

## 4. Version impact

- [x] **None to the standard** — governance and process only. Per `GOVERNANCE.md`,
      only normative changes to field definitions, picklists, or required-field
      rules consume a version number.
- [ ] PATCH / MINOR / MAJOR

## 5. Backward compatibility

No impact on existing COMET files. All 125 current fields are, by definition,
already at stage 4 (published standard). Adding a `stage:` key with a `published`
default leaves every existing field and every existing file unchanged.

## 6. Alternatives considered

- **Keep the current single process.** Rejected — it decides changes but says
  nothing about field maturity, which is the actual gap the meeting identified.
- **Track stages in the Google Sheet's existing "Proposed Fields" tab.** Rejected as
  the long-term home; it reintroduces the split source of truth this project set out
  to eliminate. The tab remains useful as a communication surface during transition.
- **Fewer stages (merge Candidate into Published).** Rejected — Candidate is the
  stage that does the real work, because it is what lets distributors and consumers
  build against a field *before* it is mandatory. Removing it recreates the
  chicken-and-egg problem in Motivation.

## 7. Open questions

- **Criterion for stage 4.** Is "all major distributors + ≥1 publisher" right, and
  what counts as a *major* distributor? Needs a written definition to be testable.
- **Minimum time at Candidate.** Should a field have to sit at Candidate for a
  defined period (a quarter? two?) before it can advance, so implementers get a
  predictable window?
- **Wish list expiry.** Do wish-list entries age out if nothing advances them, or
  stay indefinitely? Indefinitely risks an unreadable list; expiry risks losing
  real needs.
- **Who sets adoption timelines** (stage 5) — the Committee alone, or the group by
  consensus?
