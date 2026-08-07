# G1 — Streamable HTTP MCP

## Status

`verified_local`

Initial observation found an Express + Vite + React runtime with REST routes and no MCP surface. After the G1 implementation pass, local/runtime inspection verified a genuine MCP Streamable HTTP endpoint at `/mcp` using `@modelcontextprotocol/sdk`.

This status is deliberately **local/runtime only**. Public deployment remains a separate G7 requirement.

## Goal

Add a genuine MCP Streamable HTTP endpoint at `/mcp` without pretending existing REST routes are MCP.

## Acceptance evidence

G1 is verified locally because all of the following were observed:

1. The application starts successfully with the MCP surface enabled.
2. MCP `initialize` succeeds against `/mcp` and returns protocol/server information.
3. MCP responses are distinguishable from ordinary REST responses.
4. Existing non-MCP routes continue to respond successfully.
5. Malformed or unsupported MCP requests return explicit MCP/JSON-RPC errors rather than falling through to REST.
6. No submission metadata was invented to satisfy the gate.

## Observed evidence

```yaml
observed:
  transport:
    path: /mcp
    mode: Streamable HTTP
    sdk: "@modelcontextprotocol/sdk"
    initialize: verified
    protocol_version_observed: "2025-03-26"
  errors:
    malformed_json: "JSON-RPC -32700 / HTTP 400"
    unknown_method: "JSON-RPC -32601"
    unsupported_get_delete: "JSON-RPC -32000 / HTTP 405"
  regression:
    existing_rest_routes: verified
    existing_ui_root: verified
  submission_metadata_created: false
inferred:
  - "The local transport boundary is ready for tool-contract review."
imagined: []
```

## Boundary retained

- A successful REST request does not count as MCP evidence.
- A route merely named `/mcp` would not satisfy this gate without MCP protocol behavior.
- Local verification does not satisfy G7 public deployment.
- Authentication is tracked separately under G5 even though local Bearer checks were also observed during this cycle.

## Public deployment observation

At the time of this evidence update, the existing public Replit deployment was still serving an older build and did **not** expose the verified local MCP implementation. Public `/mcp` returned a plain 500 response. Therefore G7 remains `not_verified`.

## Next gate

G1 is complete at the local transport layer. Proceed to **G2 — stable tools, descriptions, schemas, and handlers**, while production hardening/deployment continues independently toward G7.