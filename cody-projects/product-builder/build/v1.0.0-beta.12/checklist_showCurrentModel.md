# Checklist: Story #1 - showCurrentModel

## Implementation Tasks

### Project Setup & Validation
- [X] Create `mcp-server/tools/showCurrentModel.mjs` file
- [X] Implement project structure validation (check for `.cmcli` file)
- [X] Implement content-models directory validation
- [X] Implement check for existing models in content-models directory

### Context File Management
- [X] Implement `.cm-mcp-context.json` file existence check
- [X] Implement auto-creation of context file with `{"currentModel": ""}` structure
- [X] Implement reading `currentModel` from context file
- [X] Handle JSON parsing errors gracefully

### Core Functionality
- [X] Implement main tool logic with no parameters
- [X] Return "Current model: {model-name}" when model is set
- [X] Return "No model currently set" when currentModel is empty/null
- [X] Implement proper MCP response format with content array

### Error Handling
- [X] Handle "Not in a valid CM CLI project (missing .cmcli file)" error
- [X] Handle "No content-models directory found in project" error  
- [X] Handle "No content models found in project" error
- [X] Handle file system errors (permissions, disk space, etc.)

### Integration & Registration
- [X] Verify tool appears in MCP client tool list (auto-registered from tools directory)

### Testing & Validation (User)
- [X] Test in valid CM CLI project with existing model set
- [X] Test in valid CM CLI project with no model set (empty context)
- [X] Test in directory without `.cmcli` file
- [X] Test in project without `content-models` directory
- [X] Test in project with empty `content-models` directory
- [X] Test context file auto-creation functionality
- [X] Verify MCP response format matches specification

### Documentation & Cleanup
- [X] Update Release Notes
- [X] Add new tool to `cli-docs/mcp-tools/README.md`
- [X] Verify output messages match PRD specification exactly
- [X] Ensure code follows existing MCP server patterns and conventions