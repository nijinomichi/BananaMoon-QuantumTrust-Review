# MAIN_CID Investigation Report  
BananaMoon Quantum NFT – 1/1 Edition

Date: 2026-05-26  
Updated: 2026-06-10  
Repository: `BananaMoon-QuantumTrust-Review`

## Status

`verified_completed`

This report was originally created to determine whether the production `<MAIN_CID>` for BananaMoon Quantum NFT 1/1 could be found inside this repository.

Initial repository search found no local CID candidates.  
A later Notion provenance review confirmed the primary BananaMoon metadata artifact through Pinata/IPFS recovery and byte-level verification.

## Verified Primary Artifact

| Field | Value |
|---|---|
| Metadata CID | `bafkreiakqycxg6lsy7mzzycbn36mrvxzdu4iovedmiaipjaui6oogq2gxm` |
| Image CID | `bafkreibodjqc27g6ijvcylghabhq6bvwc4ocf35jkhxyugholam4izqmre` |
| Metadata file | `bananamoon_metadata.json` |
| Metadata size | `823B` |
| SHA-256 | `0a8605737972c7d99ce0416efcc8d6f91d38875483620087a414479ce34346bb` |
| Classification | `verified_primary_artifact` |
| Final state | `verified_completed` |

## Original Repository Search

Local repository files were checked for:

- `ipfs://`
- CID prefixes such as `bafy` and `Qm`
- `metadata.json`
- `metadata_template.json`
- Keywords:
  - BananaMoon
  - BananaSpace
  - QuantumTrust
  - cover
  - main-image
  - 1/1
  - official art

## Original Repository Result

No candidate IPFS CID was found in this repository at the time of the first search.

- `metadata.json` was not present.
- `metadata_template.json` was not present.
- No `ipfs://...`, `bafy...`, or `Qm...` strings were present.

This means the production CID was not stored locally in this repository at that time.

## External Provenance Verification

A later provenance review in Notion confirmed:

- BananaMoon NFT metadata was recovered from Pinata/IPFS.
- The original file was downloaded.
- Byte-level verification was performed.
- SHA-256 verification matched the expected digest.
- The verified metadata file is `bananamoon_metadata.json`.
- The verified metadata CID is:

```text
bafkreiakqycxg6lsy7mzzycbn36mrvxzdu4iovedmiaipjaui6oogq2gxm