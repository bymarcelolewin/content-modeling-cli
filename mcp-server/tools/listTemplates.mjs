//======================================
// file: listTemplates.mjs
// version: 1.2
// last updated: 06-18-2025
//======================================

import fs from "fs";
import path from "path";
import { getAvailableTemplates } from "../utilities/userProjectReader.mjs";

export const name = "listTemplates";
export const description = "Lists all available content model templates in the project.";
export const schema = {};

export async function handler() {
  const cwd = process.cwd();
  console.error(`[listTemplates handler] Executing in correct CWD: '${cwd}'`);

  try {
    // Basic project validation for templates (check for .cmcli.json)
    const cmcliPath = path.join(cwd, ".cmcli.json");
    if (!fs.existsSync(cmcliPath)) {
      const errorOutput = JSON.stringify({ 
        templates: [], 
        error: "Error: Not in a valid CM CLI project (missing .cmcli.json file)" 
      });
      return {
        content: [
          { type: "text", text: errorOutput }
        ]
      };
    }

    // Get available templates with content types
    const templatesResult = getAvailableTemplates(cwd);
    
    if (templatesResult.error) {
      const errorOutput = JSON.stringify({ templates: [], error: templatesResult.error });
      return {
        content: [
          { type: "text", text: errorOutput }
        ]
      };
    }

    // Return the enhanced JSON format with content types
    const output = JSON.stringify({ templates: templatesResult.templates });
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