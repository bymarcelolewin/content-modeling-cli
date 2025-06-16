//======================================
// file: listModels.mjs
// version: 1.0
// last updated: 06-16-2025
//======================================

import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

export const name = "listModels";
export const description = "Lists all available content models in the project.";
export const schema = {};

export async function handler() {
  // Get the Current Working Directory, which we now know is the correct project path.
  const cwd = process.cwd();
  console.error(`[listModels handler] Executing in correct CWD: '${cwd}'`);

  try {
    // The command to run. We don't need --project-root because we're running it
    // from within the correct directory.
    const command = "cm list-models --json";

    // Execute the command, ensuring it runs within the correct CWD.
    const { stdout, stderr } = await execAsync(command, { cwd });

    if (stderr) {
      throw new Error(stderr);
    }
    
    // Parse the JSON output from the command.
    const parsed = JSON.parse(stdout);
    const models = parsed.models || [];

    if (models.length === 0) {
      return { content: [{ type: "text", text: `No content models found in project: ${cwd}` }] };
    }

    // Return a successful response with the list of models.
    return { content: [{ type: "text", text: `Found models: ${models.join(", ")}` }] };

  } catch (error) {
    // If anything goes wrong, return a clear error message.
    return { content: [{ type: "text", text: `Error executing listModels command in '${cwd}': ${error.message}` }] };
  }
}
