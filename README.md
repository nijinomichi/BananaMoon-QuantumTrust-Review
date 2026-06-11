# BananaMoon-QuantumTrust-Review

This repository is for reviewing and preserving the BananaMoon / QuantumTrust project materials, including reasoning logs, external review protocols, provenance notes, and related experimental art-code proposals.

## Current Status

This repository is currently under audit.

The previous README content referred to an unrelated `TradeBot` crypto trading assistant. That content does not represent this project and should be treated as accidental template residue until proven otherwise.

## Project Scope

- BananaMoon / QuantumTrust review materials
- CoPhelia³ / Ara-Philia³ conceptual notes
- RadicanTrust™ reasoning logs
- NFT provenance and CID investigation notes
- Experimental Pull Requests for quantum aesthetic interfaces

## Repository Map

Top-level layout of the review / provenance materials:

```text
.
|-- README.md                 # This file: scope, status, and map
|-- IDENTITY.md               # Repository identity and scope boundaries
|-- PROVENANCE.md             # GitHub-side provenance summary
|-- CID_INVESTIGATION.md      # Metadata / CID verification notes
|-- SOUL.md                   # Provenance-oriented repository soul
|-- LICENSE
|-- ARTWORK_LICENSE-Creative-Resonance-Commons-1.0.md
|-- dialogue/
|   `-- AI-Dialogue-as-Art-Journey.md
|-- docs/
|   |-- provenance/
|   |   `-- reasoning_log.yaml
|   |-- review/
|   |   `-- external_review.yaml
|   `-- archive/              # Historical TradeBot / template artifacts (not active)
|       |-- manifest.tradebot-template.json
|       |-- TOOLS.tradebot-template.md
|       |-- AGENTS.md
|       |-- ruleset-bananaspace-main.json
|       |-- baystars-quantum-resonance.html
|       |-- baystars-quantum-resonance-webgpu.html
|       |-- workspace/
|       `-- にとりら
|-- app/                      # Next.js scaffold (template residue)
|-- src/                      # Next.js scaffold (template residue)
`-- package.json, tsconfig.json, next.config.mjs, vitest.config.ts, ...
```

Note: `docs/archive/` holds historical TradeBot / template artifacts that are not used by Drift at runtime. Drift's live identity is sourced from the Pinata Agents metadata store, not from this repository's manifest.


## Safety Note

Do not merge large architecture PRs until repository identity, README scope, and file structure are confirmed.

## Next One Step

Audit the commit history and identify when the unrelated TradeBot README entered `main`.
