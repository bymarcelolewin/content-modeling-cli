//======================================
// file: changeCurrentModel.mjs
// version: 1.0
// last updated: 06-17-2025
//======================================

import { z } from "zod";
import fs from "fs";
import path from "path";
import { validateForModelOperation } from "../utils/modelValidation.mjs";

export const name = "changeCurrentModel";
export const description = "Change the currently selected content model";

export const schema = {
  model: z.string().describe("The name of the content model to select")
};

export async function handler(args) {
  const cwd = process.cwd();
  const contextFilePath = path.join(cwd, ".cm-mcp-context.json");
  const targetModel = args.model;

  try {
    // 1. Validate project structure and target model
    const validation = validateForModelOperation(cwd, targetModel);
    if (!validation.isValid) {
      return {
        content: [
          { type: "text", text: validation.error }
        ]
      };
    }

    // 2. Read existing context (create file if needed)
    let contextData;
    let previousModel = "";
    
    if (!fs.existsSync(contextFilePath)) {
      // Auto-create context file with empty currentModel
      contextData = { currentModel: "" };
    } else {
      // Read existing context file
      try {
        const contextContent = fs.readFileSync(contextFilePath, "utf8");
        contextData = JSON.parse(contextContent);
        previousModel = contextData.currentModel || "";
      } catch (parseError) {
        return {
          content: [
            { type: "text", text: `Error: Failed to parse context file: ${parseError.message}` }
          ]
        };
      }
    }

    // 3. Update currentModel in context file
    contextData.currentModel = targetModel;
    
    try {
      fs.writeFileSync(contextFilePath, JSON.stringify(contextData, null, 2));
    } catch (writeError) {
      return {
        content: [
          { type: "text", text: `Error: Failed to update context file: ${writeError.message}` }
        ]
      };
    }

    // 4. Return success message with old → new model info
    if (previousModel && previousModel.trim() !== "") {
      return {
        content: [
          { type: "text", text: `✅ Changed model from '${previousModel}' to '${targetModel}'` }
        ]
      };
    } else {
      return {
        content: [
          { type: "text", text: `✅ Set current model to '${targetModel}'` }
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