# Story: Refactor Model Validation to Shared Utilities

## Overview
Refactor existing MCP tools that perform model validation to use the new shared `mcp-server/utils/modelValidation.mjs` utility functions, promoting DRY principles and consistent error handling across all MCP tools.

## Background
During implementation of `changeCurrentModel`, we created shared validation utilities in `mcp-server/utils/modelValidation.mjs`. The existing `showCurrentModel` tool has duplicate validation logic that should be refactored to use these shared utilities.

## Goals
- Remove code duplication across MCP tools
- Ensure consistent error messages and validation logic
- Make future MCP tools easier to implement with reusable validation
- Improve maintainability of model validation logic

## Scope
**Tools to Refactor:**
- `showCurrentModel.mjs` - Replace inline model validation with shared utilities

**Shared Utilities:**
- Leverage existing `mcp-server/utils/modelValidation.mjs` functions

## Technical Requirements

### Refactoring Tasks
1. **Update showCurrentModel.mjs:**
   - Import shared validation utilities
   - Replace inline project validation with `validateProjectStructure()`
   - Replace inline model directory checks with `getAvailableModels()`
   - Maintain exact same error messages and behavior
   - Ensure no breaking changes to tool functionality

### Validation Consistency
- All tools should use identical validation logic
- Error messages should be consistent across tools
- Same project structure validation flow
- Same model availability checking

## Success Criteria
1. **Functionality**: `showCurrentModel` works identically after refactoring
2. **Code Quality**: No duplicate validation logic between tools
3. **Maintainability**: Single source of truth for validation logic
4. **Testing**: All existing tests continue to pass
5. **Future Ready**: New model-related tools can easily reuse utilities

## Implementation Checklist

### Code Refactoring
- [ ] Update `showCurrentModel.mjs` to import validation utilities
- [ ] Replace project structure validation with shared function
- [ ] Replace model directory validation with shared function
- [ ] Remove duplicate validation code from `showCurrentModel.mjs`
- [ ] Verify all error messages remain exactly the same

### Testing & Validation
- [ ] Test `showCurrentModel` functionality remains unchanged
- [ ] Test error scenarios produce identical messages
- [ ] Verify no regression in existing behavior
- [ ] Test integration between tools and shared utilities

### Documentation
- [ ] Update code comments to reference shared utilities
- [ ] Ensure consistent documentation across tools

## Priority
**Medium** - This is technical debt cleanup that improves code quality but doesn't add new user-facing features.

## Dependencies
- Requires `changeCurrentModel` implementation to be completed first (creates the shared utilities)
- Should be done before implementing additional model-related MCP tools

## Estimated Timeline
**30-45 minutes** - Straightforward refactoring task with existing utilities