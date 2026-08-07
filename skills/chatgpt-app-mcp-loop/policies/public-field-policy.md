# Path A — Public Field Publication Policy

## Status

`local_read_contract_verified_mutation_hardening_required`

Version: `1.0`  
Human decision: Path A selected on 2026-08-08 JST.

## Purpose

Define the complete public field allowlist before removing the shared Bearer boundary. This policy applies equally to the seven MCP tools and their unauthenticated REST equivalents.

Storage rows remain unchanged. Public serialization is minimized.

## Default rule

> A field is private unless this policy explicitly allows it.

Unknown future fields are dropped automatically. Empty tables are not evidence that a field is safe.

## Publication principles

- Public project state may be returned when it is necessary for a named tool goal.
- User-authored free text is not public by default.
- Model-derived structures that may reproduce user text are not public.
- Capability tokens, session keys, consent records, debug fields, and unnecessary internal identifiers are never public.
- Public blockchain visibility does not by itself establish consent to republish a wallet address through this interface.
- The MCP and REST surfaces must use equivalent projections so that one cannot bypass the other.
- No real secret may be read to prove that no-auth works.
- A new field requires a policy revision, schema update, privacy-negative test, and human review before publication.

## MCP allowlist

### `ping`

Allow:

- `server`
- `version`
- `time`
- `status`

### `get_overview`

Allow:

- `shogiGameCount`
- `mintEventCount`
- `recentGames[].id`
- `recentGames[].status`
- `recentGames[].createdAt`

The game ID is retained only because it is required by `get_shogi_game`.

### `list_quantum_sessions`

Allow:

- `total`
- `sessions[].startTime`
- `sessions[].endTime`
- `sessions[].averageTrustScore`
- `sessions[].dataPointCount`
- `sessions[].status`

Drop:

- `sessions[].id`
- `sessions[].sessionName`
- `sessions[].dataPoints`
- every unlisted future field

### `list_collapse_history`

Allow:

- `id`
- `status`
- `pieceType`
- `candidateCount`
- `collapsedPosition`
- declared numeric score fields
- `poeticDescriptor`
- `ipfsHash`
- `createdAt`
- `collapsedAt`

Drop every field not declared in the output schema.

### `get_shogi_game`

Allow the collapse-history fields plus:

- `boardState`
- `superpositionPiece`

Drop:

- the entire `nftMetadata` object
- creator names or addresses
- descriptions and artistic statements
- quantum signatures
- arbitrary NFT attributes
- every unlisted future field

Public provenance may be followed through the explicitly allowed `ipfsHash`; arbitrary stored metadata is not mirrored automatically.

### `list_agent_loop_sessions`

Allow:

- `total`
- `sessions[].participantMode`
- `sessions[].status`
- `sessions[].language`
- `sessions[].createdAt`
- `sessions[].hasLayers` as a derived boolean only

Drop:

- `sessions[].id`
- `sessions[].title`
- `sessions[].rawInput`
- `sessions[].rawInputLength`
- `sessions[].layer1`
- `sessions[].layer2`
- `sessions[].layer3`
- `sessions[].decomposition`
- `sessions[].sessionKey`
- `sessions[].consentVersion`
- `sessions[].withdrawnAt`
- every unlisted future field

No excerpt, hash, embedding, summary, or derived entity list may substitute for the dropped free text without a new consent and policy review.

### `list_mint_events`

Allow:

- `count`
- `events[].timestamp`

Drop:

- `events[].referrer`
- wallet addresses
- every unlisted future field

## REST parity

Apply equivalent allowlist projections before serialization:

- Agent-loop session reads must exclude free text, derived layers, session keys, consent/version fields, withdrawal fields, and unnecessary IDs.
- Quantum-session reads must exclude names, IDs, and `dataPoints` bodies; publish only the allowed summary fields and counts.
- Quantum-shogi reads must exclude the entire NFT metadata object.
- Mint-event reads must exclude referrer or wallet identifiers.
- A raw storage row must never be passed directly to `res.json` on these public routes.

## Required no-auth contract

Every public MCP tool must explicitly advertise:

```json
{"securitySchemes":[{"type":"noauth"}]}
```

The route must accept anonymous MCP requests. A supplied `Authorization` header must not unlock additional fields or behavior.

## Privacy-negative tests

Before Publish, persistent tests must fail if:

1. any prohibited key appears recursively in MCP structured or model-readable output;
2. any prohibited key appears recursively in the related REST output;
3. output contains a seeded private marker placed in free text, derived layers, session names, NFT metadata, session keys, or wallet fields;
4. a handler returns a key not declared by its exact output schema;
5. MCP and REST projections diverge in privacy behavior;
6. no-auth is absent from any tool descriptor;
7. anonymous initialize, tools/list, or tool calls require a secret;
8. an Authorization header changes the public result shape;
9. production build output reintroduces the former route-wide Bearer requirement.

Fixtures must be isolated and removed after the test. Production data must not be mutated.

## Scientific and ethical boundary

- Stored trust or score fields are project data, not validated scientific measurements unless separately evidenced.
- Poetic and quantum language remains descriptive or metaphorical unless an empirical basis is explicitly supplied.
- Public reachability is not retroactive consent.
- Withdrawal or consent-management fields are not public observables.

## Official basis

- [OpenAI authentication guidance](https://developers.openai.com/plugins/build/auth) defines `noauth` as anonymously callable and recommends per-tool `securitySchemes`.
- [OpenAI submission guidance](https://developers.openai.com/plugins/deploy/submission) requires removal of unnecessary personal data, auth secrets, debug payloads, internal identifiers, and undisclosed user-related fields.

## Promotion condition

This policy becomes `verified_public` only after:

1. local privacy-negative tests pass from saved state;
2. the production build passes;
3. the latest build is published intentionally;
4. the public HTTPS MCP endpoint advertises no-auth and passes the same field checks;
5. the public REST and root UI regressions pass.


## Local Path A checkpoint — 2026-08-08 JST

The saved Replit state was rerun without Publish after the no-auth/read-projection implementation.

```yaml
observed:
  persistent_test_files: 3
  tests:
    total: 50
    passed: 50
    failed: 0
  tool_security_schemes:
    noauth: "7/7"
  privacy_negative:
    mcp_tools: passed
    public_rest_get: passed
    seeded_private_markers_absent: passed
    strict_allowlist_keys: passed
  production_build:
    passed: true
    former_route_wide_bearer_absent: true
  regression:
    rest_get_routes: "4/4 passed"
    isolated_root_ui: "HTTP 200"
    running_development_ui: "HTTP 200"
  database:
    games_before_after: "15 -> 15"
    fixtures_removed: true
  publish_performed: false
```

This verifies the anonymous read contract locally. It does not yet authorize Publish because a separate audit found unsafe public REST mutation boundaries on the same host.

## Public mutation boundary discovered before Publish

A read-only audit found thirteen public mutation endpoints and only one existing administrative boundary. The following are release blockers even though they are outside the seven read-only MCP tools:

1. Agent-loop withdrawal must require the creator's unguessable `sessionKey`, not a sequential public row ID. It must return a minimal status DTO and never disclose stored keys or raw content.
2. Pinata upload must not allow anonymous callers to spend the server owner's credential or publish arbitrary metadata. It must use a fail-closed administrative or equivalent capability boundary.
3. IPFS-hash updates must use a fail-closed administrative or equivalent capability boundary, be write-once, and return a minimal DTO.
4. Public mutation responses must not return raw storage rows containing `rawInput`, `sessionKey`, NFT metadata, wallet/referrer identifiers, derived layers, or unknown future fields.
5. Public mutation endpoints require bounded abuse controls and reproducible negative tests.
6. The seven MCP tools must remain anonymous, read-only, and unchanged by this REST hardening.

### Human decision retained for the artwork

Whether any visitor may collapse another visitor's uncollapsed Quantum Shogi game is a participatory-art rule, not merely an implementation detail. The current anonymous observe behavior is therefore not silently changed. It remains a blocking human-design decision before public promotion:

- `public_collective_observation`: preserve anonymous collapse intentionally, with abuse controls and explicit disclosure; or
- `creator_capability_only`: require an unguessable game capability returned only at creation.

## Additional promotion conditions

Before the policy can become `verified_public`:

1. The mutation blockers above must have persistent positive and negative tests.
2. The complete local suite must pass from saved state.
3. The Quantum Shogi observation rule must be explicitly selected and recorded.
4. Only then may the latest build be intentionally published.
5. The public MCP and REST surfaces must be independently rechecked after deployment.

Invariant: `published ≠ latest_verified_state`.
