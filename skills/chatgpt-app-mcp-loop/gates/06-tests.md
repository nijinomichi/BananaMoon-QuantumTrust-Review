# G6 — Reproducible Positive and Negative Tests

## Status

`implementation_required`

A read-only audit on 2026-08-08 JST found that the earlier MCP checks were real but ephemeral. No repository-backed test suite currently reproduces them.

## Goal

Convert the verified one-session checks from G1, G2, G4, and the Path C authentication boundary into one deterministic, secret-safe local test command.

G6 is not satisfied by a successful manual curl, an Agent report, or a successful production build alone.

## Current observation

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
  - "No persistent test suite exists."
  - "No secret literal was found in the inspected repository or temporary outputs."
inferred:
  - "A focused local suite can likely preserve the existing verified behavior."
unverified:
  - "Whether server construction must be minimally refactored for isolated HTTP tests."
imagined: []
```

## Official basis

[OpenAI connect-and-test guidance](https://developers.openai.com/plugins/deploy/connect-chatgpt) requires representative inputs, edge cases, authentication errors, annotations, structured output checks, and reruns after metadata changes.

## Next action

Implement the minimal persistent suite in Replit, rerun it locally, and record only the resulting evidence. Keep Path C, G7, and G8 unchanged.
