# G2 — Stable Tools, Schemas, and Handlers

## Status

`observation_in_progress`

G1 verified the local MCP transport. G2 now asks whether the tools exposed through that transport are stable, legible, schema-complete, and backed by real handlers.

## Goal

Verify each MCP tool as a real user-facing contract rather than a decorative tool list.

## Required contract per tool

Each tool must have:

- a stable action-oriented tool ID,
- a human-readable title or equivalent metadata,
- a description that states when the tool should be used,
- an explicit input schema,
- an output schema when structured output is returned,
- a real handler that performs only the described behavior,
- representative positive and invalid-input evidence,
- annotations consistent with actual side effects (verified in G4).

## Initially observed tool IDs

The runtime observation after G1 reported seven read-oriented tools:

```yaml
tools_observed:
  - ping
  - get_overview
  - list_quantum_sessions
  - list_collapse_history
  - get_shogi_game
  - list_agent_loop_sessions
  - list_mint_events
```

The presence of a tool ID is **not** sufficient to mark G2 verified.

## Acceptance evidence

For every advertised tool, verify:

1. Name/ID is stable and matches one recognizable user goal.
2. Description is specific enough for correct model selection.
3. Input schema rejects invalid values rather than relying on handler guesswork.
4. Structured results match an explicit output schema when an output schema is advertised/appropriate.
5. The handler returns only the promised data and does not create hidden side effects.
6. Representative success and failure calls produce predictable results.
7. Tool metadata does not claim philosophical, quantum, temporal, or trust measurements as empirical facts unless the underlying data supports that claim.

## Epistemic boundary for descriptions

Tool descriptions must preserve:

- `observed` ≠ `inferred` ≠ `imagined`
- poetic/quantum language ≠ physical evidence
- a stored project score ≠ a scientific measurement unless separately validated
- a read operation ≠ consent to mutate or publish

## Evidence record

Populate after inspection.

```yaml
observed:
  advertised_tool_count: 7
  tool_ids: verified
  descriptions: pending
  input_schemas: pending
  output_schemas: pending
  handlers: pending
  positive_calls: partial
  invalid_input_calls: pending
inferred: []
imagined: []
```

## Stop condition

If any tool lacks a defensible description/schema/handler match, keep G2 open and repair that tool before adding more tools.

## Next gate

After G2 is verified, move to G3 only if custom UI is actually needed; otherwise record G3 as `not_applicable` and proceed to G4 annotations.