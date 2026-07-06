# COMET Standard Governance

This document defines who maintains the COMET Standard and how changes are made. It exists so that the standard can evolve openly and predictably, while remaining stable enough for the industry to rely on.

## The Standards Committee

The COMET Standard is maintained by a **Standards Committee of three members**. The Committee holds **sole merge authority**: no change enters the standard (the `main` branch) without approval from the Committee.

| Role | Name | GitHub |
|---|---|---|
| COMET Lead | Katie Pryde | N/A |
| Formats Chair | Django Bohren | @djangobohren |
| Standards Chair | Brian Garside | @briangee |

The Committee is responsible for reviewing proposals, safeguarding backward compatibility, maintaining the changelog, and cutting releases.

## Roles

- **Anyone** may open an issue or a change proposal, and may submit a pull request.
- **Contributors** are people whose proposals or PRs have been accepted.
- **The Standards Committee** reviews, decides, and merges. A change is accepted when at least two of the three members approve and none formally object.

## How a change moves through the process

```
Idea  →  Proposal (issue / CCP)  →  Discussion  →  Committee review  →  Accepted & merged  →  Released
```

1. **Proposal.** Anyone opens an issue using a template, or — for anything beyond a typo — a **COMET Change Proposal (CCP)** documenting the rationale (see `.github/CHANGE_PROPOSAL_TEMPLATE.md`).
2. **Discussion.** The community and Committee discuss on the issue/PR. Trivial fixes can skip straight to review.
3. **Review.** The Committee evaluates impact, especially on backward compatibility and required fields.
4. **Decision.** Accepted (merged), deferred, or declined with a reason.
5. **Release.** Accepted changes are versioned and recorded in `CHANGELOG.md`.

## Versioning policy

COMET uses a three-part version, `MAJOR.MINOR.PATCH`, continuing the existing history (current: **1.1.10**). The bump is determined by the *nature* of the change:

| Change | Bump | Example |
|---|---|---|
| **Breaking / annual** — removing a field, or the scheduled annual revision | **MAJOR** (`2.0.0`) | Annual release; removing a deprecated field |
| **Required or type change** — a field becomes required, or its type changes; new required field | **MINOR** (`1.2.0`) | Making a previously optional field required |
| **Value or clarification** — adding an optional field, adding a picklist value, wording clarifications | **PATCH** (`1.1.11`) | New optional field; new AgeRange value; description fix |

This formalizes the convention already recorded in the changelog: value updates bump the last number, required/type changes bump the middle number, and the annual revision bumps the first.

Every released version is a **git tag** (e.g. `v1.1.10`) with a matching `CHANGELOG.md` entry.

## Releases

- **Patch** releases can be cut as accepted changes accumulate.
- **Minor** releases are cut when required/type changes are ready and communicated.
- **Major** releases follow the annual review cycle, giving the industry a predictable window to adapt.

## Amending this document

Changes to governance follow the same proposal process and require unanimous approval of the Standards Committee.
