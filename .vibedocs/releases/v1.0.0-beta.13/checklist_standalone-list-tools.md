# Checklist: Standalone List Tools Implementation

## Phase 1: Create New Utilities (60 minutes) - **CLAUDE**

### Create userProjectReader.mjs File
- [x] Create `mcp-server/utils/userProjectReader.mjs` file
- [x] Add file header with version and date
- [x] Import required Node.js modules (`fs`, `path`)

### Implement Helper Functions
- [x] Implement `formatCamelCaseToProperCase(filename)` function
  - [x] Remove `.json` extension from filename
  - [x] Convert camelCase to Proper Case with spaces
  - [x] Test: `mySEO.json` → "My SEO"
  - [x] Test: `bookAuthor.json` → "Book Author"
  - [x] Test: `productCategory.json` → "Product Category"
  - [x] Handle edge cases (single words, already proper case)

### Implement getContentTypes Function
- [x] Implement `getContentTypes(directoryPath)` function
- [x] Check if `content-types/` directory exists in given path
- [x] Read all `.json` files from `content-types/` directory
- [x] Filter out non-JSON files
- [x] Convert each filename using `formatCamelCaseToProperCase()`
- [x] Return array of formatted content type names
- [x] Handle missing content-types directory gracefully
- [x] Add error handling for filesystem operations

### Implement getAvailableTemplates Function
- [x] Implement `getAvailableTemplates(cwd)` function
- [x] Check if `content-model-templates/templates/` directory exists
- [x] Read all subdirectories from templates directory
- [x] For each template directory:
  - [x] Get template name
  - [x] Call `getContentTypes()` to get content types
  - [x] Build template object with name and contentTypes
- [x] Return `{ templates: [...], error?: string }` format
- [x] Handle missing templates directory: return appropriate error
- [x] Handle empty templates directory: return empty array
- [x] Add comprehensive error handling

### Implement getAvailableModels Function (Moved from modelValidation.mjs)
- [x] Copy existing `getAvailableModels()` function from `modelValidation.mjs`
- [x] Enhance function signature: `getAvailableModels(cwd, includeContentTypes = false)`
- [x] When `includeContentTypes` is false: return existing format `{ models: string[], error?: string }`
- [x] When `includeContentTypes` is true: return enhanced format with content types
- [x] For each model directory:
  - [x] Get model name
  - [x] If includeContentTypes is true, call `getContentTypes()` to get content types
  - [x] Build model object with name and contentTypes (when requested)
- [x] Maintain backward compatibility for existing usage
- [x] Keep all existing error handling and debug logging

### Testing Phase 1 Utilities
- [x] Test `formatCamelCaseToProperCase()` with various inputs
- [x] Test `getContentTypes()` with valid directories
- [x] Test `getContentTypes()` with missing content-types directory
- [x] Test `getAvailableTemplates()` with valid project structure
- [x] Test `getAvailableTemplates()` with missing templates directory
- [x] Test `getAvailableModels()` backward compatibility (includeContentTypes = false)
- [x] Test `getAvailableModels()` enhanced functionality (includeContentTypes = true)

## Phase 2: Move and Enhance Model Utilities (45 minutes) - **CLAUDE**

### Update modelValidation.mjs
- [x] Add import for `getAvailableModels` from `userProjectReader.mjs`
- [x] Remove existing `getAvailableModels()` function from `modelValidation.mjs`
- [x] Update `validateModelExists()` function to use imported `getAvailableModels()`
- [x] Update `validateForModelOperation()` function to use imported `getAvailableModels()`
- [x] Ensure all existing debug logging and error messages remain the same
- [x] Keep all other validation logic unchanged

### Testing Phase 2 Changes
- [x] Test `validateModelExists()` still works correctly
- [x] Test `validateForModelOperation()` still works correctly
- [x] Verify all error messages remain exactly the same
- [x] Test with various project structures (valid, invalid, missing directories)

## Phase 3: Refactor listTemplates.mjs (45 minutes) - **CLAUDE**

### Update Imports and Remove CLI Dependency
- [x] Remove `promisify` and `exec` imports
- [x] Remove `execAsync` declaration
- [x] Add import for basic project validation (fs, path)
- [x] Add import for `getAvailableTemplates` from `userProjectReader.mjs`

### Refactor Handler Function
- [x] Remove subprocess execution logic (`execAsync` call)
- [x] Add basic project validation (.cmcli.json check)
- [x] Add template reading using `getAvailableTemplates()`
- [x] Update error handling to match new validation patterns
- [x] Update success response to new JSON format with content types

### Update Error Messages
- [x] Error handled by getAvailableTemplates: "No content-model-templates directory found in project"
- [x] Error handled by getAvailableTemplates: "No templates directory found in content-model-templates"
- [x] Error handled by getAvailableTemplates: "No templates found in project"
- [x] Ensure consistent error message formatting

### Testing Phase 3 Changes
- [x] Test listTemplates in valid project with templates
- [x] Test new JSON output format matches specification
- [x] Test content types are properly displayed (Proper Case format)
- [x] Test error scenarios (missing .cmcli.json file)
- [x] Verify no subprocess execution occurs
- [x] Test performance improvement over CLI execution

## Phase 4: Refactor listModels.mjs (45 minutes) - **CLAUDE**

### Update Imports and Remove CLI Dependency
- [x] Remove `promisify` and `exec` imports
- [x] Remove `execAsync` declaration
- [x] Add import for `validateProjectStructure` from `modelValidation.mjs`
- [x] Add import for `getAvailableModels` from `userProjectReader.mjs`

### Refactor Handler Function
- [x] Remove subprocess execution logic (`execAsync` call)
- [x] Add project structure validation using `validateProjectStructure()`
- [x] Use `getAvailableModels(cwd, true)` to get models with content types
- [x] Update to new structured human-readable output format
- [x] Format output to show models with their content types

### Update Output Format
- [x] Change from simple "Found models: model1, model2" format
- [x] Update to structured format showing each model with content types:
  ```
  Found models:
  
  • model-name-1
    Content Types: Content Type A, Content Type B
  
  • model-name-2  
    Content Types: Content Type C, Content Type D
  ```
- [x] Handle empty models case: keep existing "No content models found" message
- [x] Update error message format: "Error reading models in '{cwd}': {error}"

### Testing Phase 4 Changes
- [x] Test listModels in valid project with models
- [x] Test new structured output format displays correctly
- [x] Test content types are properly displayed (Proper Case format)
- [x] Test error scenarios (missing directories, empty directories)
- [x] Verify no subprocess execution occurs
- [x] Test performance improvement over CLI execution

## Phase 5: Update Existing Tools (30 minutes) - **CLAUDE**

### Update showCurrentModel.mjs
- [x] Update import statement to get `getAvailableModels` from `userProjectReader.mjs`
- [x] Change: `import { validateProjectStructure, getAvailableModels } from "../utils/modelValidation.mjs";`
- [x] To: `import { validateProjectStructure } from "../utils/modelValidation.mjs";`
- [x] Add: `import { getAvailableModels } from "../utils/userProjectReader.mjs";`
- [x] Ensure no other changes to functionality

### Update changeCurrentModel.mjs (Indirect)
- [x] Verify `validateForModelOperation()` still works after modelValidation.mjs changes
- [x] No direct import changes needed (uses validateForModelOperation which handles the new import)
- [x] Test functionality remains unchanged

### Testing Phase 5 Changes
- [x] Test `showCurrentModel` with valid project and set model
- [x] Test `showCurrentModel` with valid project and no model set
- [x] Test `showCurrentModel` error scenarios
- [x] Test `changeCurrentModel` with valid model changes
- [x] Test `changeCurrentModel` error scenarios
- [x] Verify both tools work identically to before refactor

## Phase 6: CLI Cleanup (30 minutes) - **CLAUDE**

### Update list-templates.js CLI Command
- [x] Open `cli-commands/list-templates.js`
- [x] Remove `--json` flag completely from command line parser
- [x] Remove any JSON output logic
- [x] Ensure command returns human-readable format only
- [x] Update help text to remove `--json` flag reference

### Update list-content-models.js CLI Command
- [x] Open `cli-commands/list-content-models.js` (or similar file)
- [x] Remove `--json` flag completely from command line parser
- [x] Remove any JSON output logic
- [x] Ensure command returns human-readable format only
- [x] Update help text to remove `--json` flag reference

### Update cm.js Main CLI File
- [x] Open `cli-commands/cm.js`
- [x] Remove `--json` flag from `list-models` command definition
- [x] Remove `--json` flag from `list-templates` command definition
- [x] Update help text for both commands to remove `--json` flag references
- [x] Ensure command routing still works correctly

### Update Documentation
- [x] Update any CLI help text that mentions `--json` flag for these commands
- [x] Update command descriptions to remove JSON output references
- [x] Ensure help text is consistent and clear

### Testing Phase 6 Changes
- [x] Test `cm list-templates` command (should work without --json)
- [x] Test `cm list-models` command (should work without --json)
- [x] Verify `cm list-templates --json` now shows error (flag not recognized)
- [x] Verify `cm list-models --json` now shows error (flag not recognized)
- [x] Test CLI help text displays correctly without --json references

## Phase 7: Testing & Validation (75 minutes) - **USER**

### Comprehensive MCP Tool Testing
- [X] Test `listTemplates` MCP tool in valid CM CLI project with templates
- [X] Test `listModels` MCP tool in valid CM CLI project with models
- [X] Verify enhanced JSON output format for templates includes content types
- [X] Verify enhanced human-readable output format for models includes content types

### CamelCase to Proper Case Conversion Testing
- [X] Test `mySEO.json` converts to "My SEO"
- [X] Test `bookAuthor.json` converts to "Book Author"
- [X] Test `productCategory.json` converts to "Product Category"
- [X] Test single word files like `author.json` converts to "Author"
- [X] Test edge cases (empty files, non-standard naming)

### Error Scenario Testing
- [X] Test both tools with missing `.cmcli.json` file
- [X] Test `listTemplates` with missing `content-model-templates` directory
- [X] Test `listTemplates` with missing `content-model-templates/templates` directory
- [X] Test `listTemplates` with empty templates directory
- [X] Test `listModels` with missing `content-models` directory
- [X] Test `listModels` with missing `content-models/models` directory
- [X] Test `listModels` with empty models directory
- [X] Test both tools with templates/models that have no content-types directories
- [X] Test both tools with templates/models that have empty content-types directories

### Existing Tool Regression Testing
- [X] Test `showCurrentModel` functionality unchanged
- [X] Test `changeCurrentModel` functionality unchanged
- [X] Test `showCurrentModel` error scenarios still work
- [X] Test `changeCurrentModel` error scenarios still work
- [X] Verify context file creation and management still works
- [X] Test model validation across all tools remains consistent

### Performance Testing
- [X] Measure execution time of new `listTemplates` vs old CLI version
- [X] Measure execution time of new `listModels` vs old CLI version
- [X] Verify noticeable performance improvement (no subprocess overhead)
- [X] Test with projects containing many templates and models

### Integration Testing
- [X] Test all MCP tools together in a complete project workflow
- [X] Test switching between different models with `changeCurrentModel`
- [X] Test listing templates and models after model changes
- [X] Verify all tools maintain consistent project structure validation

### Final Validation Checklist
- [X] Both tools work without CLI dependency
- [X] Enhanced output formats include content types correctly
- [X] CamelCase to Proper Case conversion works correctly
- [X] Error messages are consistent with existing tools
- [X] Performance improvements are measurable
- [X] All existing model validation utilities remain backward compatible
- [X] `showCurrentModel` and `changeCurrentModel` tools continue to work after refactor
- [X] `getAvailableModels()` successfully moved to `userProjectReader.mjs`
- [X] Templates read from correct `content-model-templates/templates/` directory
- [X] Models continue to read from `content-models/models/` directory
- [X] CLI commands no longer support `--json` flags

## Success Criteria Verification - **USER**
- [X] **Enhanced Functionality**: Both tools now show content types for each template/model
- [X] **Performance**: Faster execution (no subprocess overhead)
- [X] **Reliability**: No dependency on CLI commands
- [X] **Consistency**: Same patterns as showCurrentModel/changeCurrentModel
- [X] **Maintainability**: Shared utilities for common operations
- [X] **Proper Formatting**: CamelCase filenames converted to readable "Proper Case" display

## Post-Implementation Cleanup - **CLAUDE**
- [x] Remove any unused imports from refactored files
- [x] Update file version numbers and last updated dates
- [x] Clean up any debug console.error statements if no longer needed
- [x] Update /cli-docs/commands/README.md -> Remove --json flags from list-models and list-templates
- [x] Update /cli-docs/release_notes.md with new version 1.0.0-beta.13 features.