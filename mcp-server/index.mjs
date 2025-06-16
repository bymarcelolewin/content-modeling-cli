#!/usr/bin/env node

//======================================
// file: index.mjs
// version: 1.1
// last updated: 06-16-2025
//======================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { fileURLToPath, pathToFileURL } from "url";
import fs from "fs";
import path from "path";

// ===== MAIN SERVER FUNCTION =====
export async function runMcpServer(options = {}) {
  // Handle --project-path if provided
  if (options.projectPath) {
    try {
      process.chdir(options.projectPath);
    } catch (err) {
      console.error(`[ERROR] Failed to change directory to '${options.projectPath}': ${err.message}`);
      process.exit(1);
    }
  } else {
    try {
      process.chdir("/");
    } catch (err) {
      console.error(`[ERROR] Failed to change directory to '/': ${err.message}`);
      process.exit(1);
    }
  }

  // Determine __dirname equivalent in ESM
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Load root package.json for synchronized name and version
  const rootPkgPath = path.join(__dirname, "..", "package.json");
  const { name: cliName, version: cliVersion } = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));

  // Print startup banner
  console.error(`[STARTUP] 🚀 Starting MCP server "${cliName}"`);
  console.error(`[STARTUP] Version: ${cliVersion}`);
  console.error(`[STARTUP] Current Project Directory: '${process.cwd()}'`);

  // Instantiate MCP server with dynamic metadata
  const server = new McpServer({
    name: cliName,
    version: cliVersion
  });

  // Register tools from the 'tools' directory
  const toolsDir = path.join(__dirname, "tools");
  if (!fs.existsSync(toolsDir)) {
    console.error(`[ERROR] Tools directory not found at: ${toolsDir}`);
    process.exit(1);
  }

  const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith(".mjs"));
  for (const file of toolFiles) {
    const toolPath = pathToFileURL(path.join(toolsDir, file)).href;
    try {
      const mod = await import(toolPath);
      if (!mod.name || !mod.schema || typeof mod.handler !== "function") {
        console.error(`[WARN] Skipping '${file}' — missing required exports (name, schema, handler).`);
        continue;
      }
      console.error(`[REGISTER] Registering tool '${mod.name}' from '${file}'`);
      server.tool(mod.name, mod.schema, async (rawArgs) => {
        console.error(`[MCP] Raw args before schema parse:\n`, JSON.stringify(rawArgs, null, 2));
        return await mod.handler(rawArgs);
      });
    } catch (err) {
      console.error(`[ERROR] Failed to load tool '${file}': ${err.message}`);
    }
  }

  // Connect server over stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(`[READY] MCP server is now connected and ready.`);
}

// ===== CLI ENTRY POINT =====
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--project-path" && args[i + 1]) {
      options.projectPath = args[i + 1];
      i++;
    }
  }
  runMcpServer(options).catch(err => {
    console.error(`[FATAL] MCP server failed to start: ${err.message}`);
    process.exit(1);
  });
}
