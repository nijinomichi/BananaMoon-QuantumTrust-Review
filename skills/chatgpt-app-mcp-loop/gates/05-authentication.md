# G5 — Authentication Model and Public Data Boundary

## Status

`selected_development_only`

Path C was selected by the human reviewer on 2026-08-08 JST. The current shared Bearer token remains a verified fail-closed development boundary and is not promoted to the final public plugin authentication contract.

## Human decision

```yaml
decision:
  selected_path: C
  label: development_only_shared_bearer
  selected_at: "2026-08-08 JST"
  local_development_boundary: verified
  public_submission_auth: not_satisfied
  public_submission: intentionally_blocked
  reversible: true
  possible_next_path: A
```

This decision closes the human-choice pause without claiming public-auth readiness. G6 local test packaging may proceed. G7 publication and G8 submission remain blocked by design.

## Goal

Choose and implement one honest authentication model:

- anonymous access only for intentionally public, privacy-minimized read-only data, or
- OAuth 2.1 for user-specific or restricted data.

Do not present a static shared secret as user authorization.

## Current Bearer boundary

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

## Data-boundary observation

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

### A — Public no-auth, privacy-minimized

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

### C — Development-only shared Bearer — selected

Keep the existing fail-closed token for private testing and do not submit the plugin publicly.

Observed implementation retained:

- the server fails closed when `MCP_AUTH_TOKEN` is absent;
- missing and incorrect client tokens are rejected;
- the secret value is not stored in GitHub evidence;
- the shared token is treated as a development access boundary, not as user identity or OAuth.

This is a valid development state. It explicitly does not complete G5 for public submission.

## Prohibition

- Do not expose secret values in tests, logs, GitHub, or submission artifacts.
- Do not label current shared-token access as OAuth.
- Do not infer consent to publish free text from the existence of an unauthenticated REST route.
- Do not advance to G8 until one path is chosen and verified.

## Why A remains the future public recommendation

`A — Public no-auth, privacy-minimized` remains the smallest submission-aligned path if the human later chooses public distribution because:

1. the current seven MCP tools are read-only and have unauthenticated public REST equivalents;
2. anonymous public data does not require user-account authorization;
3. a shared Bearer secret is not per-user authorization and should not be presented as such;
4. OAuth 2.1 would add justified complexity only if user-specific or restricted data remains in scope;
5. removing or permanently redacting `rawInput` and future private fields can create a smaller, auditable public contract.

The recommendation is conditional, not automatic. Public reachability alone does not establish publication consent.

## Official basis

- [OpenAI authentication guidance](https://developers.openai.com/plugins/build/auth) permits read-only anonymous MCP surfaces, while authenticated servers are expected to use OAuth 2.1.
- [OpenAI connect-and-test guidance](https://developers.openai.com/plugins/deploy/connect-chatgpt) supports Developer Mode testing before public submission and separates test endpoints from submission-ready production infrastructure.

## Next action

Proceed to G6 local positive and negative test packaging under Path C. Do not publish G2/G4 changes, weaken the Bearer boundary, generate `chatgpt-app-submission.json`, or advance to G8. Switch to Path A only after an explicit human decision and a verified field-level privacy policy.
