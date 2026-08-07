# G6 — Reproducible Positive and Negative Tests

## Status

`verified_local_path_a`

An initial audit found that earlier MCP checks were real but ephemeral. Path C first produced a persistent 43-test checkpoint. After the human switched to Path A, the saved suite was updated with anonymous-auth and seeded privacy-negative coverage and rerun successfully with 50 tests.

## Goal

Keep G1, G2, G4, the selected authentication model, and the public field policy reproducible through one deterministic, secret-safe local test command.

G6 is not satisfied by a successful manual curl, an Agent report, or a successful production build alone.

## Path A verified result

```yaml
observed:
  command: "npm test"
  persisted_test_files: 3
  tests:
    total: 50
    passed: 50
    failed: 0
    duration_seconds: 6.6
  noauth:
    tool_descriptors: "7/7 passed"
    anonymous_initialize: passed
    anonymous_tools_list: passed
    anonymous_tool_calls: "7/7 passed"
    authorization_header_shape_invariance: passed
  privacy_negative:
    seeded_data_types: 4
    marker_absence_mcp: passed
    marker_absence_rest: passed
    prohibited_keys_absent: passed
    exact_mcp_allowlists: "7/7 passed"
    exact_rest_allowlists: "4/4 passed"
    fixture_cleanup: passed
  prohibited_fields_checked:
    - rawInput
    - sessionKey
    - sessionName
    - dataPoints
    - nftMetadata
    - creators
    - referrer
    - layer1
    - layer2
    - layer3
    - decomposition
  protocol_and_contract_regression:
    input_output_schemas: passed
    structured_content: passed
    model_readable_content: passed
    annotations: passed
    invalid_inputs: passed
    unknown_tool: passed
    not_found: passed
    repeated_calls: passed
  regression:
    rest_json_endpoints: "4/4 passed"
    isolated_root_ui_http_200: passed
    running_development_ui_http_200: observed
    database_rows_unchanged: passed
  production_build:
    passed: true
    development_markers_absent: true
    former_bearer_code_absent: true
  publish_performed: false
  public_production_verified: false
```

## Path A acceptance evidence

G6 is verified locally for Path A because the saved suite demonstrates:

1. explicit per-tool no-auth metadata;
2. anonymous protocol and tool execution;
3. identical public result shapes regardless of an Authorization header;
4. exact output schemas and allowlists;
5. seeded private markers and prohibited keys absent from MCP and REST output;
6. fixture cleanup and database-row invariance;
7. the existing protocol, handler, error, annotation, REST, and UI regressions;
8. a clean local production build with the former route-wide Bearer code absent.

## Path C baseline result

```yaml
observed:
  command: "npm test"
  persisted_test_files: 3
  tests:
    total: 43
    passed: 43
    failed: 0
    duration_seconds: 6.5
  acceptance_matrix:
    covered: 27
    partial: 0
    not_covered: 0
  protocol:
    initialize: passed
    correct_bearer: passed
    missing_bearer: passed
    wrong_bearer: passed
    server_token_absent_fail_closed: passed
    malformed_json: passed
    unknown_method: passed
    unsupported_get: passed
    unsupported_delete: passed
  tools:
    advertised_count: 7
    ids_titles_descriptions: passed
    input_output_schemas: passed
    annotations: passed
    positive_calls: passed
    tool_specific_invalid_inputs: passed
    unknown_tool: passed
    not_found: passed
    structured_content_against_output_schema: passed
    model_readable_content_consistency: passed
  idempotency:
    all_tools_repeated_twice: passed
    fixture_cleanup: passed
    shogi_games_before_after: "15 -> 15"
  regression:
    rest_json_endpoints: "4/4 passed"
    isolated_root_ui_http_200: passed
    running_development_ui_http_200: observed
  production_build:
    passed: true
    development_markers_absent: true
    fail_closed_boundary_present: true
  secret_safety:
    real_secret_read: false
    synthetic_token_only: true
    automated_echo_log_source_guards: "3/3 passed"
  documentation:
    fail_closed_statement_present: true
    stale_unset_open_statement_absent: true
  publish_performed: false
  public_production_verified: false
```

## Initial observation

```yaml
observed:
  package_scripts:
    dev: present
    build: present
    start: present
    check: present
    db_push: present
    test: absent
  test_framework_dependencies: absent
  repository_test_files: 0
  repository_test_scripts: 0
  ci_configuration: absent
  persisted_mcp_coverage: "0%"
  prior_mcp_checks:
    executed: true
    form: ephemeral_session_commands
    reproducible_from_repository: false
  secret_scan:
    mcp_auth_token_literal_found: false
    authorization_header_saved_in_tmp_outputs: false
  documentation_drift:
    location: replit.md
    stale_claim: "unset token opens access"
    actual_behavior: fail_closed
  type_check:
    command: "npm run check"
    current_result: failed
    pre_existing_client_errors_observed: 17
```

The absence of a persistent suite does not retroactively invalidate the observed local results in G1, G2, or G4. It means those observations cannot yet satisfy the independent reproducibility requirement of G6.

## Original Path C acceptance evidence

G6 may become `verified_local` only when all of the following are present and rerun successfully:

1. A single documented, non-interactive local command runs the MCP test suite and exits nonzero on failure.
2. Tests run against an isolated local test process and do not mutate production data.
3. Authentication tests use a synthetic process-local token; no real secret is embedded, printed, snapshotted, or committed.
4. The suite verifies:
   - Streamable HTTP `initialize`;
   - correct, missing, and incorrect Bearer behavior;
   - fail-closed behavior when the server token is absent;
   - malformed JSON, unknown method, and unsupported GET/DELETE;
   - all seven tool IDs, titles, descriptions, input schemas, output schemas, and annotations;
   - representative positive calls for all seven tools;
   - tool-specific invalid inputs, unknown tool, and not-found behavior;
   - `structuredContent` against each `outputSchema`;
   - model-readable content against the structured result;
   - read-only, non-destructive, idempotent, closed-world annotations;
   - repeated calls without database row-count mutation;
   - existing REST and root UI regression;
   - a local production build.
5. The stale authentication statement in `replit.md` is corrected to match fail-closed behavior.
6. The complete command is rerun from the persisted repository state and its result is recorded without secret values.
7. No Publish action or public endpoint claim is used to satisfy this local gate.

## Original minimal implementation boundary

- Add the smallest fitting test runner and HTTP test dependency.
- Prefer one focused MCP contract suite over a broad test architecture.
- Refactor server construction only if required to create an isolated test instance.
- Do not rename tools, change schemas, weaken authentication, alter public data exposure, add UI, or publish.
- Do not fix unrelated client type errors merely to make G6 appear green; record them separately if they do not block the focused suite or production build.
- Do not add GitHub Actions as a substitute for first making the local command deterministic.

## Epistemic boundary

```yaml
observed:
  - "A persistent local suite exists and reruns through one command."
  - "50 of 50 Path A tests passed from the saved state."
  - "All seven tools advertise no-auth and execute anonymously."
  - "Seeded private markers and prohibited fields remain absent from MCP and REST output."
  - "Authorization headers do not change the public result shape."
  - "The focused implementation preserved protocol, tool, annotation, REST, UI, and database invariants under local tests."
inferred:
  - "The local Path A contracts are reproducible enough to satisfy G6."
unverified:
  - "Public Production behavior after the latest changes."
  - "End-to-end connection from ChatGPT Developer Mode."
  - "Safety of existing non-MCP mutation endpoints before republication."
imagined: []
```

## Official basis

[OpenAI connect-and-test guidance](https://developers.openai.com/plugins/deploy/connect-chatgpt) requires representative inputs, edge cases, authentication errors, annotations, structured output checks, and reruns after metadata changes.

## Known open issues

- The public Production URL still serves the older deployment.
- Existing non-MCP mutation endpoints require a separate authorization and response-minimization audit before republication.
- The public root-page instability remains a G7 concern.
- ChatGPT Developer Mode end-to-end connection remains unverified.
- Seventeen pre-existing client type errors remain outside this focused G6 suite and were not increased by Path A.

## Next action

G6 is complete at the local Path A reproducibility layer. Do not Publish until the separate mutation-endpoint hardening is verified. Then rerun the same no-auth, privacy, protocol, REST, UI, and build checks against public Production under G7. Do not create or run the G8 submission artifact before G7 is independently verified.
