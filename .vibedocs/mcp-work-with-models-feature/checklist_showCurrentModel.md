# Checklist: Story #1 - showCurrentModel

## Implementation Tasks

### Project Setup & Validation
- [ ] Create `mcp-server/tools/showCurrentModel.mjs` file
- [ ] Implement project structure validation (check for `.cmcli` file)
- [ ] Implement content-models directory validation
- [ ] Implement check for existing models in content-models directory

### Context File Management
- [ ] Implement `.cm-mcp-context.json` file existence check
- [ ] Implement auto-creation of context file with `{"currentModel": ""}` structure
- [ ] Implement reading `currentModel` from context file
- [ ] Handle JSON parsing errors gracefully

### Core Functionality
- [ ] Implement main tool logic with no parameters
- [ ] Return "Current model: {model-name}" when model is set
- [ ] Return "No model currently set" when currentModel is empty/null
- [ ] Implement proper MCP response format with content array

### Error Handling
- [ ] Handle "Not in a valid CM CLI project (missing .cmcli file)" error
- [ ] Handle "No content-models directory found in project" error  
- [ ] Handle "No content models found in project" error
- [ ] Handle file system errors (permissions, disk space, etc.)

### Integration & Registration
- [ ] Verify tool appears in MCP client tool list (auto-registered from tools directory)

### Testing & Validation (User)
- [ ] Test in valid CM CLI project with existing model set
- [ ] Test in valid CM CLI project with no model set (empty context)
- [ ] Test in valid CM CLI project with missing context file
- [ ] Test in directory without `.cmcli` file
- [ ] Test in project without `content-models` directory
- [ ] Test in project with empty `content-models` directory
- [ ] Test context file auto-creation functionality
- [ ] Verify MCP response format matches specification

### Documentation & Cleanup
- [ ] Update Release Notes
- [ ] Add new tool to `cli-docs/mcp-tools/`
- [ ] Verify output messages match PRD specification exactly
- [ ] Ensure code follows existing MCP server patterns and conventions