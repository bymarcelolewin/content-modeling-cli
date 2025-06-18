# PRD: Standalone List Tools - Remove CLI Dependencies

## Overview

Refactor `listTemplates.mjs` and `listModels.mjs` MCP tools to operate independently of CLI commands by reading the filesystem directly. This eliminates subprocess dependencies and improves performance, reliability, and consistency with newer MCP tools.

## Background

Currently, both `listTemplates` and `listModels` MCP tools execute CLI commands (`cm list-templates --json` and `cm list-models --json`) via child processes. This approach has several drawbacks:

1. **Performance**: Subprocess execution overhead
2. **Reliability**: Dependency on CLI being available and working
3. **Consistency**: Newer tools (showCurrentModel, changeCurrentModel) read filesystem directly
4. **Maintenance**: Two different patterns in the same codebase

## Goals

- **Primary**: Make both tools standalone by reading filesystem directly
- **Performance**: Eliminate subprocess execution overhead
- **Reliability**: Remove dependency on CLI commands being available
- **Consistency**: Align with existing filesystem-based tools
- **Maintainability**: Consolidate shared logic in reusable utilities

## User Stories

1. **As a content modeler user**, I want `listTemplates` to display all my templates I have access to, including, for each template, their content types.
2. **As a content modeler user**, I want `listModels` to display all my content models I have access to, including, for each model, their content types.
3. **As a developer**, I want consistent patterns across all MCP tools
4. **As a developer**, I want shared utilities to avoid code duplication

## Technical Requirements

### Current State Analysis

**listTemplates.mjs**:
- Uses `cm list-templates --json` command
- Returns JSON: `{templates: [...]}` 
- Error handling via try/catch on subprocess

**listModels.mjs**:
- Uses `cm list-models --json` command
- Returns human text: "Found models: model1, model2"
- Error handling via try/catch on subprocess

### Target State

**User Project File / Folder Structure to Read**:

Please review the [project folder structure specification](../spec_user-project-folder-structure.md)

### New Utility Requirements

Create `mcp-server/utils/userProjectReader.mjs` with:

1. **getAvailableTemplates(cwd)**
   - Read `content-model-templates/templates/` directory
   - For each template directory, read its `content-types/` folder
   - Return structured data with template names and their content types
   - Convert camelCase .json filenames to Proper Case display names
   - Handle missing directories gracefully
   - Consistent error handling pattern

2. **getContentTypes(directoryPath)**
   - Helper function to read content types from a given directory
   - Read `content-types/*.json` files
   - Convert camelCase filenames to Proper Case (e.g., `mySEO.json` → "My SEO")
   - Return array of formatted content type names
   - Handle missing content-types directory gracefully

3. **formatCamelCaseToProperCase(filename)**
   - Helper function to convert camelCase .json files to display format
   - Remove .json extension
   - Convert camelCase to Proper Case with spaces
   - Examples: `mySEO.json` → "My SEO", `bookAuthor.json` → "Book Author"

4. **getAvailableModels(cwd, includeContentTypes = false)**
   - Move from `modelValidation.mjs` to `userProjectReader.mjs`
   - Read `content-models/models/` directory
   - Enhance to optionally include content types
   - Maintain backward compatibility for existing usage
   - Convert camelCase content type filenames to Proper Case when includeContentTypes is true

### Tool Refactoring Specifications

#### listTemplates.mjs Refactor

**New Behavior**:
- Import project validation from `modelValidation.mjs`
- Import template reading from new `userProjectReader.mjs`
- Read `content-model-templates/templates/` directory directly
- Return enhanced JSON format with content types
- **Breaking Change**: Output format now includes content types

**Error Handling**:
- "Error: Not in a valid CM CLI project (missing .cmcli.json file)"
- "Error: No content-model-templates directory found in project"
- "Error: No templates directory found in content-model-templates"
- "Error: No templates found in project"

**New Success Response**:
```json
{
  "templates": [
    {
      "name": "blog-template",
      "contentTypes": ["Blog Post", "Author", "Category"]
    },
    {
      "name": "ecommerce-template", 
      "contentTypes": ["Product", "My SEO", "Product Category"]
    }
  ]
}
```

#### listModels.mjs Refactor

**New Behavior**:
- Use existing `validateForModelOperation()` from `modelValidation.mjs`
- Enhance existing `getAvailableModels()` to include content types
- Remove subprocess execution completely
- **Breaking Change**: Output format now includes content types
- Update to structured format similar to templates

**New Output Format**:
- Success: Enhanced structured display showing models and their content types
- No models: "No content models found in project: {cwd}"
- Errors: "Error reading models in '{cwd}': {error}"

**New Success Response Example**:
```
Found models:

• my-blog-model
  Content Types: Blog Post, Author, Category

• ecommerce-site
  Content Types: Product, My SEO, Product Category
```

## Implementation Plan

### Phase 1: Create New Utilities
1. Create `mcp-server/utils/userProjectReader.mjs`
2. Implement `getAvailableTemplates(cwd)` function with content types
3. Implement `getContentTypes(directoryPath)` helper function
4. Implement `formatCamelCaseToProperCase(filename)` helper function
5. Add comprehensive error handling
6. Test camelCase to Proper Case conversion

### Phase 2: Move and Enhance Model Utilities
1. Move `getAvailableModels()` from `modelValidation.mjs` to `userProjectReader.mjs`
2. Enhance `getAvailableModels()` to optionally include content types
3. Update `validateForModelOperation()` in `modelValidation.mjs` to import from new location
4. Ensure backward compatibility for existing usage

### Phase 3: Refactor listTemplates.mjs
1. Remove subprocess execution (`execAsync`)
2. Import validation utilities
3. Import directory reading utilities  
4. Implement direct filesystem reading for templates
5. Update to new JSON output format with content types
6. Update error handling to match template directory structure

### Phase 4: Refactor listModels.mjs
1. Remove subprocess execution (`execAsync`)
2. Import `validateProjectStructure()` from `modelValidation.mjs`
3. Import enhanced `getAvailableModels()` from `userProjectReader.mjs`
4. Update to new structured human-readable output format
5. Keep consistent error message formats

### Phase 5: Update Existing Tools
1. Update `showCurrentModel.mjs` to import `getAvailableModels()` from `userProjectReader.mjs`
2. Update `changeCurrentModel.mjs` import (via `validateForModelOperation()` fix)
3. Ensure no breaking changes to existing tool functionality
4. Test all existing tools still work correctly

### Phase 6: CLI Cleanup
1. Update: `list-templates.js` in the `cli-commands` folder by removing the --json flag completely. No longer needed.
2. Update: `list-content-models.js` in the `cli-commands` folder by removing the --json flag completely. No longer needed.
3. Update: `cm.js` in the `cli-commands` folder by removing --json flag from both `list-models` and `list-templates` commands.
4. Update CLI help text/documentation to remove --json flag references for `list-templates` and `list-models` commands.

### Phase 7: Testing & Validation
1. Test both refactored tools in valid CM CLI projects with templates and models
2. Test camelCase to Proper Case conversion (mySEO.json → "My SEO")
3. Test error scenarios (missing directories, empty directories, etc.)
4. Verify new enhanced output formats work correctly
5. Test all existing tools (`showCurrentModel`, `changeCurrentModel`) still work
6. Test performance improvements
7. Verify no regressions in model validation utilities

## Success Criteria

1. **Enhanced Functionality**: Both tools now show content types for each template/model
2. **Performance**: Faster execution (no subprocess overhead)  
3. **Reliability**: No dependency on CLI commands
4. **Consistency**: Same patterns as showCurrentModel/changeCurrentModel
5. **Maintainability**: Shared utilities for common operations
6. **Proper Formatting**: CamelCase filenames converted to readable "Proper Case" display

## Technical Specifications

### New Utility: userProjectReader.mjs

```javascript
/**
 * Gets list of available templates with their content types
 * @param {string} cwd - Current working directory  
 * @returns {Object} - { templates: Array<{name: string, contentTypes: string[]}>, error?: string }
 */
export function getAvailableTemplates(cwd) {
  // Implementation details
}

/**
 * Gets content types from a directory's content-types folder
 * @param {string} directoryPath - Path to template/model directory
 * @returns {string[]} - Array of formatted content type names
 */
export function getContentTypes(directoryPath) {
  // Implementation details
}

/**
 * Converts camelCase .json filename to Proper Case display name
 * @param {string} filename - The .json filename (e.g., "mySEO.json")
 * @returns {string} - Formatted display name (e.g., "My SEO")
 */
export function formatCamelCaseToProperCase(filename) {
  // Examples: mySEO.json → "My SEO", bookAuthor.json → "Book Author"
}
```

### Updated Model Validation Utility

```javascript
// Update to existing modelValidation.mjs
// Remove getAvailableModels() - moved to userProjectReader.mjs
// Update validateForModelOperation() to import getAvailableModels from userProjectReader.mjs

import { getAvailableModels } from "./userProjectReader.mjs";

export function validateForModelOperation(cwd, modelName = null) {
  // Use getAvailableModels from userProjectReader.mjs
}
```

### Enhanced userProjectReader.mjs Functions

```javascript
// All "get available" functions consolidated in userProjectReader.mjs
/**
 * Gets list of available content models with optional content types
 * @param {string} cwd - Current working directory
 * @param {boolean} includeContentTypes - Whether to include content types in response
 * @returns {Object} - { models: string[] | Array<{name: string, contentTypes: string[]}>, error?: string }
 */
export function getAvailableModels(cwd, includeContentTypes = false) {
  // Moved from modelValidation.mjs and enhanced
}
```

### Error Message Consistency

All tools should use consistent error message patterns:
- Project validation: Use existing `validateProjectStructure()`
- Directory validation: Consistent "No {directory} directory found" format
- Empty directory: Consistent "No {items} found in project" format

## Dependencies

- **Modified**: `mcp-server/utils/modelValidation.mjs` (for project validation, removing getAvailableModels)
- **New**: `mcp-server/utils/userProjectReader.mjs` (for all "get available" operations)
- **Updated Tools**: `showCurrentModel.mjs`, `changeCurrentModel.mjs` (import changes)
- **Node.js**: `fs` and `path` modules (already used in existing utilities)

## Risk Assessment

**Low Risk**: 
- Reading filesystem directly (no external API calls)
- Maintaining exact same output formats
- Building on proven patterns from existing tools
- No breaking changes to MCP tool interfaces

## Timeline Estimate

**Total: 5-6 hours**
- Phase 1 (New utilities with content types): 60 minutes
- Phase 2 (Move and enhance model utilities): 45 minutes
- Phase 3 (listTemplates refactor): 45 minutes  
- Phase 4 (listModels refactor): 45 minutes
- Phase 5 (Update existing tools): 30 minutes
- Phase 6 (CLI cleanup): 30 minutes
- Phase 7 (Testing & validation): 75 minutes

## Future Benefits

1. **Foundation**: Establishes pattern for future filesystem-based tools
2. **Performance**: All MCP tools will be faster and more reliable
3. **Consistency**: Single approach across all tools
4. **Maintainability**: Shared utilities reduce code duplication
5. **Extensibility**: Easy to add new directory-reading tools

## Validation Checklist

- [ ] Both tools work without CLI dependency
- [ ] Enhanced output formats include content types
- [ ] CamelCase to Proper Case conversion works correctly
- [ ] Error messages are consistent with existing tools
- [ ] Performance improvements are measurable
- [ ] All existing model validation utilities remain backward compatible
- [ ] `showCurrentModel` and `changeCurrentModel` tools continue to work after refactor
- [ ] `getAvailableModels()` successfully moved to `userProjectReader.mjs`
- [ ] New utilities follow existing code patterns
- [ ] Templates read from correct `content-model-templates/templates/` directory
- [ ] Models continue to read from `content-models/models/` directory
- [ ] Documentation is updated appropriately