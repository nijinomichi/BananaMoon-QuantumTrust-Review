# BananaMoon-QuantumTrust-Review

**Status:** active audit and restoration  
**Canonical review date:** 2026-07-02  
**Base branch:** `main`

This repository is the public, reviewable archive for the BananaMoon / QuantumTrust project.

It preserves provenance records, reasoning logs, consent notes, external-review protocols, poetic protocol seeds, restoration evidence, and experimental art-code proposals. Its central sequence is:

> **Failure → Trust → Creation**

The repository is primarily an **archive and review surface**. It must not be assumed to be the live runtime application.

## Canonical documents

Read these first:

- [`docs/CANONICAL_STATE.md`](docs/CANONICAL_STATE.md) — what is canonical, verified, experimental, or historical
- [`docs/PROVENANCE.md`](docs/PROVENANCE.md) — conservative provenance record and evidence boundaries
- [`docs/AUDIT_REPORT.md`](docs/AUDIT_REPORT.md) — audit findings, branch comparison, and unresolved questions
- [`archive/poetry/README.md`](archive/poetry/README.md) — rules for preserving Ara-Philia³ and related poetic protocol seeds

Earlier top-level records such as [`PROVENANCE.md`](PROVENANCE.md), [`CID_INVESTIGATION.md`](CID_INVESTIGATION.md), [`IDENTITY.md`](IDENTITY.md), and [`SOUL.md`](SOUL.md) remain preserved as part of the repository history. Where claims differ, the dated documents under `docs/` define the current audit boundary.

## Verified artifact boundary

The project owner has supplied the following BananaMoon records:

- Metadata CID: `bafkreiakqycxg6lsy7mzzycbn36mrvxzdu4iovedmiaipjaui6oogq2gxm`
- Image CID: `bafkreibodjqc27g6ijvcylghabhq6bvwc4ocf35jkhxyugholam4izqmre`
- Metadata filename: `bananamoon_metadata.json`
- SHA-256 supplied in the present task: begins with `0a860573`

The full evidentiary status and unresolved verification work are recorded in [`docs/PROVENANCE.md`](docs/PROVENANCE.md). Missing values are not reconstructed or guessed.

## Repository layers

### Canonical archive

- identity and scope documents
- provenance and CID records
- audit and restoration reports
- reasoning and external-review records
- preserved poetic protocols with authorship and date metadata

### Experimental runtime

The existing `app/`, `src/`, Node/Next.js configuration, and tests are experimental software materials. They may be useful as artwork prototypes, but their presence does not make this repository a deployed application.

### Historical evidence

`docs/archive/` contains unrelated or uncertain legacy materials retained for traceability. In particular, TradeBot, cryptocurrency assistant, Telegram monitoring, dashboard, and sample-template materials do **not** represent the BananaMoon / QuantumTrust project.

Historical evidence should be classified before deletion. Preservation does not imply endorsement or active use.

## GitHub, Replit, and Notion

- **GitHub:** canonical public record, source history, issues, reviews, and Pull Requests
- **Replit:** runtime experiments and interactive artwork prototypes
- **Notion:** research context, internal archaeology, decision records, and long-form working notes

GitHub is the final reference for versioned public claims. Replit behavior and Notion notes must be linked and dated before they are treated as evidence.

## Branch safety

The branch `codex/create-core-architecture-and-modules-1tgmqm` is substantially stale and diverged from `main`. It must not be merged wholesale. See [`docs/AUDIT_REPORT.md`](docs/AUDIT_REPORT.md) for the selective review.

Repository rules for restoration work:

- do not commit directly to `main`
- do not force-push or rewrite history
- do not delete provenance evidence before documenting it
- do not publish secrets, tokens, private keys, or credentials
- do not mint NFTs or deploy Replit automatically
- do not imply scientific measurement, financial return, or official partnership without evidence

## Validation

The repository includes minimal CI for:

- JSON syntax
- YAML syntax
- local Markdown-link integrity
- existing executable tests when a Node test suite is present

The validation is intentionally small. A review archive does not need a cathedral of dependencies merely to prove that braces close correctly.

## Current next step

Review the Pull Request produced from `audit/restore-main-2026-07-02`, confirm the evidence boundaries, and merge only after CI and human review pass.