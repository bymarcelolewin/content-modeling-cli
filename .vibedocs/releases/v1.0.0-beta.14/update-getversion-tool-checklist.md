# Update getVersion Tool - Implementation Checklist

## Overview
Update `getVersion.mjs` to read directly from `package.json` instead of calling CLI command, making it truly standalone.

## Current Issues
- Uses `spawn("cm", ["--version"])` which depends on CLI
- Hardcoded description
- Basic output format

## Required Changes

### 1. Remove CLI Dependency
- [x] Remove `spawn` import from `child_process`
- [x] Remove CLI subprocess call (`spawn("cm", ["--version"])`)
- [x] Add `fs` import for reading package.json
- [x] Add `path` import for file paths
- [x] Add `fileURLToPath` import for ESM __dirname equivalent

### 2. Read Package.json Directly
- [x] Get `__dirname` equivalent for ESM
- [x] Read `../../package.json` relative to tool location
- [x] Extract `name`, `version`, and `description` fields
- [x] Add error handling for file read operations

### 3. Create Friendly Name Conversion
- [x] Create function to convert package name to friendly format
- [x] Convert "content-modeling-mcp-server-and-cli" → "Content Modeling MCP Server And CLI"
- [x] Replace dashes with spaces
- [x] Convert to proper case (first letter of each word capitalized)

### 4. Enhanced Output Format
- [x] Include friendly name in output
- [x] Include version from package.json
- [x] Include description from package.json
- [x] Format output as structured JSON
- [x] Remove debug console.error statement

### 5. Update File Metadata
- [x] Update version number in file header (1.0 → 1.1)
- [x] Update last updated date in file header

## Expected Output Format
Structured format for better AI agent consumption:
```javascript
return {
  content: [
    { 
      type: "text", 
      text: JSON.stringify({
        name: "Content Modeling MCP Server And CLI",
        version: "1.0.0-beta.13", 
        description: "⚠️ BETA : An MCP Server and CLI tool for building, templating, and managing content models for Contentful using simple JSON files..."
      }, null, 2)
    }
  ]
};
```

This structured JSON format allows chat agents to:
- Extract specific fields (name, version, description)
- Display information in custom formats
- Parse and process the data programmatically

## Technical Requirements
- Must work from any working directory (use absolute paths)
- Must handle package.json read errors gracefully
- Must maintain same MCP tool interface (name, schema, handler)
- Remove all CLI dependencies

### 6. Update Release Notes
- [x] Add enhancement to Beta.14 release notes about `getVersion` tool improvements
- [x] Document removal of CLI dependency from the tool

## Files to Modify
- `/mcp-server/tools/getVersion.mjs` - Main implementation
- `/docs/release_notes.md` - Add Beta.14 enhancement

**Estimated Time:** 20 minutes