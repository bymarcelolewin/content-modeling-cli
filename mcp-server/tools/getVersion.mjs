//======================================
// file: getVersion.mjs
// version: 1.1
// last updated: 06-18-2025
//======================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const name = "getVersion";
export const description =
  "Returns the Content Modeling MCP Server and CLI version and its execution context.";

// No parameters → empty mapping
export const schema = {};

/**
 * Converts package name to friendly display format
 * @param {string} packageName - Package name (e.g., "content-modeling-mcp-server-and-cli")
 * @returns {string} - Friendly name (e.g., "Content Modeling MCP Server And CLI")
 */
function formatPackageNameToFriendly(packageName) {
  return packageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export async function handler() {
  try {
    // Get __dirname equivalent for ESM
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    
    // Read package.json from root directory
    const packagePath = path.join(__dirname, "..", "..", "package.json");
    const packageData = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    
    // Extract information
    const friendlyName = formatPackageNameToFriendly(packageData.name);
    const version = packageData.version;
    const description = packageData.description;
    
    // Return structured JSON output
    const versionInfo = {
      name: friendlyName,
      version: version,
      description: description
    };

    return {
      content: [
        { type: "text", text: JSON.stringify(versionInfo, null, 2) }
      ]
    };
  } catch (error) {
    return {
      content: [
        { type: "text", text: JSON.stringify({ error: `Failed to get version info: ${error.message}` }, null, 2) }
      ]
    };
  }
}
