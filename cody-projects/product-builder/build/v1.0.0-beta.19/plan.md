# Release Plan: v1.0.0-beta.19

## Migration to icodewith-ai Organization

### Overview
This release migrates the content-modeling-cli package from the personal `bymarcelolewin` account to the new `icodewith-ai` organization on both GitHub and NPM.

### Changes Made

#### 1. Package Configuration Updates
- **Package Name**: Changed from `content-modeling-cli` to `@icodewith-ai/content-modeling-cli`
- **Repository URL**: Updated from `https://github.com/bymarcelolewin/Content-Modeling-CLI.git` to `https://github.com/icodewith-ai/content-modeling-cli.git`
- **Release Script**: Fixed `release:beta` script to reference the new scoped package name in dist-tag command

#### 2. Documentation Updates
- **README.md**: Updated NPM badge URL to point to the new scoped package
- **CLAUDE.md**: Added installation command with scoped package name: `npm install -g @icodewith-ai/content-modeling-cli`

#### 3. Repository Migration
- Git remote already updated to `https://github.com/icodewith-ai/content-modeling-cli.git` ✅
- Package configuration now matches the repository location

### Publishing Strategy

#### Scoped Package Benefits
- Clean namespace under the `icodewith-ai` organization
- Avoids conflicts with existing packages
- Professional organization branding
- Better package management and access control

#### Release Process
The existing `npm run release:beta` script will:
1. Bump version to `1.0.0-beta.19`
2. Publish to NPM under `@icodewith-ai/content-modeling-cli` with beta tag
3. Set the latest dist-tag for the new scoped package
4. Push commits and tags to the GitHub repository

### Prerequisites for Publishing
- Ensure NPM account has access to `@icodewith-ai` organization
- Verify organization exists and has appropriate permissions
- Test publishing with `npm publish --dry-run` first

### Breaking Changes
- **Installation command changed**: Users will need to install using `npm install -g @icodewith-ai/content-modeling-cli`
- **Old package deprecated**: The original `content-modeling-cli` package should be marked as deprecated with migration instructions

### Post-Release Actions
1. Update any external documentation referencing the old package name
2. Notify existing users about the migration path
3. Consider adding a deprecation notice to the old package (if access is still available)
4. Update any CI/CD pipelines or deployment scripts using the old package name

### Technical Details
- **CLI commands remain unchanged**: `cm`, `contentmodel`, and `cm-mcp-server` binaries unchanged
- **Functionality preserved**: No breaking changes to the CLI or MCP server functionality
- **Dependencies maintained**: All existing dependencies and module aliases preserved
- **License unchanged**: Custom license terms remain the same

### Success Criteria
- [x] Package successfully published to `@icodewith-ai/content-modeling-cli`
- [x] NPM badge displays correct version and package URL
- [x] GitHub repository reflects new organization ownership
- [x] Release script functions correctly with scoped package name
- [x] Documentation updated with new installation instructions

### Rollback Plan
If issues arise during publishing:
1. Revert package.json changes to original configuration
2. Restore original repository URL
3. Use previous publishing workflow
4. Address organization setup issues before retry