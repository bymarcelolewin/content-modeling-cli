//======================================
// file: getVersion.mjs
// version: 1.0
// last updated: 06-16-2025
//======================================


import { spawn } from "child_process";

export const name = "getVersion";
export const description =
  "Returns the Content Modeling MCP Server and CLI version and its execution context.";

// No parameters → empty mapping
export const schema = {};

export async function handler() {
  console.error("[HANDLER] getVersion called");

  const versionOutput = await new Promise((resolve, reject) => {
    const proc = spawn("cm", ["--version"]);
    let out = "", err = "";

    proc.stdout.on("data", (d) => (out += d));
    proc.stderr.on("data", (d) => (err += d));
    proc.on("close", (code) =>
      code === 0 ? resolve(out.trim()) : reject(new Error(err || `exit ${code}`))
    );
  });

  const combinedOutput = `CLI Version Info:\n${versionOutput}`;

  return {
    content: [
      { type: "text", text: combinedOutput }
    ]
  };
}
