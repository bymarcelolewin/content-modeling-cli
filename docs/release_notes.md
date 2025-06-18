# 🖥️ Content Modeling MCP Server and CLI Release Notes

---

## Version 1.0.0-beta.14 – *Stand Alone Tools + Folder Structure Restructure - Part 1*

### 🚨 Breaking Changes
- **MCP Server Command Change:** The MCP server now runs independently with `cm-mcp-server` instead of `cm mcp-server`
- **Claude Configuration Update Required:** Users must update their `claude_desktop_config.json` file

### Migration Guide

#### Before (Beta.13)
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

#### After (Beta.14) 
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

### ⚡ Enhancements
- **Cleaner Architecture:** MCP server now runs independently from CLI commands
- **Better Separation:** Clear distinction between CLI and MCP server functionality  
- **Faster Startup:** Direct execution without intermediate CLI process
- **Simplified Maintenance:** No command proxying through CLI layer
- **Enhanced getVersion Tool:** Disconnected it from the CLI layer and it works on its own.  Provides richer information including tool name, description and version.
- **Cleaner Architecture:** Renamed the following folders: `cli-docs` to `docs` and `cli-project-template` to `project-template`.

### 🧹 Cleanup
- Removed `mcp-server` command from `cm` CLI - no longer available as `cm mcp-server`
- Updated all documentation to reflect new command structure
<br><br>

---

## Version 1.0.0-beta.13 – *Standalone MCP Tools & Tool Rename*

### 🆕 New Features
- Renamed Content Modeling CLI to Content Modeling MCP Server and CLI.

### ⚡ Enhancements  
- Refactored `listTemplates` and `listModels` MCP tools to read the filesystem directly instead of calling CLI commands, resulting in significantly faster execution with no subprocess overhead.  
- Both tools now display enhanced content types information with improved formatting.  
- `listModels` now outputs structured, human-readable content type listings for each model.  
- `listTemplates` now returns enriched JSON output, including content types for each template.  
- Removed `--json` flags from `cm list-templates` and `cm list-models` CLI commands—no longer required due to tool independence.  
- Consolidated project-reading utilities into `userProjectReader.mjs` for better code organization and reusability.  
- Improved separation of concerns—MCP tools now rely solely on dedicated filesystem utilities instead of CLI subprocesses.
<br><br>

## Version 1.0.0-beta.12 – *New MCP Tools*

### 🆕 New Features  
- Added new MCP tools: `changeCurrentModel` and `showCurrentModel`.  
  See [documentation](./tutorials/mcp-server-claude-setup/README.md) for more details.

### ⚡ Enhancements
- Refactored MCP tools to share validation utilities, improving integration and performance.
<br><br>

## Version 1.0.0-beta.11 – *MCP Server*

### 🆕 New Features
- Introduced MCP Server support: run `cm-mcp-server` to use the CLI with Claude, Postman, or other MCP clients.  
  See [documentation](./tutorials/mcp-server-claude-setup/README.md) for setup.  
- Implemented new MCP tools: `showProjectPath`, `changeProjectPath`, `getVersion`, `listModels`, and `listTemplates`.

### ⚡ Enhancements
- Added `--json` flag to `list-models` and `list-templates` for machine-readable output via MCP.  
- Updated [documentation](./README.md) to reflect new features.

### 🐞 Bug Fixes
- Minor bug fixes throughout.