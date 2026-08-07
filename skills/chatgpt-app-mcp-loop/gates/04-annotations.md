# G4 — Tool Annotations and Side-Effect Boundaries

## Status

`verified_local`

## Goal

Advertise safety and execution hints that match the actual handler behavior. Treat annotations as user-facing protocol metadata, not decorative labels and not a substitute for server-side authorization.

## Verified annotation contract

Every advertised tool returns the same explicit annotation set:

```yaml
annotations:
  readOnlyHint: true
  destructiveHint: false
  idempotentHint: true
  openWorldHint: false
execution:
  taskSupport: forbidden
```

Verified tool count: `7/7`.

## Handler evidence

```yaml
observed:
  tools_verified: 7
  storage_operations:
    selected_by_handlers: read_only_selects
    insert_update_delete_called: false
  external_network_calls: false
  public_system_effects: false
  response_external_state_change: false
  repeated_execution:
    runs_per_tool: 2
    structured_content_equal: true
    ping_exception: "timestamp value changes; no state mutation"
    database_row_count_before_after:
      shogi_games: "15 -> 15"
  metadata_change_scope:
    tool_names_changed: false
    schemas_changed: false
    handlers_changed: false
    auth_changed: false
    annotations_only: true
  g2_regression:
    output_schema_ajv: "7/7 passed"
    content_structured_deep_equal: "7/7 passed"
  rest_ui_regression:
    ui_root: verified_200
    major_rest_apis: "5/5 verified_200"
  production_mode_local:
    build: passed
    tools: 7
    all_four_hints_explicit: "7/7"
    output_schemas: "7/7"
    unauthenticated_request: verified_401
    html_development_markers: absent
    api: verified_200
  public_deployment_updated: false
  submission_metadata_created: false
inferred:
  - "The local annotation contract accurately describes a read-only, non-destructive, retry-safe, closed-world tool surface."
imagined: []
```

## Interpretation boundary

- `readOnlyHint: true` is supported by handler and storage-path inspection.
- `destructiveHint: false` does not authorize writes; it records that no destructive path exists.
- `idempotentHint: true` means repeated calls create no additional side effect. Result data may differ if the observed database changes, and `ping` timestamps naturally differ.
- `openWorldHint: false` reflects database reads inside the application boundary and no external network or public-system action.
- Annotations do not replace validation, authentication, authorization, or confirmation.

## Public boundary

G4 is `verified_local`. The latest explicit annotations have not been published or re-observed at the production URL. G7 remains separate and open.

## Next gate

Proceed to **G5 — authentication model and reviewer access boundary**.
