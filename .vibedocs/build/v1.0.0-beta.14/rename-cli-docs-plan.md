# Rename cli-docs to docs - Implementation Plan

## Overview
Rename the `cli-docs/` directory to `docs/` to simplify the folder structure and follow common convention.

## Files Affected

### 1. Package.json
**File:** `/package.json`
- **Line 13:** Change `"cli-docs"` to `"docs"` in the files array

### 2. README.md  
**File:** `/README.md`
- **Line 1:** Change `./cli-docs/assets/cmcli-logo.png` to `./docs/assets/cmcli-logo.png`
- **Line 26:** Change `cli-docs/README.md` to `docs/README.md`
- **Line 31:** Change `cli-docs/release_notes.md` to `docs/release_notes.md`

### 3. Directory Structure
**Action:** Rename the actual directory from `cli-docs/` to `docs/`

## Implementation Steps

### Phase 1: Update References
1. Update package.json files array
2. Update README.md documentation links
3. Update README.md logo path

### Phase 2: Rename Directory
1. Rename `cli-docs/` directory to `docs/`

### Phase 3: Verification
1. Verify all links work correctly
2. Test that package.json files array includes correct directory
3. Confirm logo displays properly

## Risk Assessment
- **Low Risk:** Only 2 files contain references to cli-docs
- **No Breaking Changes:** No code imports or dependencies on this directory
- **Simple Refactor:** Straightforward path updates

## Files Not Affected
- All CLI command files
- All MCP server files  
- All utility files
- All template files
- Configuration files (other than package.json)

## Timeline
Estimated completion: 10 minutes