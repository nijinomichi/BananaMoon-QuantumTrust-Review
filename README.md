# BananaMoon-QuantumTrust-Review

This repository preserves and reviews the BananaMoon / QuantumTrust project materials.

It serves as a GitHub-side provenance field: a place to hold reasoning logs, external review protocols, CID investigation notes, restoration records, and experimental art-code proposals without confusing drafts, tests, and verified artifacts.

## Current Status

This repository is currently under audit and restoration.

Earlier repository content referred to an unrelated `TradeBot` crypto trading assistant. That material does not represent the BananaMoon / QuantumTrust project and is now treated as historical template residue unless independently proven otherwise.

The current restoration principle is:

> Preserve first.  
> Classify carefully.  
> Verify before claiming.  
> Archive without erasing.

## Project Scope

This repository may contain:

- BananaMoon / QuantumTrust review materials
- CoPhelia³ / Ara-Philia³ conceptual notes
- RadicanTrust™ reasoning logs
- NFT provenance and CID investigation notes
- External review protocols
- Experimental pull requests for quantum-aesthetic interfaces
- Archived template artifacts retained for historical clarity

## Repository Map

Top-level layout of the review / provenance materials:

```text
.
|-- README.md                 # This file: scope, status, and map
|-- IDENTITY.md               # Repository identity and scope boundaries
|-- PROVENANCE.md             # GitHub-side provenance summary
|-- CID_INVESTIGATION.md      # Metadata / CID verification notes
|-- SOUL.md                   # Provenance-oriented repository soul
|-- LICENSE                   # Repository license
|-- ARTWORK_LICENSE-Creative-Resonance-Commons-1.0.md
|-- dialogue/
|   `-- AI-Dialogue-as-Art-Journey.md
|-- docs/
|   |-- provenance/
|   |   `-- reasoning_log.yaml
|   |-- review/
|   |   `-- external_review.yaml
|   `-- archive/              # Historical TradeBot / template artifacts, not active
|       |-- manifest.tradebot-template.json
|       |-- TOOLS.tradebot-template.md
|       |-- AGENTS.md
|       |-- ruleset-bananaspace-main.json
|       |-- baystars-quantum-resonance.html
|       |-- baystars-quantum-resonance-webgpu.html
|       |-- workspace              # Archived single file, not a directory
|       `-- にとりら              # Archived single file, not a directory
|-- app/                      # Experimental Next.js scaffold, pending review
|-- src/                      # Experimental TypeScript scaffold, pending review
`-- package.json, tsconfig.json, next.config.mjs, vitest.config.ts, ...
```

Note: `docs/archive/` holds historical TradeBot / template artifacts that are not used by Drift at runtime. Drift's live identity is sourced from the Pinata Agents metadata store, not from this repository's manifest.

## Verified Primary Artifact

The current verified BananaMoon metadata artifact is documented in `CID_INVESTIGATION.md` and summarized in `PROVENANCE.md`.

Canonical metadata and test upload results must remain separate.

Do not confuse:

1. Verified original metadata.
2. Current app-served NFT metadata.
3. Pinata upload test CIDs.

Generated test CIDs are communication tests only.

```yaml
testOnly: true
canonical: false
```

## Safety Note

Do not merge large architecture PRs until repository identity, README scope, file structure, and provenance boundaries are confirmed.

Do not treat archived template files as active project configuration.

Do not present poetic indices, such as RadicanTrust™, as scientific measurements, legal findings, investment signals, or financial guarantees.

Do not imply official partnerships without independent verification.

## Next One Step

Audit the commit history and identify when the unrelated TradeBot README entered `main`.

After that, review `app/`, `src/`, and `dialogue/` to decide whether they are active, experimental, or archival.
