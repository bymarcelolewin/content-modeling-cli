# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a dual-purpose Content Modeling CLI and MCP Server for Contentful. It allows users to define, template, and manage Contentful content models using structured JSON files with built-in validation, component reuse, and emoji support.

**Key Architecture:**
- **CLI Tool**: Command-line interface for content modeling operations
- **MCP Server**: Model Context Protocol server for AI assistant integration
- **Project-based**: Each project requires a `.cmcli.json` config file at root
- **Template System**: Reusable content model templates
- **Field Registry**: Centralized field type definitions with validation
- **Component System**: Reusable field components and emoji library

## Essential Commands

### CLI Commands
```bash
# Initialize new project
cm init --name "Project Name" [--git]

# Create content model from template
cm create-model --template simple-blog --model my-blog

# Push model to Contentful (dry run by default)
cm push-model --model my-blog [--force]

# Add content type to existing model
cm add-content-type --model my-blog --name "Blog Post"

# Delete model from Contentful (dry run by default)
cm delete-model --model my-blog [--force]

# List available templates
cm list-templates

# List project models
cm list-models

# Developer utilities
cm dev --validate-field-registry
```

### MCP Server
```bash
# Start MCP server
npm run start:mcp-server
# or
cm-mcp-server [--project-path /path/to/project]
```

### Development
```bash
# Release (beta)
npm run release:beta

# No test framework currently implemented
npm test  # exits 0
```

## Architecture Details

### Project Structure Detection
- Uses `loadProjectRoot()` utility to traverse upward from current directory
- Looks for `.cmcli.json` file to identify project root
- All commands must be run within a valid project structure

### Module Aliases
The project uses module aliases defined in package.json:
- `@fields` → `common/fields`
- `@expand` → `cli/utilities/expand-components.js`
- `@validateRegistry` → `cli/utilities/validate-field-registry.js`
- `@resolve-emoji` → `cli/utilities/resolve-emoji.js`
- `@resolve-cma` → `cli/utilities/resolve-cma.js`
- `@loadProjectRoot` → `cli/utilities/load-project-root.js`
- `@validateFieldIds` → `cli/utilities/validate-field-ids.js`

### Field System
- **Field Registry**: `common/fields/field-registry.json` defines available field types
- **Field Functions**: Each field type has a corresponding creation function
- **Validation**: Built-in validation for field definitions and IDs
- **Types**: codeId, multiSelect, reference, singleSelect, text, title, url

### Template System
- Templates stored in `common/project-template/content-model-templates/templates/`
- Example: `simple-blog` template with article and author content types
- Components available in `components/` directory (e.g., seoMetadata.json)
- Emoji library defined in `emojis.json` for visual enhancement

### MCP Integration
- Implements Model Context Protocol for AI assistant integration
- Tools auto-loaded from `mcp-server/tools/` directory
- Each tool exports: `name`, `schema`, `handler` function
- Server can change working directory with `--project-path` option

## Key Workflows

### Creating New Content Models
1. Run `cm list-templates` to see available templates
2. Use `cm create-model --template <name> --model <model-name>`
3. Customize content types in `content-models/models/<model-name>/content-types/`
4. Push to Contentful with `cm push-model --model <model-name> --force`

### Field Validation
- All field definitions validated against field registry
- Use `cm dev --validate-field-registry` to check field system integrity
- Field IDs must be unique within content types

### Component Reuse
- Define reusable components in project templates
- Reference components in content type definitions
- Emoji library provides visual categorization (contentgroup: 🟦, contentblock: 🧩, metadata: 🔵)

## Technical Requirements

- **Node.js**: >=18.0.0
- **Installation**: `npm install -g @icodewith-ai/content-modeling-cli`
- **Dependencies**: contentful-management, commander, chalk, figlet, fs-extra, zod
- **MCP SDK**: @modelcontextprotocol/sdk for MCP server functionality

## Important Notes

- All Contentful operations use dry-run by default (require `--force` flag)
- Project must contain `.cmcli.json` config file at root
- CLI spawns child processes for command execution
- MCP server changes working directory based on project path
- Licensed for Contentful modeling only (not open source)