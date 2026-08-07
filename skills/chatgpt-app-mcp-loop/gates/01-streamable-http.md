# G1 — Streamable HTTP MCP

## Status

`observed_not_implemented` at initial observation.

The current `QuantumBananaMoon` runtime is an Express + Vite + React application with REST routes. No MCP `/mcp` endpoint was observed before this gate began.

## Goal

Add a genuine MCP Streamable HTTP endpoint at `/mcp` without pretending existing REST routes are MCP.

## Minimal implementation boundary

- Preserve existing REST behavior.
- Add MCP protocol handling as an isolated surface.
- Use a stable `/mcp` path.
- Do not add speculative tools merely to make the server look complete.
- G1 may expose a minimal safe capability sufficient to verify MCP protocol behavior; the full tool contract belongs to G2.

## Acceptance evidence

G1 becomes `verified` only when all of the following are observed:

1. The application starts successfully with the MCP surface enabled.
2. A client can initialize an MCP session against `/mcp` using Streamable HTTP semantics.
3. MCP protocol responses are distinguishable from ordinary REST responses.
4. Existing non-MCP routes continue to behave as before.
5. Failure behavior for malformed/unsupported MCP requests is explicit rather than silently falling through to REST.
6. The implementation does not require invented submission metadata.

## Negative checks

- A successful `GET /api/...` request does not satisfy this gate.
- A route named `/mcp` that only returns arbitrary JSON does not satisfy this gate.
- A README claim without a protocol-level check does not satisfy this gate.
- Local implementation alone does not satisfy G7 public deployment.

## Evidence record

Populate only after verification.

```yaml
observed:
  implementation: pending
  local_protocol_check: pending
  existing_routes_regression: pending
  malformed_request_check: pending
inferred: []
imagined: []
```

## Next gate

After G1 is verified, freeze the transport boundary and move to **G2 — stable tools and schemas**.