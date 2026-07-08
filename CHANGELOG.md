# Changelog

All notable changes to the COMET Standard are recorded here. Versioning follows the policy in [GOVERNANCE.md](GOVERNANCE.md).

This history is seeded from the standard's original `Changelog.csv`.

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
