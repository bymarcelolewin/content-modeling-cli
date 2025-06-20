# Checklist: Refactor Model Validation to Shared Utilities

## Implementation Tasks

### Code Refactoring
- [X] Import shared validation utilities into `showCurrentModel.mjs`
- [X] Replace inline project structure validation with `validateForModelOperation()`
- [X] Remove duplicate validation code from `showCurrentModel.mjs`
- [X] Clean up unused imports (fs operations for validation)
- [X] Update code comments to reference shared utilities

### Validation Logic Updates
- [X] Replace `.cmcli.json` file check with shared function
- [X] Replace `content-models` directory check with shared function
- [X] Replace `content-models/models` directory check with shared function
- [X] Replace model directory enumeration with shared function
- [X] Ensure error messages remain exactly the same

### Error Handling Consistency
- [X] Verify "Not in a valid CM CLI project" error message unchanged
- [X] Verify "No content-models directory found" error message unchanged
- [X] Verify "No models directory found in content-models" error message unchanged
- [X] Verify "No content models found in project" error message unchanged

### Testing & Validation
- [ ] Test `showCurrentModel` with valid project and set model
- [ ] Test `showCurrentModel` with valid project and no model set
- [ ] Test `showCurrentModel` with missing `.cmcli.json` file
- [ ] Test `showCurrentModel` with missing `content-models` directory
- [ ] Test `showCurrentModel` with missing `content-models/models` directory
- [ ] Test `showCurrentModel` with empty `content-models/models` directory
- [ ] Verify context file auto-creation still works
- [ ] Compare error messages before/after refactoring (should be identical)

### Code Quality
- [ ] Remove all duplicate validation logic
- [ ] Ensure both tools use identical validation flow
- [ ] Verify consistent error message formatting
- [ ] Clean up any unused variables or imports

### Documentation
- [ ] Update code comments to reference shared utilities
- [ ] Ensure consistent code style between tools
- [ ] Verify both tools follow same patterns

## Success Criteria
- ✅ Zero duplicate validation code between `showCurrentModel` and `changeCurrentModel`
- ✅ Identical functionality and error messages before/after refactoring
- ✅ Both tools use the same shared validation utilities
- ✅ Clean, maintainable code with single source of truth for validation