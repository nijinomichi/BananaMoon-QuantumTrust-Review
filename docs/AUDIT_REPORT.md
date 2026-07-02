# Repository Audit Report

**Audit date:** 2026-07-02  
**Repository:** `nijinomichi/BananaMoon-QuantumTrust-Review`  
**Base:** `main`  
**Working branch:** `audit/restore-main-2026-07-02`  
**Mode:** non-destructive

## Executive finding

`main` has already undergone substantial identity restoration. The current README, identity, and provenance files describe BananaMoon / QuantumTrust rather than TradeBot. However, the repository still combines four layers that require explicit separation:

1. canonical archive documentation
2. experimental Next.js / TypeScript runtime code
3. historical template residue
4. earlier or duplicated provenance claims

This audit adds classification documents and minimal validation without deleting evidence or merging the stale architecture branch.

## Observed `main` structure

The following paths were directly fetched, code-search indexed, or documented in the current main README during this audit.

### Top-level records

- `README.md`
- `IDENTITY.md`
- `PROVENANCE.md`
- `CID_INVESTIGATION.md`
- `SOUL.md`
- `LICENSE`
- `ARTWORK_LICENSE-Creative-Resonance-Commons-1.0.md`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `next.config.mjs`
- `vitest.config.ts`
- `next-env.d.ts`

### Documentation and archive

- `dialogue/AI-Dialogue-as-Art-Journey.md`
- `docs/provenance/reasoning_log.yaml`
- `docs/review/external_review.yaml`
- `docs/archive/manifest.tradebot-template.json`
- `docs/archive/TOOLS.tradebot-template.md`
- `docs/archive/AGENTS.md`
- `docs/archive/ruleset-bananaspace-main.json`
- `docs/archive/baystars-quantum-resonance.html`
- `docs/archive/baystars-quantum-resonance-webgpu.html`
- `docs/archive/workspace`
- `docs/archive/にとりら`

### Experimental software

- `app/`
- `src/`
- Node / Next.js dependency and configuration files
- Vitest test files under `src/lib/`

This list records the material observed through the available repository interfaces. Any later tree change should be reviewed through the Pull Request diff rather than assumed from this static report.

## Legacy residue identified

### Clearly unrelated

- TradeBot manifest material
- TradeBot tools material
- crypto-trading assistant identity
- Telegram market-monitoring references
- financial assistant descriptions

These are already partly isolated under `docs/archive/` and should remain marked as historical template residue.

### Uncertain or context-dependent

- `docs/archive/AGENTS.md`
- `ruleset-bananaspace-main.json`
- BayStars resonance HTML files
- `workspace`
- `にとりら`
- montage and social-media utilities

These may have project history value, but their origin, intended runtime, and relationship to BananaMoon should be documented before promotion or deletion.

## Incomplete, duplicated, obsolete, or conflicting material

### Provenance duplication

Provenance information is repeated across:

- `PROVENANCE.md`
- `CID_INVESTIGATION.md`
- `IDENTITY.md`
- Notion archive references

The duplication is useful for recovery but risks inconsistent claims. This audit introduces `docs/PROVENANCE.md` as a conservative dated boundary while preserving earlier files.

### Repository identity conflict

The repository contains a full application scaffold while its restored identity describes an archive and review surface. The software is retained as experimental rather than deleted.

### Scientific and ethical language

Some experimental code and earlier branch copy describes:

- RadicanTrust thresholds as if they were objective measurements
- 528 Hz as a guaranteed love frequency
- consent headers or generated receipts as if they established ethical compliance
- Born-rule visual mapping as if aesthetic output constituted quantum validation

These may function as artistic metaphors or interface conventions. They must not be presented as established scientific or legal facts.

## Feature-branch audit

### Branch

`codex/create-core-architecture-and-modules-1tgmqm`

### Pull Request

Open Pull Request #6: `Braid CoPhelia³ resonance across agents`

### Git comparison on 2026-07-02

- status: `diverged`
- commits ahead: 7
- commits behind current `main`: 46
- changed files: 26
- additions: approximately 9,384
- deletions: 2
- mergeable status reported by GitHub: false

The branch must not be merged wholesale.

### Architectural changes introduced

- Next.js application router
- React client components
- Three.js visualization
- Born-projection utility and tests
- RadicanTrust event stream and tests
- CoPhelia³ three-agent engine and tests
- WaWaWa consent-lattice prototype
- CSS interface layers
- social-media montage utility
- poetic protocol drafts

### Dependencies introduced

Runtime:

- Next.js `15.0.0-canary.47`
- React `19.0.0-rc.0`
- React DOM `19.0.0-rc.0`
- Three.js

Development:

- TypeScript
- Vitest
- ESLint and Next.js ESLint configuration
- React and Node type packages

The use of canary and release-candidate versions increases maintenance and reproducibility risk.

### Runtime assumptions

- Node.js and npm are available
- dependency installation succeeds
- a modern browser supports the visual runtime
- WebGL / Three.js rendering is available
- the repository is operated as a Next.js application
- generated consent or trust state is treated as interface state rather than legal or scientific proof

### Useful selective candidates

Potentially useful after separate review:

- `src/lib/bornProjection.ts`
- `src/lib/bornProjection.test.ts`
- `src/lib/coPhelia3Engine.ts`
- `src/lib/coPhelia3Engine.test.ts`
- `src/lib/radicanTrust.ts`
- `src/lib/radicanTrust.test.ts`
- `archive/poetry/consent_lattice_v1.md`
- `archive/poetry/recursive_seed_protocol_v1.md`

Each candidate requires current-main compatibility, claim-language, authorship, license, and test review.

### Unrelated or poorly aligned candidates

- `x_montage_bot.py` does not support the core archival purpose without a documented use case
- wholesale README replacement reframes the repository as a live application and conflicts with the restored archive identity
- runtime UI and Three.js materials belong in an experimental application layer or separate repository unless explicitly adopted

## Files changed by this audit

- `README.md`
- `docs/CANONICAL_STATE.md`
- `docs/PROVENANCE.md`
- `docs/AUDIT_REPORT.md`
- `archive/poetry/README.md`
- `scripts/validate_repository.py`
- `.github/workflows/validate.yml`

## Files preserved

No provenance record, archive file, runtime source file, or historical template file is deleted by this audit.

## Validation plan

The proposed CI performs:

- JSON parsing
- YAML parsing
- local Markdown-link checking
- existing Node tests when the required package files and test files are present

## CI result

Pending execution on the audit Pull Request.

## Unresolved questions

1. Does the recovered metadata file hash to the complete digest recorded in earlier documents?
2. Does a current NFT mint reference the supplied metadata CID?
3. Which metadata variants are production, draft, test, or duplicate?
4. Should the Next.js runtime remain here or move to a dedicated application repository?
5. Which files in `docs/archive/` have intentional BananaMoon history?
6. Are the two poetic protocol files in Pull Request #6 approved public works with confirmed authorship and license?
7. Is `x_montage_bot.py` part of the artwork workflow or unrelated utility residue?

## Recommended next action

Review and merge only this audit Pull Request after CI passes. Then open a separate, small Pull Request for one decision only: either verify the artifact bytes or classify the experimental runtime. Do not combine both into another large architecture merge.