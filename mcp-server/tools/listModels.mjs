//======================================
// file: listModels.mjs
// version: 1.1
// last updated: 06-18-2025
//======================================

import { validateProjectStructure } from "../utilities/modelValidation.mjs";
import { getAvailableModels } from "../utilities/userProjectReader.mjs";

export const name = "listModels";
export const description = "Lists all available content models in the project.";
export const schema = {};

export async function handler() {
  const cwd = process.cwd();
  console.error(`[listModels handler] Executing in correct CWD: '${cwd}'`);

  try {
    // Validate basic project structure
    const structureValidation = validateProjectStructure(cwd);
    if (!structureValidation.isValid) {
      return {
        content: [
          { type: "text", text: `Error reading models in '${cwd}': ${structureValidation.error}` }
        ]
      };
    }

    // Get available models with content types
    const modelsResult = getAvailableModels(cwd, true); // includeContentTypes = true
    
    if (modelsResult.error) {
      return {
        content: [
          { type: "text", text: `Error reading models in '${cwd}': ${modelsResult.error}` }
        ]
      };
    }

    // Handle empty models case
    if (modelsResult.models.length === 0) {
      return { 
        content: [
          { type: "text", text: `No content models found in project: ${cwd}` }
        ] 
      };
    }

    // Build the new structured human-readable output
    let output = "Found models:\n";
    
    modelsResult.models.forEach(model => {
      output += `\n• ${model.name}\n`;
      if (model.contentTypes && model.contentTypes.length > 0) {
        output += `  Content Types: ${model.contentTypes.join(", ")}\n`;
      } else {
        output += `  Content Types: (none)\n`;
      }
    });

    return { 
      content: [
        { type: "text", text: output.trim() }
      ] 
    };

  } catch (error) {
    return { 
      content: [
        { type: "text", text: `Error reading models in '${cwd}': ${error.message}` }
      ] 
    };
  }
}