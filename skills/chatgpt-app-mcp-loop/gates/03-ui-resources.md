# G3 — MCP Apps UI Resources

## Status

`not_applicable`

This is a verified applicability decision, not a claim that an MCP UI was implemented.

## Goal

Add MCP Apps UI resources only when visual or interactive behavior materially improves a tool-backed user goal. Do not convert an unrelated Web UI into an MCP widget merely because it already exists.

## Observed evidence

```yaml
observed:
  server_capabilities:
    tools:
      listChanged: true
    resources: absent
  protocol_methods:
    resources_list: "JSON-RPC -32601 / Method not found"
    resource_templates_list: "JSON-RPC -32601 / Method not found"
  tool_descriptors:
    count: 7
    ui_meta: absent
    ui_resource_uri: absent
    output_template: absent
    widget_metadata: absent
  server_registration:
    register_resource: absent
    ui_uri: absent
    widget_registration: absent
  existing_vite_ui:
    transport: REST
    mcp_reference: absent
    relationship_to_mcp: separate
  tool_completion:
    structured_content: sufficient
    model_readable_content: sufficient
    interactive_input_required: false
  runtime_modified_for_g3: false
inferred:
  - "The current seven read-only data tools are complete as a tool-only MCP surface."
imagined: []
```

## Decision

The current tools perform read-only status, overview, list, and record-detail retrieval. Their results are small or bounded structured payloads that the model can summarize directly. None requires in-widget selection, editing, confirmation, navigation, or long-lived visual state.

Therefore custom MCP UI would add implementation and review surface without adding a necessary user capability. G3 is `not_applicable` for the current contract.

## Boundary retained

- Existing Vite UI ≠ MCP Apps UI resource.
- A nested board-state object ≠ automatic justification for a widget.
- No `ui://` URI, output template, resource metadata, or CSP claim is invented.
- G3 `not_applicable` does not satisfy G4, G5, G6, or G7.
- The existing Web UI may continue independently over REST.

## Reactivation condition

Reopen G3 only if a future MCP tool introduces a user goal that materially benefits from visual interaction, such as inspecting a board while selecting or confirming a state-changing move. At that point, define the UI resource, tool relationship, accessibility behavior, CSP, and state lifecycle from observed requirements before implementation.

## Next gate

Proceed to **G4 — annotations and explicit side-effect boundaries**.
