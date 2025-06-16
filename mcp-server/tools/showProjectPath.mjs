//======================================
// file: showProjectPath.mjs
// version: 1.0
// last updated: 06-16-2025
//======================================

export const name = "showProjectPath";
export const description = "Displays the current project path (working directory) that the MCP server is operating in.";
export const schema = {}; // no parameters

export async function handler() {
  // Get the current working directory
  const projectPath = process.cwd();
  
  return {
    content: [
      { type: "text", text: `Current project path: ${projectPath}` }
    ]
  };
}