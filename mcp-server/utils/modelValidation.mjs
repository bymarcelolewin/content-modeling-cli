//======================================
// file: modelValidation.mjs
// version: 1.1
// last updated: 06-18-2025
//======================================

import fs from "fs";
import path from "path";
import { getAvailableModels } from "./userProjectReader.mjs";

/**
 * Validates the basic project structure for CM CLI projects
 * @param {string} cwd - Current working directory
 * @returns {Object} - { isValid: boolean, error?: string }
 */
export function validateProjectStructure(cwd) {
  // Check for .cmcli.json file
  const cmcliPath = path.join(cwd, ".cmcli.json");
  if (!fs.existsSync(cmcliPath)) {
    return {
      isValid: false,
      error: "Error: Not in a valid CM CLI project (missing .cmcli.json file)"
    };
  }

  // Check if content-models directory exists
  const contentModelsDir = path.join(cwd, "content-models");
  if (!fs.existsSync(contentModelsDir)) {
    return {
      isValid: false,
      error: "Error: No content-models directory found in project"
    };
  }

  // Check if models subdirectory exists
  const modelsDir = path.join(cwd, "content-models", "models");
  if (!fs.existsSync(modelsDir)) {
    return {
      isValid: false,
      error: "Error: No models directory found in content-models"
    };
  }

  return { isValid: true };
}

// getAvailableModels() function moved to userProjectReader.mjs

/**
 * Validates that a specific model exists in the project
 * @param {string} cwd - Current working directory
 * @param {string} modelName - Name of the model to validate
 * @returns {Object} - { isValid: boolean, error?: string, availableModels?: string[] }
 */
export function validateModelExists(cwd, modelName) {
  const modelsResult = getAvailableModels(cwd);
  
  // If there was an error getting models, return that error
  if (modelsResult.error) {
    return {
      isValid: false,
      error: modelsResult.error
    };
  }

  const { models } = modelsResult;
  
  // Debug logging
  console.error(`[DEBUG] Looking for model: '${modelName}'`);
  console.error(`[DEBUG] Available models: [${models.map(m => `'${m}'`).join(", ")}]`);
  console.error(`[DEBUG] Model found: ${models.includes(modelName)}`);
  
  if (!models.includes(modelName)) {
    return {
      isValid: false,
      error: `❌ Error: Model '${modelName}' not found. Available models: ${models.join(", ")}`,
      availableModels: models
    };
  }

  return { isValid: true, availableModels: models };
}

/**
 * Performs complete validation for model operations
 * @param {string} cwd - Current working directory
 * @param {string} modelName - Optional model name to validate (if provided)
 * @returns {Object} - { isValid: boolean, error?: string, availableModels?: string[] }
 */
export function validateForModelOperation(cwd, modelName = null) {
  // First validate project structure
  const projectValidation = validateProjectStructure(cwd);
  if (!projectValidation.isValid) {
    return projectValidation;
  }

  // Then validate models exist
  const modelsResult = getAvailableModels(cwd);
  if (modelsResult.error) {
    return {
      isValid: false,
      error: modelsResult.error
    };
  }

  // If a specific model name was provided, validate it exists
  if (modelName) {
    return validateModelExists(cwd, modelName);
  }

  // If no specific model, just return that project and models are valid
  return { 
    isValid: true, 
    availableModels: modelsResult.models 
  };
}