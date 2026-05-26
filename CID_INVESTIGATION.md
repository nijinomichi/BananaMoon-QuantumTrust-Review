# MAIN_CID Investigation Report (BananaMoon Quantum NFT – 1/1 Edition)

Date: 2026-05-26 (UTC)
Repository: `BananaMoon-QuantumTrust-Review`

## Scope searched
- Local repository files for:
  - `ipfs://`
  - CID prefixes (`bafy`, `Qm`)
  - `metadata.json` / `metadata_template.json`
  - Keywords: BananaMoon, BananaSpace, QuantumTrust, cover, main-image, 1/1, official art

## Result
No candidate IPFS CID was found in this repository.

- `metadata.json` is not present.
- `metadata_template.json` is not present.
- No `ipfs://...`, `bafy...`, or `Qm...` strings are present.

## What is still needed to determine `<MAIN_CID>`
To correctly identify the production `<MAIN_CID>`, the following external sources must be checked with account access:

1. Pinata pin/upload history (search labels and filenames).
2. Personal notes/social sources (GitHub private notes, Notion, Replit, X posts).
3. Dedicated gateway validation for each candidate CID:
   - `https://<your-dedicated-gateway>/ipfs/<CID>`
   - verify the rendered asset is the final 1/1 cover artwork, not a layer/sub-asset.

## Recommended next step
Provide at least one of the following so final CID can be confirmed:
- A list of candidate CIDs from Pinata export/history.
- The dedicated gateway domain.
- The `metadata.json` file from the minting repo that currently contains `"image": "ipfs://<MAIN_CID>"`.
