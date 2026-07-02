# BananaMoon Provenance Record

**Audit date:** 2026-07-02  
**Scope:** BananaMoon / QuantumTrust review archive  
**Evidence mode:** non-destructive and conservative

## Purpose

This document records the artifact identifiers supplied by the project owner and separates those identifiers from assumptions, test uploads, gateway behavior, and minting claims.

It does not mint, transfer, authenticate ownership, or guarantee market value.

## Owner-supplied records

| Field | Recorded value |
|---|---|
| Metadata CID | `bafkreiakqycxg6lsy7mzzycbn36mrvxzdu4iovedmiaipjaui6oogq2gxm` |
| Image CID | `bafkreibodjqc27g6ijvcylghabhq6bvwc4ocf35jkhxyugholam4izqmre` |
| Metadata filename | `bananamoon_metadata.json` |
| SHA-256 information supplied for this audit | begins with `0a860573` |

The full SHA-256 digest was not supplied in the present task text. It is therefore not reconstructed here.

## Existing repository evidence

Earlier repository records include:

- top-level `PROVENANCE.md`
- `CID_INVESTIGATION.md`
- `IDENTITY.md`
- Notion archive references
- a full SHA-256 digest asserted in earlier documentation

Those records are preserved. Their presence proves that a claim was recorded, not by itself that the underlying bytes were independently rechecked during this audit.

## Classification

### Preserved identifier

The CIDs and filename above are canonical identifiers for the current audit record because they were explicitly supplied by the project owner.

### Pending independent verification

The following remain pending for a fresh external verification pass:

1. retrieve the metadata bytes by CID or from the recovered source file
2. calculate the complete SHA-256 digest locally
3. compare it with the previously recorded complete digest
4. inspect the metadata `image` field
5. resolve the image CID and compare the rendered image with the intended artwork
6. verify whether any current Zora or other mint references this exact metadata CID
7. distinguish production metadata from test and duplicate variants

## Evidence boundaries

Do not treat these as equivalent:

- an IPFS CID
- a gateway URL
- a successful gateway page render
- a local byte-for-byte hash match
- an NFT contract token URI
- a marketplace display
- authorship
- copyright ownership
- token ownership

Each is a different claim requiring different evidence. Software systems apparently needed eight ways to say “this points to something,” because one would have been dangerously comprehensible.

## Gateway failures

A failed public gateway request does not by itself prove that content is missing or the CID is invalid. Gateway availability, authorization, rate limits, and artifact integrity must be investigated separately.

## Safety restrictions

- never publish Pinata gateway tokens, API keys, wallet private keys, or recovery phrases
- never replace a verified identifier with a test upload without recording the change
- never label a test CID as canonical
- never claim a mint is linked to this metadata until its token URI is checked
- never infer financial value from provenance documentation

## Relationship to earlier documents

The top-level `PROVENANCE.md` remains a preserved summary from an earlier restoration phase. This file is the more conservative audit boundary dated 2026-07-02.

A later verification may promote the complete digest and mint linkage to confirmed status through a reviewed Pull Request.