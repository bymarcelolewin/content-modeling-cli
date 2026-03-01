# Separate MCP Server Command - Implementation Plan

## Overview
Remove `mcp-server` command from `cm.js` CLI and have users call `cm-mcp-server` directly. This creates better separation between CLI and MCP server functionality.

## Current vs Proposed Commands

### Current
```bash
cm mcp-server --project-path /path/to/project
```

### Proposed  
```bash
cm-mcp-server --project-path /path/to/project
```

## Files Requiring Updates

### 1. CLI Implementation
**File:** `/cli-commands/cm.js`
- **Lines 164-186:** Remove entire `mcp-server` command definition
- **Impact:** Users can no longer call `cm mcp-server`

### 2. Documentation Updates

#### A. Commands Documentation  
**File:** `/docs/commands/README.md`
- **Line 13:** Change `cm mcp-server` to `cm-mcp-server` in command table

#### B. Claude Configuration Tutorial
**File:** `/docs/tutorials/mcp-server-claude-setup/configure-claude.md` (after directory rename)
- **Lines 23 & 32:** Update Claude config examples:
  - Change `"args": ["mcp-server", "--project-path", "/"]` 
  - To `"args": ["--project-path", "/"]`
  - Change `"command": "cm"` to `"command": "cm-mcp-server"`
- **Add Migration Section:** Add "Migration from Beta.13" section at top with before/after configuration examples

#### C. Release Notes
**File:** `/docs/release_notes.md`  
- **Line 33:** Change `run cm mcp-server` to `run cm-mcp-server`
- **Add Beta.14 Section:** Create new release section with migration guide including before/after configuration examples

### 3. Directory Rename (Fix Typo)
**Current:** `/docs/tutorials/mcp-server-calude-setup/`
**Proposed:** `/docs/tutorials/mcp-server-claude-setup/`

**Files with path references to update:**
- `/docs/README.md` (Line 14)
- `/docs/release_notes.md` (Lines 24, 34)

## Implementation Phases

### Phase 1: Fix Directory Typo
1. Rename `mcp-server-calude-setup/` to `mcp-server-claude-setup/`
2. Update all documentation path references

### Phase 2: Update Documentation  
1. Update commands documentation table
2. Update Claude configuration examples
3. Update release notes
4. Update any tutorial path references

### Phase 3: Remove CLI Command
1. Remove `mcp-server` command from `cm.js`
2. Update version number and last updated date

### Phase 4: Add Migration Documentation
1. Add Beta.14 section to release notes with breaking change notice and migration guide
2. Add "Migration from Beta.13" section to Claude configuration tutorial
3. Include before/after configuration examples in both locations

## Testing Requirements
1. Verify `cm-mcp-server` binary works independently
2. Test `--project-path` argument still functions
3. Verify Claude MCP configuration works with new command
4. Confirm `cm --help` no longer shows mcp-server command

## Breaking Change Notice
This is a **breaking change** for users who:
- Use `cm mcp-server` command directly
- Have Claude configurations using the old command structure

## Migration Guide for Users

### Before (Beta.13)
```json
{
  "mcpServers": {
    "cmcli": {
      "command": "cm",
      "args": ["mcp-server", "--project-path", "/"]
    }
  }
}
```

### After (Beta.14)
```json
{
  "mcpServers": {
    "cmcli": {
      "command": "cm-mcp-server", 
      "args": ["--project-path", "/"]
    }
  }
}
```

## Benefits
- **Cleaner Architecture:** MCP server runs independently of CLI
- **Better Separation:** Clear distinction between CLI and MCP functionality  
- **Simplified Maintenance:** No need to proxy commands through CLI
- **Direct Execution:** Faster startup, no intermediate process

## Risk Assessment
- **Medium Risk:** Breaking change requiring user configuration updates
- **Documentation Heavy:** Multiple files need updates
- **User Impact:** All MCP users must update their configurations

## Estimated Timeline
- Phase 1 (Directory Fix): 15 minutes
- Phase 2 (Documentation): 30 minutes  
- Phase 3 (CLI Removal): 10 minutes
- Phase 4 (Release Notes): 15 minutes
- **Total:** ~70 minutes