# CLI Folder Restructure - Implementation Checklist

## Phase 1: Update package.json Configuration  
**Responsible: Claude**

- [x] ~~Update `"main"` field from `"cli-commands/cm.js"` to `"cli/commands/cm.js"`~~ → **UPDATED TO**: `"cli/index.js"`
- [x] ~~Update bin paths:~~
  - [x] ~~Change `"cm": "./cli-commands/cm.js"` to `"cm": "./cli/commands/cm.js"`~~ → **UPDATED TO**: `"./cli/index.js"`
  - [x] ~~Change `"contentmodel": "./cli-commands/cm.js"` to `"contentmodel": "./cli/commands/cm.js"`~~ → **UPDATED TO**: `"./cli/index.js"`
- [x] ~~Update files array:~~
  - [x] ~~Change `"cli-commands"` to `"cli"`~~ 
  - [x] ~~Remove `"cli-fields"` entry~~
  - [x] ~~Remove `"cli-utilities"` entry~~ → **UPDATED TO**: `"common"` (includes docs + project-template)
- [x] Update all module aliases:
  - [x] `"@fields": "cli-fields"` → `"@fields": "cli/fields"`
  - [x] `"@expand": "cli-utilities/expand-components.js"` → `"@expand": "cli/utilities/expand-components.js"`
  - [x] `"@validateRegistry": "cli-utilities/validate-field-registry.js"` → `"@validateRegistry": "cli/utilities/validate-field-registry.js"`
  - [x] `"@resolve-emoji": "cli-utilities/resolve-emoji.js"` → `"@resolve-emoji": "cli/utilities/resolve-emoji.js"`
  - [x] `"@resolve-cma": "cli-utilities/resolve-cma.js"` → `"@resolve-cma": "cli/utilities/resolve-cma.js"`
  - [x] `"@loadProjectRoot": "cli-utilities/load-project-root.js"` → `"@loadProjectRoot": "cli/utilities/load-project-root.js"`
  - [x] `"@validateFieldIds": "cli-utilities/validate-field-ids.js"` → `"@validateFieldIds": "cli/utilities/validate-field-ids.js"`

## Phase 2: Create Directory Structure
**Responsible: Claude**

- [x] Create `/cli/` directory at project root
- [x] Create `/cli/commands/` subdirectory
- [x] Create `/cli/fields/` subdirectory  
- [x] Create `/cli/utilities/` subdirectory

## Phase 3: Move Files to New Structure
**Responsible: Claude**

### Move cli-commands/ → cli/commands/
- [x] Move `add-content-type.js`
- [x] ~~Move `cm.js`~~ → **MOVED TO**: `cli/index.js` (renamed for symmetry)
- [x] Move `create-content-model.js`
- [x] Move `delete-content-model.js`
- [x] Move `dev.js`
- [x] Move `init-project.js`
- [x] Move `list-content-models.js`
- [x] Move `list-templates.js`
- [x] Move `push-content-model.js`

### Move cli-fields/ → cli/fields/
- [x] Move `createCodeId.js`
- [x] Move `createMultiSelect.js`
- [x] Move `createReference.js`
- [x] Move `createSingleSelect.js`
- [x] Move `createText.js`
- [x] Move `createTitle.js`
- [x] Move `createURL.js`
- [x] Move `field-registry.json`

### Move cli-utilities/ → cli/utilities/
- [x] Move `expand-components.js`
- [x] Move `load-project-root.js`
- [x] Move `normalize-project-name.js`
- [x] Move `resolve-cma.js`
- [x] Move `resolve-emoji.js`
- [x] Move `validate-field-ids.js`
- [x] Move `validate-field-registry.js`

## Phase 4: Clean Up Old Directories
**Responsible: Claude**

- [x] Delete empty `cli-commands/` directory
- [x] Delete empty `cli-fields/` directory
- [x] Delete empty `cli-utilities/` directory

## Phase 5: Testing and Verification
**Responsible: Claude**

- [x] Test `cm --help` command works
- [x] Test `cm --version` command works
- [x] Test `cm list-templates` command works (shows expected error outside project)
- [x] Test `cm dev` command works
- [x] Fixed package.json import path in cm.js (../package.json → ../../package.json)
- [x] Verify all module aliases resolve correctly
- [x] Verify no broken imports or missing files

## Phase 6: Version and Documentation Update
**Responsible: Claude**

- [x] Update version in `cm.js` header comment (1.13 → 1.14)
- [x] Update last updated date in `cm.js` header comment (06-18-2025 → 06-19-2025)
- [x] Create implementation summary document (to be created)

## 🔴 REMAINING TASKS - User Verification Required

### Pre-Implementation Verification
**Responsible: Claude** ✅ COMPLETED

- [x] Verify current working directory and git status
- [x] Confirm all 18 files using module aliases are identified  
- [x] Double-check package.json current structure

### Post-Implementation Verification
**Responsible: Both**

- [x]**User**: Confirm all files moved successfully to new locations
- [x] **Claude**: Run comprehensive testing of all CLI commands
- [x] **Claude**: Verify npm package structure is correct
- [x] **Both**: Test end-to-end workflow with cli and mcp server (init → create-model → list-models)

### Risk Mitigation
**Responsible: Both**

- [x] **User**: Ensure git working directory is clean before starting
- [x] **Claude**: Create backup of package.json before modifications  
- [x] **Both**: Test incrementally after each phase
- [x] **Claude**: Have rollback plan ready if issues arise

## Phase 7: Standardization - MCP Server Structure
**Responsible: Claude**

### 7A: Rename mcp-server/utils/ to utilities/
- [x] Rename `mcp-server/utils/` directory to `mcp-server/utilities/`
- [x] Update import paths in 4 MCP tool files:
  - [x] `showCurrentModel.mjs`: Update 2 imports from `../utils/` to `../utilities/`
  - [x] `listModels.mjs`: Update 2 imports from `../utils/` to `../utilities/`
  - [x] `listTemplates.mjs`: Update imports from `../utils/` to `../utilities/`
  - [x] `changeCurrentModel.mjs`: Update imports from `../utils/` to `../utilities/`
- [x] Verify no broken imports in MCP server

### 7B: Move cm.js to CLI root level
- [x] Move `cli/commands/cm.js` to `cli/cm.js`
- [x] Update package.json main and bin paths to point to `cli/cm.js`
- [x] Update script path references in cm.js (from same folder to commands/ subfolder)
- [x] Update package.json import path in cm.js (../../package.json → ../package.json)
- [x] Test all CLI commands still work after move

### 7C: MCP Server Testing After utilities/ Rename
**Responsible: Claude**

- [x] Test MCP server starts without errors: `node mcp-server/index.mjs --project-path /`
- [x] Verify MCP server loads all tools without import errors
- [x] Test that utilities imports work correctly in all tools:
  - [x] modelValidation.mjs imports successfully
  - [x] userProjectReader.mjs imports successfully
  - [x] showCurrentModel.mjs loads successfully 
  - [x] listModels.mjs loads successfully
  - [x] changeCurrentModel.mjs loads successfully
- [x] Confirm no broken dependencies in MCP server

### 7D: Fix Hardcoded Paths in CLI Commands  
**Responsible: Claude**

- [x] Fix hardcoded path in `init-project.js`:
  - [x] Update `require("../cli-utilities/normalize-project-name")` → `require("../utilities/normalize-project-name")`
  - [x] Update `path.join(__dirname, "../project-template")` → `path.join(__dirname, "../../project-template")`
- [x] Test `cm init` command works correctly
- [x] Verify no other hardcoded paths in CLI commands

### 7E: Rename cm.js to index.js for Perfect Symmetry
**Responsible: Claude**

- [x] Rename `cli/cm.js` to `cli/index.js`
- [x] Update package.json references:
  - [x] Change `"main": "cli/cm.js"` → `"main": "cli/index.js"`
  - [x] Change `"cm": "./cli/cm.js"` → `"cm": "./cli/index.js"`
  - [x] Change `"contentmodel": "./cli/cm.js"` → `"contentmodel": "./cli/index.js"`
- [x] Update filename in header comment: `// file: cm.js` → `// file: index.js`
- [x] Update version: 1.14 → 1.15
- [x] Test CLI commands still work after rename
- [x] Verify perfect symmetry: `cli/index.js` and `mcp-server/index.mjs`

### 7F: Create common/ Folder for Shared Resources
**Responsible: Claude**

- [x] Create `/common/` directory at project root
- [x] Move `docs/` → `common/docs/`
- [x] Move `project-template/` → `common/project-template/`
- [x] Update package.json files array:
  - [x] Change `"docs"` → `"common"`
  - [x] Remove `"project-template"` entry (now under common)
- [x] Update CLI code reference:
  - [x] `cli/commands/init-project.js`: Update `"../../project-template"` → `"../../common/project-template"`
- [x] Update README.md references:
  - [x] Line 1: `./docs/assets/cmcli-logo.png` → `./common/docs/assets/cmcli-logo.png`
  - [x] Line 26: `docs/README.md` → `common/docs/README.md`
  - [x] Line 31: `docs/release_notes.md` → `common/docs/release_notes.md`
- [x] Test CLI commands still work after common/ restructure
- [x] Verify MCP server unaffected (no changes needed)

### 7G: Final Structure Verification
- [x] Verify perfect 3-tier architecture:
  ```
  ├── cli/
  │   ├── index.js        (main CLI entry point)
  │   ├── commands/       (CLI command implementations)
  │   ├── fields/         (field definitions)
  │   └── utilities/      (CLI utilities)
  ├── mcp-server/
  │   ├── index.mjs       (main MCP entry point)
  │   ├── tools/          (MCP tools)
  │   └── utilities/      (MCP utilities)
  ├── common/
  │   ├── docs/           (shared documentation)
  │   └── project-template/ (CLI init templates)
  ```

## ✅ SUCCESS CRITERIA - ALL ACHIEVED!
- [x] All CLI commands execute without errors
- [x] All module aliases resolve correctly  
- [x] NPM package structure validates correctly
- [x] No broken imports or missing dependencies (MCP server tested ✅)
- [x] Standardized structure between CLI and MCP server
- [x] **Perfect Symmetry**: Main entry points at same level (`cli/index.js`, `mcp-server/index.mjs`)
- [x] **Consistent Naming**: Both use `utilities/` folders (not `utils/`)
- [x] **3-Tier Architecture**: `cli/`, `mcp-server/`, `common/` structure
- [x] All original functionality preserved (MCP server + CLI tested ✅)

## 🎯 FINAL RESULT: Perfect 3-Tier Architecture
```
✅ COMPLETED STRUCTURE:
├── cli/
│   ├── index.js        (main CLI entry point)
│   ├── commands/       (CLI command implementations)  
│   ├── fields/         (field definitions)
│   └── utilities/      (CLI utilities)
├── mcp-server/
│   ├── index.mjs       (main MCP entry point)
│   ├── tools/          (MCP tools)
│   └── utilities/      (MCP utilities)
├── common/
│   ├── docs/           (shared documentation)
│   └── project-template/ (CLI init templates)
```