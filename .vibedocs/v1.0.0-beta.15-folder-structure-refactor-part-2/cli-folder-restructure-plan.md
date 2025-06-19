# Content Modeling CLI - Create /cli Folder Structure

## Overview
Create a new `/cli/` folder at root level and move the three CLI-related folders into it, removing their `cli-` prefixes.

## Proposed Structure Change
```
BEFORE:
├── cli-commands/          
├── cli-fields/           
├── cli-utilities/        

AFTER:
├── cli/
│   ├── commands/         (was cli-commands)
│   ├── fields/           (was cli-fields)  
│   └── utilities/        (was cli-utilities)
```

## Files Requiring Updates

### 1. package.json Changes
- **Line 5**: `"main": "cli-commands/cm.js"` → `"main": "cli/commands/cm.js"`
- **Lines 7-8**: Update bin paths:
  - `"cm": "./cli-commands/cm.js"` → `"cm": "./cli/commands/cm.js"`
  - `"contentmodel": "./cli-commands/cm.js"` → `"cm": "./cli/commands/cm.js"`
- **Lines 12-14**: Update files array:
  - `"cli-commands"` → `"cli"`
  - Remove `"cli-fields"` and `"cli-utilities"` (now under cli/)
- **Lines 64-70**: Update all module aliases:
  - `"@fields": "cli-fields"` → `"@fields": "cli/fields"`
  - `"@expand": "cli-utilities/expand-components.js"` → `"@expand": "cli/utilities/expand-components.js"`
  - All other `cli-utilities/` → `cli/utilities/`

### 2. cm.js Script Path Updates
All `path.join(__dirname, 'script.js')` calls need updating since cm.js moves from `/cli-commands/` to `/cli/commands/`:
- `init-project.js` → `init-project.js` (same folder)
- `create-content-model.js` → `create-content-model.js` (same folder)
- `push-content-model.js` → `push-content-model.js` (same folder)
- All other script references (8 total files)

### 3. Files Using Module Aliases
18 files use the module aliases and will automatically work with updated aliases:
- All createField functions in fields/
- CLI commands using utilities
- Utility files cross-referencing each other

### 4. Directory Operations
1. Create `/cli/` folder
2. Move and rename:
   - `cli-commands/` → `cli/commands/`
   - `cli-fields/` → `cli/fields/`
   - `cli-utilities/` → `cli/utilities/`

## Implementation Phases
1. **Update package.json** - Module aliases and file references
2. **Create directory structure** - Move and rename folders
3. **Verify functionality** - Test CLI commands and imports
4. **Update version** - Bump to reflect structural change

## Benefits
- **Cleaner root directory** - Groups all CLI functionality
- **Logical organization** - Related components under single namespace
- **Simplified naming** - Removes redundant `cli-` prefixes
- **Better separation** - Clear distinction from mcp-server/