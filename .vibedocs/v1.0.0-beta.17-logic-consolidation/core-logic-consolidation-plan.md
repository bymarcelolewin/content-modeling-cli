# Core Logic Consolidation Plan
## Version 1.0.0-beta.17

---

## Overview

This document outlines the consolidation of shared business logic between CLI commands and MCP server tools into a new `common/core/` directory. This represents **Beta.17** in the ongoing architectural evolution that has progressed through folder restructuring (Beta.14-16) and now advances to **logic consolidation**.

## Project Context

### Previous Architectural Evolution

**Beta.14 - Separation:**
- Separated MCP server command from CLI (`cm mcp-server` → `cm-mcp-server`)
- Initial folder restructuring (`cli-docs/` → `docs/`, etc.)

**Beta.15 - Structure:**
- Created perfect 3-tier architecture: `cli/`, `mcp-server/`, `common/`
- Achieved symmetry between CLI and MCP server entry points
- Standardized naming conventions

**Beta.16 - Sharing:**
- Moved field definitions from `cli/fields/` to `common/fields/`
- Established shared infrastructure for field functionality
- Zero breaking changes through module alias migration

### Current Mission: Beta.17 - Logic Consolidation

**Objective**: Eliminate code duplication between CLI commands and MCP tools by consolidating shared business logic into `common/core/`, enabling both interfaces to call the same underlying operations with format-specific output handling.

---

## Problem Statement

### Current Issues
1. **Code Duplication**: CLI commands and MCP tools implement identical business logic separately
2. **Maintenance Burden**: Bug fixes and feature updates must be applied in multiple locations
3. **Inconsistency Risk**: Logic can drift apart between CLI and MCP implementations
4. **Development Overhead**: New features require duplicate implementation effort

### Current Duplicate Logic Pairs

#### **Existing Duplicates:**
1. **List Models:**
   - `cli/commands/list-content-models.js` 
   - `mcp-server/tools/listModels.mjs`
   - Both discover and list content models, different output formats

2. **List Templates:**
   - `cli/commands/list-templates.js`
   - `mcp-server/tools/listTemplates.mjs`
   - Both discover and list available templates, different output formats

#### **Future Opportunities:**
3. **Get Version:**
   - `cli/index.js` (--version handling)
   - `mcp-server/tools/getVersion.mjs`
   - Both report version information, different formats

4. **Future MCP Tools** (when implemented):
   - Create Model, Delete Model, Push Model operations
   - Currently CLI-only but will need MCP equivalents

---

## Proposed Solution

### Architecture: Shared Core Logic

Create `common/core/` directory containing pure business logic functions that:
- Accept options including desired output format
- Perform the business operation (discovery, validation, etc.)
- Return formatted results based on specified format
- Are consumed by both CLI commands and MCP tools

### Target Structure

```
common/
├── docs/                    # Documentation
├── fields/                  # Field definitions (Beta.16)
├── project-template/        # CLI init templates
├── core/                    # NEW: Shared business logic
│   ├── listModelsCore.js    # Model discovery and listing logic
│   ├── listTemplatesCore.js # Template discovery and listing logic
│   ├── getVersionCore.js    # Version reporting logic
│   ├── createModelCore.js   # Model creation logic (future)
│   ├── deleteModelCore.js   # Model deletion logic (future)
│   └── pushModelCore.js     # Model pushing logic (future)
└── utilities/               # NEW: Shared utilities
    ├── userProjectReader.js # Migrated when needed by core functions
    ├── modelValidation.js   # Migrated when needed by core functions
    └── projectStructure.js  # Additional shared utilities as needed
```

### Implementation Pattern

#### **Core Logic Functions:**
```javascript
// common/core/listModelsCore.js
import { validateProjectStructure } from '@utilities/modelValidation.js';
import { getAvailableModels } from '@utilities/userProjectReader.js';

export async function listModels(options = {}) {
  const { format = 'cli', cwd = process.cwd() } = options;
  
  // Shared business logic using shared utilities
  const structureValidation = validateProjectStructure(cwd);
  if (!structureValidation.isValid) {
    throw new Error(structureValidation.error);
  }
  
  const modelsResult = getAvailableModels(cwd, true);
  if (modelsResult.error) {
    throw new Error(modelsResult.error);
  }
  
  // Format-specific output
  if (format === 'cli') {
    return formatForCLI(modelsResult.models);
  } else if (format === 'mcp') {
    return formatForMCP(modelsResult.models);
  }
}
```

#### **CLI Command Usage:**
```javascript
// cli/commands/list-content-models.js
const { listModels } = require('@core/listModelsCore.js');

async function execute() {
  const result = await listModels({ format: 'cli' });
  console.log(result.output);
}
```

#### **MCP Tool Usage:**
```javascript
// mcp-server/tools/listModels.mjs
import { listModels } from '@core/listModelsCore.js';

export async function handler() {
  const result = await listModels({ format: 'mcp' });
  return {
    content: [{ type: "text", text: result.output }]
  };
}
```

---

## Implementation Strategy

### Phase 1: Infrastructure Setup
1. **Create `common/core/` and `common/utilities/` directories**
2. **Add module aliases**: `"@core": "common/core"` and `"@utilities": "common/utilities"`
3. **Establish naming convention**: All core files use `*Core.js` suffix

### Phase 2: List Models Migration
1. **Identify required utilities**: Determine what utilities `listModels` logic needs
2. **Migrate required utilities**: Move dependencies to `common/utilities/` (keep originals)
3. **Create `common/core/listModelsCore.js`** with format support using shared utilities
4. **Update `cli/commands/list-content-models.js`** to use `listModelsCore`
5. **Update `mcp-server/tools/listModels.mjs`** to use `listModelsCore`
6. **Test both interfaces** for identical functionality

### Phase 3: List Templates Migration
1. **Identify required utilities**: Determine what utilities `listTemplates` logic needs
2. **Migrate additional utilities**: Move new dependencies to `common/utilities/`
3. **Create `common/core/listTemplatesCore.js`** with format support
4. **Update CLI and MCP implementations** to use `listTemplatesCore`
5. **Validate consistent behavior** across interfaces

### Phase 4: Version Reporting Migration
1. **Extract version logic** from CLI and MCP implementations
2. **Create `common/core/getVersionCore.js`** with format support
3. **Update both interfaces** to use shared version logic

### Phase 5: Testing & Validation
1. **Comprehensive regression testing** of all migrated functionality
2. **Performance validation** to ensure no degradation
3. **Error handling verification** across all scenarios
4. **Utility dependency validation** to ensure proper migration

### Phase 6: Gradual Cleanup (Future)
1. **Remove duplicate utilities** when no longer referenced by original locations
2. **Consolidate utility functions** as more core functions are migrated
3. **Clean up unused imports** and dependencies

---

## Module Alias Configuration

### Package.json Update Required
```json
"_moduleAliases": {
  "@fields": "common/fields",
  "@core": "common/core",           ← NEW
  "@utilities": "common/utilities", ← NEW
  "@expand": "cli/utilities/expand-components.js",
  "@validateRegistry": "cli/utilities/validate-field-registry.js",
  "@resolve-emoji": "cli/utilities/resolve-emoji.js",
  "@resolve-cma": "cli/utilities/resolve-cma.js",
  "@loadProjectRoot": "cli/utilities/load-project-root.js",
  "@validateFieldIds": "cli/utilities/validate-field-ids.js"
}
```

---

## Benefits Analysis

### Immediate Benefits
- **DRY Principle**: Single source of truth for business logic
- **Reduced Maintenance**: Fix bugs once, benefit everywhere
- **Consistency Guarantee**: Identical behavior between CLI and MCP
- **Testing Efficiency**: Test core logic once with different format options
- **Clear Naming Convention**: `*Core.js` files instantly recognizable as business logic
- **Incremental Migration**: Utilities can be migrated gradually without breaking existing code

### Long-term Benefits
- **Faster MCP Tool Development**: Core logic already exists for new tools
- **API Consistency**: Same data structures and validation across interfaces
- **Shared Validation**: Common error handling and validation logic
- **Easier Refactoring**: Changes to business logic affect all consumers automatically
- **Utility Consolidation**: Shared utilities eliminate duplication across CLI/MCP
- **Safe Migration Path**: Original utilities remain until fully replaced

### Architectural Benefits
- **Clean Separation**: Interface logic vs business logic clearly separated
- **Professional Structure**: Industry-standard pattern for shared libraries
- **Extensibility**: Easy to add new output formats (JSON API, GraphQL, etc.)
- **Testability**: Business logic can be unit tested independently
- **Dependency Tracking**: Clear visibility into what utilities are shared vs local
- **Rollback Safety**: Can revert individual migrations without affecting others

---

## Risk Assessment

### Risk Level: **MEDIUM-LOW**

#### Mitigation Factors
- ✅ **Proven Pattern**: Module aliases successfully used in Beta.16
- ✅ **Incremental Approach**: Migrate one function at a time
- ✅ **Extensive Testing**: Validate each migration thoroughly
- ✅ **Reversible**: Can rollback individual migrations if needed

#### Potential Challenges
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Format inconsistencies | Medium | Comprehensive test matrix for all formats |
| Performance impact | Low | Profile critical paths during migration |
| Import/export issues | Low | Use same patterns as successful field migration |
| Logic extraction complexity | Medium | Start with simpler functions (listModels, listTemplates) |

---

## Success Criteria

### Technical Validation
✅ All shared business logic moved to `common/core/`  
✅ Both CLI and MCP interfaces use core logic exclusively  
✅ Identical functional behavior between old and new implementations  
✅ No performance degradation in any interface  
✅ All error handling preserved and consistent  
✅ Module alias resolution working correctly  

### Quality Assurance
✅ Zero breaking changes for end users  
✅ Identical command output and behavior  
✅ All regression tests passing  
✅ New unit tests for core logic functions  
✅ Documentation updated with new architecture  

### Architectural Goals
✅ Clean separation between interface and business logic  
✅ DRY principle implemented across CLI and MCP  
✅ Foundation established for future MCP tools  
✅ Professional code organization maintained  

---

## Testing Strategy

### Unit Testing
- **Core Logic Functions**: Test business logic independently
- **Format Output**: Validate CLI and MCP format consistency
- **Error Scenarios**: Ensure graceful error handling

### Integration Testing
- **CLI Interface**: All existing commands work identically
- **MCP Interface**: All tools maintain MCP protocol compliance
- **Cross-Interface**: Same inputs produce equivalent outputs

### Regression Testing
- **Full CLI Suite**: Every command works as before
- **MCP Protocol**: All tools respond correctly to MCP requests
- **Performance**: No degradation in response times

---

## Implementation Timeline

**Estimated Duration**: 3-4 hours total

- **Phase 1 (Infrastructure)**: 30 minutes
- **Phase 2 (List Models)**: 60 minutes  
- **Phase 3 (List Templates)**: 45 minutes
- **Phase 4 (Version Reporting)**: 45 minutes
- **Phase 5 (Testing)**: 60 minutes

---

## Future Expansion Opportunities

### Additional Core Operations
- **Model Creation**: Shared logic for `create-content-model` and future MCP tool via `createModelCore.js`
- **Model Deletion**: Shared logic for `delete-content-model` and future MCP tool via `deleteModelCore.js`
- **Model Pushing**: Shared logic for `push-content-model` and future MCP tool via `pushModelCore.js`
- **Project Initialization**: Shared logic for `init` command and potential MCP tool via `initProjectCore.js`

### Output Format Extensions
- **JSON API**: Structured JSON output for API consumption
- **GraphQL**: Schema-based output format
- **YAML**: Human-readable structured output
- **CSV**: Tabular data export format

### Validation Enhancements
- **Schema Validation**: Shared validation schemas
- **Business Rules**: Centralized business rule enforcement
- **Error Standardization**: Consistent error codes and messages

---

## Context for Future Implementation

### Key Architectural Decisions
1. **Folder Names**: `common/core/` chosen over `common/lib/` for semantic clarity, `common/utilities/` for shared utilities
2. **Module Aliases**: `@core` and `@utilities` provide clean import paths
3. **Naming Convention**: All core files use `*Core.js` suffix for instant recognition
4. **Format Parameter**: Functions accept format option for output control
5. **Incremental Migration**: Start with simple list operations, expand gradually
6. **Utility Migration Strategy**: Keep original utilities during transition, migrate as needed

### Critical Implementation Notes
- **Preserve Exact Functionality**: No behavior changes during migration
- **Format Consistency**: CLI and MCP outputs must remain identical to current
- **Error Handling**: Maintain all existing error scenarios and messages
- **Performance**: Profile before/after to ensure no degradation
- **Naming Convention**: All core files must use `*Core.js` suffix consistently
- **Utility Migration**: Migrate utilities to `common/utilities/` only when needed by core functions
- **Keep Originals**: Maintain existing utilities in original locations during transition
- **Module Aliases**: Use `@utilities` (not `@commonUtils`) for consistency with `@core`

### Success Pattern from Beta.16
- Module aliases enable zero-code-change migrations
- Comprehensive testing catches all edge cases
- Real-time checklist updates track progress effectively
- User validation confirms production readiness

---

## Next Steps After Beta.16 Production Push

1. **Start Beta.17 Implementation**: Create detailed implementation checklist
2. **Infrastructure Setup**: Create `common/core/` and `common/utilities/` directories, add module aliases
3. **Begin with List Models**: 
   - Identify and migrate required utilities to `common/utilities/`
   - Extract and migrate listModels logic to `listModelsCore.js`
   - Update CLI and MCP to use core logic
4. **Iterate Through Functions**: Complete `listTemplatesCore.js`, then `getVersionCore.js`
5. **Comprehensive Testing**: Validate all interfaces before release
6. **Future Planning**: Establish patterns for `createModelCore.js`, `deleteModelCore.js`, etc.

---

**Document Version**: 1.0  
**Created**: 2025-06-19  
**Status**: Ready for Implementation After Beta.16 Production Push  
**Next Phase**: Create implementation checklist and begin core logic extraction

**Architecture Evolution**: Beta.14 (Separation) → Beta.15 (Structure) → Beta.16 (Sharing) → **Beta.17 (Logic Consolidation)** ✨