//======================================
// file: listTemplates.mjs
// version: 1.1
// last updated: 06-16-2025
//======================================

import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

export const name = "listTemplates";
export const description = "Lists all available content model templates in the project.";
export const schema = {};

export async function handler() {
  // Current working directory
  const cwd = process.cwd();
  console.error(`[listTemplates handler] Executing in correct CWD: '${cwd}'`);

  try {
    // Run the CLI with JSON output
    const command = "cm list-templates --json";
    const { stdout, stderr } = await execAsync(command, { cwd });

    if (stderr) {
      throw new Error(stderr);
    }

    // Parse the JSON from CLI
    const parsed = JSON.parse(stdout);
    const templates = parsed.templates || [];

    // Return as a single text content containing the JSON
    const output = JSON.stringify({ templates });
    return {
      content: [
        { type: "text", text: output }
      ]
    };

  } catch (error) {
    const errorOutput = JSON.stringify({ templates: [], error: error.message });
    return {
      content: [
        { type: "text", text: errorOutput }
      ]
    };
  }
}
