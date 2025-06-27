# Tech Stack Overview

## Core Technologies

### Runtime Environment
- **Node.js** (>=18.0.0) - Primary runtime environment for both CLI and MCP server
- **JavaScript (ES5/ES6)** - Main programming language for CLI components
- **ES Modules (ESM)** - Used for MCP server implementation

### Package Management
- **npm** - Package manager and dependency management
- **package-lock.json** - Dependency lockfile for reproducible builds

## Application Architecture

### Dual-Purpose Application
The project implements two main interfaces:
1. **CLI Tool** - Command-line interface for content modeling operations
2. **MCP Server** - Model Context Protocol server for AI integration

### CLI Framework
- **Commander.js** (v13.1.0) - Command-line interface framework
- **Figlet** (v1.8.1) - ASCII art text generation for CLI banners
- **Chalk** (v4.1.2) - Terminal string styling and colors

### MCP Integration
- **@modelcontextprotocol/sdk** (v1.12.3) - Model Context Protocol SDK for AI integration
- **StdioServerTransport** - Communication transport for MCP server

## Content Management Integration

### Contentful CMS
- **contentful-management** (v11.52.2) - Contentful Management API client
- JSON-based content model definitions
- Template-driven content type creation

## Data Validation & Processing

### Schema Validation
- **Zod** (v3.25.64) - TypeScript-first schema validation library
- Validates field definitions and content model structures

### File System Operations
- **fs-extra** (v11.3.0) - Enhanced file system operations
- **Built-in Node.js fs** - Core file system operations

## Project Structure & Module System

### Module Resolution
- **module-alias** (v2.2.3) - Custom module path aliasing
- Custom aliases for common utilities:
  - `@fields` → `common/fields`
  - `@expand` → `cli/utilities/expand-components.js`
  - `@validateRegistry` → `cli/utilities/validate-field-registry.js`
  - And more...

## Development & Build Tools

### Package Scripts
- `start:mcp-server` - Starts the MCP server
- `release:beta` - Beta release automation with npm versioning and publishing
- No test framework currently configured (placeholder script exists)

### Version Management
- Currently at version 1.0.0-beta.18
- Pre-release versioning with beta tags
- Automated publishing to npm with beta tags

## Data Formats & Configuration

### Configuration Files
- **JSON** - Primary configuration format for:
  - Content models and templates
  - Field definitions and registry
  - Component definitions
  - Emoji mappings
- **Markdown** - Documentation format

### Template System
- Reusable content model templates
- Component-based architecture with reusable field definitions
- Template inheritance and composition

## Development Patterns

### Code Organization
- Modular architecture with separate CLI and MCP server implementations
- Utility functions organized by purpose
- Shared common components and templates
- Field type system with extensible definitions

### Error Handling
- Input validation using Zod schemas
- Graceful error handling for file operations
- MCP server error reporting and logging

## External Integrations

### Third-Party Services
- **Contentful** - Primary CMS platform for content model management
- **npm Registry** - Package distribution and management

### AI/ML Integration
- **Model Context Protocol (MCP)** - Enables AI assistant integration
- Compatible with Anthropic's Claude and other MCP clients
- Structured data format optimized for AI consumption

## Licensing & Distribution

### License
- Custom license (see LICENSE.md)
- Licensed specifically for Contentful modeling use
- Commercial use restrictions apply

### Distribution
- Published to npm as `content-modeling-cli`
- Public package with beta release channel
- Executable binaries: `cm`, `contentmodel`, `cm-mcp-server`

## Security Considerations

### Environment Requirements
- Node.js 18+ required for security and performance
- No external service dependencies beyond Contentful API
- Local file system operations only
- No sensitive data logging or exposure

## Performance & Scalability

### Efficiency Features
- Lightweight CLI with minimal dependencies
- Async/await patterns for I/O operations
- Modular loading to reduce startup time
- JSON-based configuration for fast parsing

This tech stack is designed for content modeling professionals working with Contentful CMS, providing both human-friendly CLI tools and AI-integration capabilities through the MCP protocol.