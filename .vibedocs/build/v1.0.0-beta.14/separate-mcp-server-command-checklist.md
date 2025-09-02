# Separate MCP Server Command - Implementation Checklist

## Phase 1: Fix Directory Typo
**Responsible:** Claude

- [x] Rename directory `docs/tutorials/mcp-server-calude-setup/` to `docs/tutorials/mcp-server-claude-setup/`
- [x] Update path reference in `/docs/README.md` (Line 14)
- [x] Update path references in `/docs/release_notes.md` (Lines 24, 34)
- [x] Verify all files in renamed directory are intact

## Phase 2: Update Documentation
**Responsible:** Claude

### Commands Documentation
- [x] Remove `cm mcp-server` entry from `/docs/commands/README.md` (Line 13) - no longer a cm command

### MCP Server Documentation
- [x] Add "Starting the MCP Server" section to `/docs/mcp-tools/README.md` with `cm-mcp-server` command and usage
- [x] Update `/docs/tutorials/mcp-server-claude-setup/README.md` with new server startup instructions

### Claude Configuration Tutorial
- [x] Update `/docs/tutorials/mcp-server-claude-setup/configure-claude.md` (Lines 23 & 32):
  - [x] Change `"command": "cm"` to `"command": "cm-mcp-server"`
  - [x] Change `"args": ["mcp-server", "--project-path", "/"]` to `"args": ["--project-path", "/"]`
- [x] Add "Migration from Beta.13" section at top of configure-claude.md with:
  - [x] Before/after configuration examples
  - [x] Clear migration instructions
  - [x] Breaking change warning

### Release Notes Updates
- [x] Update existing reference in `/docs/release_notes.md` (Line 33): Change `run cm mcp-server` to `run cm-mcp-server`
- [x] Add new Beta.14 section to `/docs/release_notes.md` with:
  - [x] Breaking change notice
  - [x] Migration guide with before/after examples
  - [x] Benefits of the change
  - [x] Clear instructions for users

## Phase 3: Remove CLI Command
**Responsible:** Claude

- [x] Remove entire `mcp-server` command from `/cli-commands/cm.js` (Lines 164-186)
- [x] Remove unused `pathToFileURL` import from `/cli-commands/cm.js`
- [x] Update version number in `/cli-commands/cm.js` header (1.12 → 1.13)
- [x] Update last updated date in `/cli-commands/cm.js` header
- [x] Verify cm.js still runs without errors after removal

## Phase 4: Testing & Verification
**Responsible:** User (with Claude support)

### CLI Testing
- [x] Run `cm --help` and verify `mcp-server` command no longer appears
- [x] Verify other `cm` commands still work correctly (`cm list-templates` shows expected behavior)
- [x] Test that `cm mcp-server` now returns command not found error

### MCP Server Testing  
- [x] Test `cm-mcp-server --help` command works independently
- [x] Test `cm-mcp-server --project-path /path/to/project` starts correctly (empty output = waiting for JSON-RPC)
- [x] Verify MCP server starts without errors (empty response is expected behavior)

### Claude Configuration Testing
- [ ] Update Claude configuration to use new command format
- [ ] Test MCP connection works with `cm-mcp-server` command
- [ ] Verify all MCP tools function correctly through Claude

## Post-Implementation Review
**Responsible:** User & Claude

- [x] Review all documentation changes for accuracy
- [x] Confirm migration instructions are clear and complete
- [ ] Test complete user workflow from scratch
- [x] Mark all checklist items as completed
- [ ] Document any issues or additional changes needed

## Files Modified Summary
**For final verification:**

### Code Changes
- [x] `/cli-commands/cm.js` - Removed mcp-server command + unused import, updated version

### Documentation Changes  
- [x] `/docs/commands/README.md` - Removed mcp-server command entry
- [x] `/docs/mcp-tools/README.md` - Added "Starting the MCP Server" section
- [x] `/docs/tutorials/mcp-server-claude-setup/README.md` - Added server startup instructions
- [x] `/docs/tutorials/mcp-server-claude-setup/configure-claude.md` - Updated config examples + migration section
- [x] `/docs/release_notes.md` - Updated existing reference + new Beta.14 section
- [x] `/docs/README.md` - Updated tutorial directory path reference

### Directory Changes
- [x] Renamed `/docs/tutorials/mcp-server-calude-setup/` to `/docs/tutorials/mcp-server-claude-setup/`

---

**Total Items:** 25 checklist items
**Estimated Completion Time:** 70 minutes
**Breaking Change:** Yes - requires user migration