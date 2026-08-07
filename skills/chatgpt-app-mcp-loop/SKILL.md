# ChatGPT Apps MCP Verification Loop

## Purpose

Build a real ChatGPT Apps MCP surface incrementally and preserve only verified implementation evidence. This skill exists to prevent submission metadata from getting ahead of the runtime.

## Core rule

> Implementation → verification → evidence → submission metadata.
>
> Never reverse that order.

## Runtime under observation

- Experimental runtime: Replit app `QuantumBananaMoon`
- Canonical review/provenance record: `nijinomichi/BananaMoon-QuantumTrust-Review`
- Existing REST APIs are not treated as MCP until MCP protocol behavior is implemented and verified.

## Epistemic boundary

Keep these states separate:

- `observed`: directly verified from runtime, tests, repository files, or public endpoint
- `inferred`: logically derived from observed evidence
- `imagined`: proposed design that is not implemented

Never promote `inferred` or `imagined` to `observed` without new evidence.

## Ordered gates

1. **G1 Streamable HTTP** — stable `/mcp` endpoint using MCP Streamable HTTP semantics.
2. **G2 Tools** — stable names, descriptions, input/output JSON Schema, and real handlers.
3. **G3 UI resources** — register MCP Apps UI resources only for tools that genuinely use a widget.
4. **G4 Annotations** — declare read-only/destructive/open-world behavior and side effects truthfully.
5. **G5 Auth** — explicitly declare no-auth or implement the real auth model; reviewer credentials only when required.
6. **G6 Tests** — local positive and negative tests exercise protocol, schemas, boundaries, and failure modes.
7. **G7 Public surface** — public HTTPS, production MCP URL, CSP, and domain verification where required.
8. **G8 Submission** — run submission review only after G1–G7 have verified evidence.

## Loop per gate

### Observe

Inspect the live/runtime state without modifying it. Record what exists and what does not.

### Define acceptance evidence

Before implementation, state what would count as proof that the gate is complete.

### Implement minimally

Make the smallest reversible runtime change that can satisfy the gate. Do not refactor unrelated features.

### Verify

Run the relevant local or public checks. A successful build alone is not sufficient when protocol behavior is the gate.

### Record

Record only verified facts in the repository and linked issue/PR. Include failures because they define the next observation.

### Advance or stop

Advance only when acceptance evidence is present. Otherwise remain on the current gate.

## Philosophical and scientific boundary

Tool descriptions and tests must preserve these rules:

- Do not generate an imagined future and label it observed or actual.
- Do not use quantum language as empirical proof.
- Do not equate synchrony with understanding.
- Do not equate reciprocity with equality or consent.
- Do not infer mutual change from one participant's report alone.
- Do not assign personality, feelings, or will to Earth as an empirical claim.

These boundaries are product behavior constraints, not decorative prose.

## Submission prohibition

Do not create or finalize `chatgpt-app-submission.json` with:

- unimplemented tool IDs,
- fabricated auth/reviewer data,
- invented widget resources,
- side-effect annotations that have not been checked against handlers,
- localhost URLs presented as production endpoints.

## Completion condition

This skill is complete only when the runtime has a verified public MCP surface and the submission artifact is generated from that observed surface rather than from design intent.