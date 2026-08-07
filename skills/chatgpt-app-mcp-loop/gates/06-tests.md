# G6 — Reproducible Positive and Negative Tests

## Status

`verified_local`

An initial read-only audit on 2026-08-08 JST found that the earlier MCP checks were real but ephemeral. A minimal persistent suite was then implemented in Replit and rerun from the saved repository state. All G6 acceptance categories now have local reproducible evidence.

## Goal

Convert the verified one-session checks from G1, G2, G4, and the Path C authentication boundary into one deterministic, secret-safe local test command.

G6 is not satisfied by a successful manual curl, an Agent report, or a successful production build alone.

## Verified result

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

## Acceptance evidence

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

## Minimal implementation boundary

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
  - "43 of 43 tests passed from the saved state."
  - "The suite uses a synthetic token and automated leak guards without reading the real secret."
  - "The focused implementation preserved the existing tool, schema, auth, REST, and UI behavior under local regression tests."
inferred:
  - "The local contracts are reproducible enough to satisfy G6."
unverified:
  - "Public Production behavior after the latest changes."
  - "End-to-end connection from ChatGPT Developer Mode."
  - "Measured timing-attack resistance."
imagined: []
```

## Official basis

[OpenAI connect-and-test guidance](https://developers.openai.com/plugins/deploy/connect-chatgpt) requires representative inputs, edge cases, authentication errors, annotations, structured output checks, and reruns after metadata changes.

## Known out-of-scope issues

- The public Production URL still serves the older deployment.
- The public root-page instability remains a G7 concern.
- ChatGPT Developer Mode end-to-end connection remains unverified.
- Seventeen pre-existing client type errors remain outside this focused G6 suite.
- Timing-safe comparison is implemented, but timing-attack resistance was not empirically measured.

## Next action

G6 is complete at the local reproducibility layer. Under selected Path C, keep G7 as `deferred_by_path_c`, do not Publish, and do not create or run the G8 submission artifact. Reopen the public path only after an explicit human switch to Path A or B.
