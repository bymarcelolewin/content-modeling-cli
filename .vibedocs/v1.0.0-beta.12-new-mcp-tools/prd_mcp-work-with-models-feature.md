# PRD: MCP Work with Models Feature

## Overview

This feature adds MCP tools to manage the "current selected model" context within a Content Modeling CLI project. This enables AI clients (like Claude Desktop) to maintain state about which content model they're working with, facilitating more intelligent model-specific operations in future tools.

## Background

Currently, the MCP server supports project-level operations (change/show project path, list models). However, there's no way to select and maintain context about which specific content model the user wants to work with. This creates friction when building AI workflows that need to operate on specific models.

## Goals

- Enable MCP clients to select and maintain a "current model" context
- Provide persistent storage of the selected model across MCP server sessions
- Validate model selection against available models in the project
- Create foundation for future model-specific MCP tools

## User Stories

1. **As an AI user**, I want to select a specific content model so that subsequent operations can be context-aware
2. **As an AI user**, I want to see which model is currently selected so I know the current context
3. **As an AI user**, I want the selected model to persist across MCP server restarts so I don't lose context

## Technical Requirements

### Context Storage
- **File**: `.cm-mcp-context.json` in project root directory
- **Structure**: 
  ```json
  {
    "currentModel": "model-name-here"
  }
  ```
- **Auto-creation**: Both tools auto-create this file if it doesn't exist

### Project Validation
Tools must validate the following before operating:
1. Current working directory contains `.cmcli.json` file (valid CM CLI project)
2. `content-models/` directory exists in project root
3. At least one model exists in `content-models/` directory
4. For model changes: target model folder exists in `content-models/`

### Error Handling
- **No project**: "Error: Not in a valid CM CLI project (missing .cmcli.json file)"
- **No content-models folder**: "Error: No content-models directory found in project"
- **No models available**: "Error: No content models found in project"
- **Invalid model**: "Error: Model 'xyz' not found. Available models: [list]"

## Feature Specification

### Tool 1: showCurrentModel

**Purpose**: Display the currently selected content model

**Parameters**: None

**Behavior**:
1. Validate project structure
2. Check if `.cm-mcp-context.json` exists
   - If not: Create file with `{"currentModel": ""}`
3. Read `currentModel` from context file
4. Return appropriate message

**Output Examples**:
- Success: "Current model: my-blog-model"
- No model set: "No model currently set"
- Error: "Error: Not in a valid CM CLI project"

**MCP Response Format**:
```javascript
return {
  content: [
    { type: "text", text: "Current model: my-blog-model" }
  ]
};
```

### Tool 2: changeCurrentModel

**Purpose**: Change the currently selected content model

**Parameters**:
- `model` (string, required): Name of the model to select

**Behavior**:
1. Validate project structure
2. Validate target model exists in `content-models/` directory
3. Read existing context (create file if needed)
4. Update `currentModel` in context file
5. Return success message with old → new model info

**Output Examples**:
- Success with previous: "✅ Changed model from 'old-model' to 'new-model'"
- Success without previous: "✅ Set current model to 'new-model'"
- Error: "❌ Error: Model 'xyz' not found. Available models: model1, model2"

**Zod Schema**:
```javascript
export const schema = {
  model: z.string().describe("The name of the content model to select")
};
```

## Implementation Details

### File Structure
```
mcp-server/tools/
├── showCurrentModel.mjs
├── changeCurrentModel.mjs
└── (existing tools...)
```

### Context File Location
- **Path**: `{project-root}/.cm-mcp-context.json`
- **Created by**: Both tools, auto-created if missing
- **Format**: JSON with `currentModel` property

### Integration Points
- **Existing Tool**: Leverages `listModels.mjs` for model validation
- **Future Tools**: Other MCP tools can read `.cm-mcp-context.json` to get current model context

## Success Metrics

1. **Functionality**: Both tools work correctly in valid CM CLI projects
2. **Persistence**: Selected model persists across MCP server restarts
3. **Error Handling**: Clear error messages for all failure scenarios
4. **Integration**: Context file is properly created and maintained

## Future Considerations

This feature creates the foundation for future model-specific MCP tools such as:
- Show model details/structure
- Add/modify fields in current model
- Deploy current model to Contentful
- Generate model documentation

## Dependencies

- Existing MCP server architecture (`mcp-server/index.mjs`)
- Existing `listModels.mjs` tool for model validation
- Node.js `fs` module for file operations
- Zod library for parameter validation

## Risk Assessment

**Low Risk**: This feature only reads/writes to a local context file and doesn't modify actual content models or interact with external APIs.

## Timeline

**Estimated Implementation**: 2-3 hours
- Tool 1 (showCurrentModel): 45 minutes
- Tool 2 (changeCurrentModel): 90 minutes  
- Testing & validation: 45 minutes