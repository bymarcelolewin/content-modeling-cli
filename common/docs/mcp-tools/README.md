# MCP Server Tools
[<- Back to Documentation](../README.md)

## Starting the MCP Server

To use these tools, start the MCP server:

```bash
cm-mcp-server --project-path /path/to/your/project
```

The server exposes all tools below via the Model Context Protocol.

## Available Tools

These are the latest supported tools in the Content Modeling MCP Server and CLI.  Make sure you have the latest version installed. If some of these tools are missing, you may be running in an older version.

| Category                 | Tool                 | Description                                                            |
| ------------------------ | -------------------- | ---------------------------------------------------------------------- |
| Project Management       | `showProjectPath`    | Display the current working directory path                             |
| Project Management       | `changeProjectPath`  | Switch to a different project directory                                |
| Content Model Operations | `listModels`         | Show all content models in the current project                         |
| Content Model Operations | `showCurrentModel`   | Display the currently selected content model                           |
| Content Model Operations | `changeCurrentModel` | Change the currently selected content model                            |
| Template Operations      | `listTemplates`      | Display all available templates with their locations and content types |
| System Information       | `getVersion`         | Get the version information of the CLI tool                            |


---
<br>

[<- Back to Documentation](../README.md)
