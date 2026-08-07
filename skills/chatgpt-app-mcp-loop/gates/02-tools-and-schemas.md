# G2 — Stable Tools, Schemas, and Handlers

## Status

`verified_local`

G1 verified the local MCP transport. G2 then tested whether every advertised tool is stable, legible, schema-complete, and backed by a real read-only handler.

The first G2 observation found sound names, descriptions, input validation, and handlers, but no declared `outputSchema` or `structuredContent`. A minimal Replit pass added those output contracts without renaming or adding tools.

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
- annotations consistent with actual side effects (verified independently in G4).

## Verified tool IDs

```yaml
tools_verified:
  - ping
  - get_overview
  - list_quantum_sessions
  - list_collapse_history
  - get_shogi_game
  - list_agent_loop_sessions
  - list_mint_events
```

## Acceptance evidence

For every advertised tool, verify:

1. Name/ID is stable and matches one recognizable user goal.
2. Description is specific enough for correct model selection.
3. Input schema rejects invalid values rather than relying on handler guesswork.
4. Structured results match an explicit output schema.
5. The handler returns only the promised data and does not create hidden side effects.
6. Representative success and failure calls produce predictable results.
7. Tool metadata does not claim philosophical, quantum, temporal, or trust measurements as empirical facts unless the underlying data supports that claim.

## Observed evidence

```yaml
observed:
  advertised_tool_count: 7
  tool_ids: verified
  titles: verified
  descriptions: verified
  input_schemas: verified
  output_schemas:
    advertised: "7/7"
    sdk_validation: passed
    ajv_validation: "7/7 passed"
  handlers:
    present: "7/7"
    behavior: read_only
    hidden_writes_or_external_calls: not_observed
  structured_results:
    structured_content_returned: "7/7"
    content_text_deep_equal: "7/7 passed"
  positive_calls: "7/7 passed"
  invalid_input:
    parameterized_tools: passed
    examples:
      - "get_overview limit=11 -> -32602"
      - "list_quantum_sessions limit=0 -> -32602"
      - "list_collapse_history invalid status -> -32602"
      - "get_shogi_game missing/empty gameId -> -32602"
      - "list_agent_loop_sessions non-integer limit -> -32602"
      - "list_mint_events limit=999 -> -32602"
  missing_record:
    get_shogi_game_unknown_id: "isError=true / Game not found"
    unknown_tool: "JSON-RPC -32602"
  regression:
    local_ui: verified_200
    major_rest_apis: "5/5 verified_200"
  production_mode_local:
    build: passed
    initialize: verified_200
    tools_with_output_schema: "7/7"
    unauthenticated_request: verified_401
    html_development_markers: absent
    api: verified_200
  submission_metadata_created: false
inferred:
  - "The local G2 tool contract is ready for the G3 applicability and G4 annotation decisions."
imagined: []
```

## Epistemic boundary for descriptions

Tool descriptions retain:

- `observed` ≠ `inferred` ≠ `imagined`
- poetic/quantum language ≠ physical evidence
- a stored project score ≠ a scientific measurement unless separately validated
- a read operation ≠ consent to mutate or publish

## Remaining public boundary

This status is `verified_local`, not verified public production. The latest output-schema and structured-result changes have not been published or exercised at the production URL. The public root-page instability remains a separate G7 issue.

## Next gate

G3 should be recorded as `not_applicable` if no custom UI resource is actually required. Then proceed to G4 annotations. G5 authentication and G7 public deployment remain open and must not be inferred from this local G2 result.
