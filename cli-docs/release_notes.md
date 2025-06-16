# 🖥️ Content Modeling CLI Release Notes

### Version 1.0.0-beta.11 – *MCP Server*
- 🆕 **New Feature:** The CLI is now accessible as an MCP server.  You can start the MCP server in the terminal using `cm mcp-server` or via any MCP client such as Claude, Postman, etc.  See [documentation](./tutorials/mcp-server-calude-setup/README.md) for further details.
- 🆕 **New Feature:** Implemented the following MCP tools, changeProjectPath, getVersion, listModels, listTemplates, showProjectPath. More coming soon! See See [documentation](./tutorials/mcp-server-calude-setup/README.md) for further details.
- ⚡ **Enhancement:** `list-models` and `list-templates` now accept `--json` flag to return the output in json format (for the MCP client).
- ⚡ **Enhancement:** Updated [documentation](./README.md) to reflect new features.
- 🐞 **Bug Fix:** Minor bug fixes throughout.
