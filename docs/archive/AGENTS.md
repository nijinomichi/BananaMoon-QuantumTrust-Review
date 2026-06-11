# Agents

## Delegation Rules
When a task requires research, delegate to the research
sub-agent by creating a task in the queue.

## Communication
- Use structured JSON messages between agents
- Always include a `taskId` for tracking
- Report results back to the requesting agent

## Available Agents
- **Researcher**: Web browsing and data collection
- **Analyzer**: Data processing and chart generation
- **Executor**: Trade execution and portfolio management
