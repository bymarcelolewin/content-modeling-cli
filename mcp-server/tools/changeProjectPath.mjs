//======================================
// file: changeProjectPath.mjs
// version: 1.0
// last updated: 06-16-2025
//======================================

import { z } from "zod";

export const name = "changeProjectPath";
export const description = "Changes the current working directory.";

export const schema = {
  path: z.string().describe("The new working directory path to switch to")
};

export async function handler(args) {
  console.error("[HANDLER] Parsed args received:", JSON.stringify(args, null, 2));

  const newDir = args.path;
  try {
    const oldPath = process.cwd();
    process.chdir(newDir);
    const newPath = process.cwd();

    return {
      content: [
        {
          type: "text",
          text: `✅ Changed working directory from '${oldPath}' to '${newPath}'`
        }
      ]
    };
  } catch (err) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Failed to change directory to '${newDir}': ${err.message}`
        }
      ]
    };
  }
}
