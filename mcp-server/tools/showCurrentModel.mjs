//======================================
// file: showCurrentModel.mjs
// version: 1.1
// last updated: 06-18-2025
//======================================

import fs from "fs";
import path from "path";
import { validateProjectStructure } from "../utils/modelValidation.mjs";
import { getAvailableModels } from "../utils/userProjectReader.mjs";

export const name = "showCurrentModel";
export const description = "Display the currently selected content model";
export const schema = {}; // no parameters

export async function handler() {
  const cwd = process.cwd();
  const contextFilePath = path.join(cwd, ".cm-mcp-context.json");
  
  try {
    // 1. Validate basic project structure only (not model availability yet)
    const structureValidation = validateProjectStructure(cwd);
    if (!structureValidation.isValid) {
      return {
        content: [
          { type: "text", text: structureValidation.error }
        ]
      };
    }

    // 2. Check if context file exists, create if it doesn't
    let contextData;
    if (!fs.existsSync(contextFilePath)) {
      // Auto-create context file with empty currentModel
      contextData = { currentModel: "" };
      fs.writeFileSync(contextFilePath, JSON.stringify(contextData, null, 2));
    } else {
      // Read existing context file
      try {
        const contextContent = fs.readFileSync(contextFilePath, "utf8");
        contextData = JSON.parse(contextContent);
      } catch (parseError) {
        return {
          content: [
            { type: "text", text: `Error: Failed to parse context file: ${parseError.message}` }
          ]
        };
      }
    }

    // 3. Get available models for validation
    const modelsResult = getAvailableModels(cwd);
    
    // 4. Check current model and validate it still exists
    const currentModel = contextData.currentModel;
    if (!currentModel || currentModel.trim() === "") {
      // No model set - check if there are any models available
      if (modelsResult.error) {
        return {
          content: [
            { type: "text", text: modelsResult.error }
          ]
        };
      }
      return {
        content: [
          { type: "text", text: "No model currently set" }
        ]
      };
    } else {
      // Model is set - check if it still exists
      if (modelsResult.error) {
        // No models available, but we have a model set - this means it was deleted
        contextData.currentModel = "";
        try {
          fs.writeFileSync(contextFilePath, JSON.stringify(contextData, null, 2));
        } catch (writeError) {
          return {
            content: [
              { type: "text", text: `Error: Failed to update context file: ${writeError.message}` }
            ]
          };
        }
        
        return {
          content: [
            { type: "text", text: `⚠️ Previously selected model '${currentModel}' no longer exists. Cleared selection.` }
          ]
        };
      }
      
      // Models exist - check if our specific model exists
      if (!modelsResult.models.includes(currentModel)) {
        // Auto-cleanup: remove the non-existent model from context
        contextData.currentModel = "";
        try {
          fs.writeFileSync(contextFilePath, JSON.stringify(contextData, null, 2));
        } catch (writeError) {
          return {
            content: [
              { type: "text", text: `Error: Failed to update context file: ${writeError.message}` }
            ]
          };
        }
        
        return {
          content: [
            { type: "text", text: `⚠️ Previously selected model '${currentModel}' no longer exists. Cleared selection.` }
          ]
        };
      }
      
      // Model exists, return it normally
      return {
        content: [
          { type: "text", text: `Current model: ${currentModel}` }
        ]
      };
    }

  } catch (error) {
    return {
      content: [
        { type: "text", text: `Error: ${error.message}` }
      ]
    };
  }
}