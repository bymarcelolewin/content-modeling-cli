# Checklist: Story #2 - changeCurrentModel

## Implementation Tasks

### Project Setup & Validation
- [X] Create `mcp-server/tools/changeCurrentModel.mjs` file
- [X] Implement project structure validation (check for `.cmcli.json` file)
- [X] Implement content-models directory validation
- [X] Implement check for existing models in content-models directory

### Parameter Schema & Validation
- [X] Import Zod library for parameter validation
- [X] Define schema with required `model` parameter (string)
- [X] Add parameter description for MCP client
- [X] Handle parameter validation errors

### Shared Utilities Setup
- [X] Create `mcp-server/utils/` directory
- [X] Create `mcp-server/utils/modelValidation.mjs` with shared validation functions
- [X] Export function to get available models list
- [X] Export function to validate model exists
- [X] Export function to generate error message with available models

### Model Validation
- [X] Import shared validation utilities
- [X] Use shared function to get available models from content-models directory
- [X] Use shared function to validate target model exists
- [X] Use shared function to generate error message with available models list

### Context File Management
- [X] Implement `.cm-mcp-context.json` file existence check
- [X] Implement auto-creation of context file with `{"currentModel": ""}` structure
- [X] Implement reading existing context file
- [X] Handle JSON parsing errors gracefully
- [X] Update `currentModel` property in context file
- [X] Write updated context back to file

### Core Functionality
- [X] Implement main tool logic with model parameter
- [X] Track previous model value for success messages
- [X] Return "✅ Changed model from 'old-model' to 'new-model'" when previous model exists
- [X] Return "✅ Set current model to 'new-model'" when no previous model
- [X] Implement proper MCP response format with content array

### Error Handling
- [X] Handle "Not in a valid CM CLI project (missing .cmcli file)" error
- [X] Handle "No content-models directory found in project" error  
- [X] Handle "No content models found in project" error
- [X] Handle "Model 'xyz' not found. Available models: [list]" error with emoji prefix
- [X] Handle file system errors (permissions, disk space, etc.)
- [X] Handle JSON parsing and writing errors

### Integration & Registration
- [X] Verify tool appears in MCP client tool list (auto-registered from tools directory)

### Testing & Validation (User)
- [X] Test changing to valid model in CM CLI project
- [X] Test changing from one model to another (verify old → new message)
- [X] Test setting model when no previous model exists
- [X] Test with invalid/non-existent model name
- [X] Test in directory without `.cmcli.json` file
- [X] Test in project without `content-models` directory
- [X] Test in project with empty `content-models` directory
- [X] Test context file auto-creation functionality
- [X] Test parameter validation (missing model parameter)
- [X] Verify MCP response format matches specification
- [X] Verify persistence across MCP server restarts

### Documentation & Cleanup
- [X] Update Release Notes (beta.12 section)
- [X] Add new tool to `cli-docs/mcp-tools/README.md`
- [X] Verify output messages match PRD specification exactly (including emojis)
- [X] Ensure code follows existing MCP server patterns and conventions