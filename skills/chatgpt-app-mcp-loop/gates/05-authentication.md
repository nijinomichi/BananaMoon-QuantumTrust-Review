# G5 — Authentication Model and Public Data Boundary

## Status

`verified_local_path_a`

Path C was first verified as a development checkpoint. The human then selected Path A on 2026-08-08 JST. The saved Replit state now implements an explicitly anonymous, privacy-minimized MCP and REST read contract. Public Production has not yet been updated.

## Human decision

```yaml
decision_history:
  - path: C
    label: development_only_shared_bearer
    selected_at: "2026-08-08 JST"
    result: "G6 verified locally; public path remained blocked"
  - path: A
    label: public_noauth_privacy_minimized
    selected_at: "2026-08-08 JST"
    status: verified_local
current_decision:
  selected_path: A
  public_submission_auth: noauth_verified_local
  privacy_minimization: verified_local
  publish_before_privacy_verification: prohibited
  reversible_before_publish: true
```

Path C is preserved as the verified development checkpoint rather than erased. Path A is now the active human decision. This transition authorizes implementation of an explicitly anonymous, privacy-minimized public MCP contract; it does not authorize publishing unreviewed fields.

## Goal

Choose and implement one honest authentication model:

- anonymous access only for intentionally public, privacy-minimized read-only data, or
- OAuth 2.1 for user-specific or restricted data.

Do not present a static shared secret as user authorization.

## Historical Path C Bearer boundary

```yaml
observed:
  route_scope: "POST /mcp as a whole"
  tool_level_authorization: absent
  token_model: single_shared_bearer
  missing_server_token:
    behavior: fail_closed
    result: "HTTP 503 / JSON-RPC -32002"
  missing_or_wrong_client_token:
    result: "HTTP 401 / JSON-RPC -32001"
  comparison:
    implementation: timing_safe_equal
    timing_resistance_measured: false
  www_authenticate_header: absent
  json_rpc_auth_meta: absent
```

## Path A local verification

The exact public allowlist is recorded in [public-field-policy.md](../policies/public-field-policy.md).

```yaml
observed:
  test_command: "npm test"
  tests:
    files: 3
    total: 50
    passed: 50
    failed: 0
    duration_seconds: 6.6
  security_schemes:
    expected: noauth
    advertised: "7/7"
  anonymous_protocol:
    initialize: passed
    tools_list: passed
    tool_calls: "7/7 passed"
  authorization_header:
    absent: passed
    arbitrary_value: passed
    bearer_value: passed
    result_shape_deep_equal: true
    privilege_escalation: false
  privacy_negative:
    seeded_private_data_types: 4
    mcp_marker_absence: passed
    rest_marker_absence: passed
    prohibited_key_absence: passed
    fixture_cleanup: passed
  projections:
    mcp_exact_allowlist: "7/7 passed"
    rest_exact_allowlist: "4/4 passed"
    unknown_fields_default_dropped: passed
  removed_from_public_output:
    - rawInput
    - sessionKey
    - sessionName
    - dataPoints
    - nftMetadata
    - creators
    - referrer
    - derived_layers
    - decomposition
  old_bearer_boundary:
    source_absent: passed
    production_bundle_absent: passed
    documentation_absent: passed
    former_401_503_errors_absent: passed
  production_build: passed
  database_mutation: false
  publish_performed: false
  public_production_verified: false
```

This satisfies G5 locally. It does not satisfy G7 until the latest build is intentionally published and the public endpoint is re-observed.

## OAuth readiness observation

```yaml
observed:
  protected_resource_metadata: absent
  authorization_server_metadata: absent
  oidc_discovery: absent
  tool_security_schemes: absent
  scopes: absent
  audience_or_resource_validation: absent
  well_known_routes:
    current_response: spa_html_fallback
    valid_oauth_metadata: false
```

The SPA fallback returning HTTP 200 at a well-known path does not count as OAuth discovery.

## Initial data-boundary observation

All seven tools are read-only. Equivalent data is currently reachable from unauthenticated REST routes.

```yaml
tools:
  ping:
    public_equivalent: true
    sensitive_fields_observed: false
  get_overview:
    public_equivalent: true
    sensitive_fields_observed: false
  list_quantum_sessions:
    public_equivalent: true
    current_rows: 0
    future_content_risk: "session names or scores require an explicit publication policy"
  list_collapse_history:
    public_equivalent: true
    sensitive_fields_observed: false
  get_shogi_game:
    public_equivalent: true
    sensitive_fields_observed: false
  list_agent_loop_sessions:
    public_equivalent: true
    current_rows: 0
    risk: "rawInput is free text and can contain personal or confidential information"
  list_mint_events:
    public_equivalent: true
    note: "referrer is an on-chain public address but still deserves data-minimization review"
write_actions: false
```

Existing unauthenticated REST exposure is evidence of current reachability, not proof of informed public intent.

## Decision paths

### A — Public no-auth, privacy-minimized — selected

Use this when the plugin is intended to expose public project data.

Required before verification:

1. Declare `noauth` truthfully for each public tool.
2. Remove the shared Bearer requirement from the public MCP path.
3. Exclude or permanently redact free-text `rawInput` and any future user-supplied private fields from the public tool contract.
4. Define a field-level publication policy for quantum and agent-loop sessions.
5. Re-run schemas, privacy-negative tests, and public endpoint tests.

### B — OAuth 2.1 restricted access

Use this when session or agent-loop data is user-specific or restricted.

Required before verification:

1. Protect relevant MCP and REST data consistently.
2. Publish protected-resource and authorization-server discovery metadata.
3. Declare per-tool OAuth security schemes and scopes.
4. Validate signature, issuer, audience/resource, expiry, and scopes on every request.
5. Return the required authentication challenge and tool-level auth metadata.
6. Test linking, denial, scope boundaries, revocation, and reviewer access without fabricating credentials.

### C — Development-only shared Bearer — previous checkpoint

Keep the existing fail-closed token for private testing and do not submit the plugin publicly.

Historical evidence retained:

- the server previously failed closed when `MCP_AUTH_TOKEN` was absent;
- missing and incorrect client tokens were rejected;
- no secret value was stored in GitHub evidence;
- the shared token was treated as a development boundary, never as user identity or OAuth.

The active Path A implementation no longer contains or enforces that route-wide Bearer boundary.

## Prohibition

- Do not expose secret values in tests, logs, GitHub, or submission artifacts.
- Do not relabel the historical shared-token checkpoint as OAuth.
- Do not infer consent to publish free text from the existence of an unauthenticated REST route.
- Do not advance to G8 until one path is chosen and verified.

## Why A was selected

`A — Public no-auth, privacy-minimized` was selected as the smallest submission-aligned path because:

1. the current seven MCP tools are read-only and have unauthenticated public REST equivalents;
2. anonymous public data does not require user-account authorization;
3. a shared Bearer secret is not per-user authorization and should not be presented as such;
4. OAuth 2.1 would add justified complexity only if user-specific or restricted data remains in scope;
5. removing or permanently redacting `rawInput` and future private fields can create a smaller, auditable public contract.

The selection and local implementation are now verified against the field-level allowlist. Public reachability still does not establish consent to publish any field outside that allowlist.

## Official basis

- [OpenAI authentication guidance](https://developers.openai.com/plugins/build/auth) permits read-only anonymous MCP surfaces, while authenticated servers are expected to use OAuth 2.1.
- [OpenAI connect-and-test guidance](https://developers.openai.com/plugins/deploy/connect-chatgpt) supports Developer Mode testing before public submission and separates test endpoints from submission-ready production infrastructure.

## Next action

Keep G5 at `verified_local_path_a` while the existing non-MCP mutation endpoints undergo a separate pre-publication authorization audit. Do not Publish until withdrawal, Pinata upload, IPFS-hash update, and mutation-response boundaries are verified safe. After that hardening, publish intentionally and re-run the no-auth and privacy matrix against public Production under G7. Do not generate `chatgpt-app-submission.json` or advance to G8 until G7 is independently verified.
