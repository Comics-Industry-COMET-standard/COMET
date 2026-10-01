# Changelog

All notable changes to the COMET Standard are recorded here. Versioning follows the policy in [GOVERNANCE.md](GOVERNANCE.md).

This history is seeded from the standard's original `Changelog.csv`.

## [Unreleased]

Non-normative changes — no version bump (see [GOVERNANCE.md](GOVERNANCE.md)). These
ship with the next release.

### Fixed
- **`FullTitle` assembly guidance** referenced a "variant description" field that
  does not exist in COMET. The cover-difference text comes from
  **`CoverDescription`**, and the ratio from **`VariantRatio`**. Corrected both
  assembly patterns and fixed the "Collcted" typo. Raised at the 2026-07-09
  quarterly meeting. Guidance only — no accepted value changes.

- **Field guidance for naming and sorting** (Data Wish List G-002 and G-003).
  `IssueSort` now documents its default (the SeriesNumber) and the decimal rule for
  out-of-sequence issues. `FullTitle` assembly patterns now follow the Committee's
  answer: SeriesName, SeriesNumber, SubTitle, CoverDescription for periodicals, with
  VolumeTag and the FormatType description added for collected editions. This
  replaces the 2026-08-07 pattern above. Capitalization and reprint-labelling
  conventions were added to SeriesName, SubTitle, CoverDescription, and Printing.
  Guidance only — no accepted value changes.
- **`FullTitle` number format.** Periodicals put a "#" before the SeriesNumber.
  Collected editions use the plain number, with no "#" and no leading zero.
- **Field counts** in the Implementation Guide and white paper now reflect the
  current 125 fields, 23 always required and 14 conditionally required.

### Added
- **Field notes template** (Data Wish List G-001). Every field's notes will answer
  the same five questions: what goes in it, format, when empty, examples, and common
  mistakes. Written up in `standard/fields/README.md`. `IssueSort` is the first field
  in the new format.
- **[Data Wish List](proposals/WISHLIST.md)** — motivation-focused intake for
  raised-but-not-yet-taken-up needs, seeded from the April and 2026-07-09 quarterly
  meetings. Stage 1 of the proposed field adoption pipeline.
- **[CCP-0004](proposals/CCP-0004-field-adoption-pipeline.md)** — proposes the
  five-stage field adoption pipeline (Wish List → Proposed → Candidate → Published →
  Adoption timeline), direction for which was agreed at the 2026-07-09 meeting.

### Changed
- **Contributing** now offers two ways in: contact the COMET team, or open an issue.
  The Standards Committee handles the technical implementation.
- **Versioning policy.** Major versions are no longer annual; a major release happens
  only when a deprecated field is removed. Field `position` is not part of the data
  contract (Open Question Q-001): positions are frozen through 1.x and may change
  freely from 2.0.0.
- **Q-002 answered in part.** CSV stays the primary format, and JSON may be offered
  as an additional one.
- **Change Proposals** are kept permanently and grouped as Open, Accepted, Adopted,
  or Closed.
- **Docs site** keeps multi-line field notes on separate lines.
- Retired the DNS custom-domain runbook now that docs.cometstandard.com is live.
- CCP-0001 and CCP-0002 marked **Accepted**; both were merged and released but their
  files still read "Draft."

## [1.1.11] — 2026-07-06

### Changed
- **CCP-0001:** `CatalogMonth` type corrected from `Date` to `YearMonth` to match
  its actual `YYYY-MM` value format. Corrective clarification — no accepted value
  changes and no existing file is affected.

## [1.1.10] — 2025-06-09

- Adopted the 15 fields proposed in November 2024 and merged them into the overall data structure: `VariantType`, `SalesStatusCode`, `SalesTerritory`, `MaxOrderQuantity`, `CoverColor`, `Translator`, `CreatorBio`, `Reviews`, `ComparableTitles`, `NETPriceCA`, `NETPricedCA`, `NETPriceUK`, `NETPricedUK`, `DistributorPublisherCode`, `TitleFamilyID`.
- **Proposed (not yet adopted):** additional fields under discussion — carried forward as open change proposals.

## [1.1.10] — 2024-11-29

- Added 15 new fields (listed above) for adoption.

## [1.0.10] — 2024-09-05

- Clarifications added to: `VariantRatio`, `OrderRequirementCodes`, `OrderExceptionCodes`, `ExceedPercentage`, `WriterISNI`, `ArtistISNI`, `CoverArtistISNI`, `ColoristISNI`, `InkerISNI`, `EditorISNI`, `LettererISNI`.

## [1.0.0] — 2024-09-03

- Adopted the changelog and release-numbering convention: any update of a field value results in a patch (third-number) release; any change to a required field or field type results in a minor (second-number) release; annual updates result in a full (first-number) release.

## [1.0.0] — 2024-01-10

- Initial launch of the COMET Standard.

---

*Migrated to this repository at version 1.1.10. Prior entries preserved from the original changelog; dates and version numbers reflect the historical record and are not all strictly sequential.*
