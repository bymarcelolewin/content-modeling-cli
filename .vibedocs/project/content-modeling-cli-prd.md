# Content Modeling MCP Server and CLI - Project Overview

## Project Description

The Content Modeling MCP Server and CLI is a comprehensive tool for building, templating, and managing content models for Contentful using structured JSON files. Currently in beta (v1.0.0-beta.11), it serves dual purposes as both a command-line interface and an MCP (Model Context Protocol) server for AI-powered workflows.

## Key Features

### Core Capabilities
- **JSON-Based Content Modeling**: Define content types, fields, and relationships using clean, structured JSON
- **Component System**: Create reusable components with predefined options and default values
- **Template Engine**: Templatize entire content models for consistency across projects  
- **Emoji Support**: Enhance clarity with emoji support via a centralized library
- **Git Integration**: Version control and collaboration support for content models
- **AI-Ready Structure**: Fully structured models ideal for generative workflows, personalization, and RAG

### Dual Interface
- **CLI Tool**: Traditional command-line interface for direct usage
- **MCP Server**: Full API access via Model Context Protocol for AI clients like Claude

## Architecture Overview

### Core Components

#### CLI Commands (`cli-commands/`)
- `cm.js` - Main CLI entry point
- `init-project.js` - Project initialization
- `create-content-model.js` - Content model creation
- `add-content-type.js` - Content type management
- `push-content-model.js` - Contentful deployment
- `list-content-models.js` - Model listing and management
- `delete-content-model.js` - Model deletion
- `list-templates.js` - Template management
- `dev.js` - Development utilities

#### Field System (`cli-fields/`)
- Modular field types: text, title, URL, reference, single/multi-select, codeId
- `field-registry.json` - Field type registry and validation

#### Utilities (`cli-utilities/`)
- Component expansion and validation
- Project root resolution
- CMA (Content Management API) integration
- Emoji resolution system
- Field ID validation

#### MCP Server (`mcp-server/`)
- `index.mjs` - MCP server implementation
- Tools for project management, version info, and model operations
- Full CLI functionality exposed via MCP protocol

#### Project Templates (`project-template/`)
- Starter templates including simple blog setup
- Component library (SEO metadata, etc.)
- Emoji library for enhanced UX

## Target Audience

- **Content Modeling Architects**: Professionals designing complex content structures
- **Developers**: Teams integrating content models into development workflows
- **AI Practitioners**: Users building AI-powered content systems and RAG applications
- **Content Teams**: Organizations requiring scalable, version-controlled content modeling

## Usage Scenarios

1. **Traditional CLI Usage**: Direct command-line content model management
2. **AI-Assisted Modeling**: Using MCP server with Claude or other AI clients
3. **CI/CD Integration**: Automated content model deployment pipelines
4. **Team Collaboration**: Git-based workflow for content model versioning
5. **Template-Based Development**: Rapid deployment using predefined content model templates

## Technical Requirements

- Node.js >= 18.0.0
- Contentful account and API access
- Git (for version control features)

## License & Distribution

- Source-available but not open source
- Licensed exclusively for Contentful content modeling
- Commercial redistribution prohibited
- CI/CD integration permitted

## Author & Support

- **Author**: Marcelo Lewin (marcelo@redpillbluepillstudios.com)
- **Organization**: Red Pill Blue Pill Studios, LLC
- **Website**: [ByMarceloLewin.com](https://www.bymarcelolewin.com/)
- **Repository**: [GitHub](https://github.com/bymarcelolewin/Content-Modeling-CLI)

---

*This tool represents a bridge between traditional content management and modern AI-powered workflows, enabling teams to build scalable, maintainable content architectures.*