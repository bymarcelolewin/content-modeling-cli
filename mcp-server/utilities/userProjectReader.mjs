//======================================
// file: userProjectReader.mjs
// version: 1.0
// last updated: 06-18-2025
//======================================

import fs from "fs";
import path from "path";

/**
 * Converts camelCase .json filename to Proper Case display name
 * @param {string} filename - The .json filename (e.g., "mySEO.json")
 * @returns {string} - Formatted display name (e.g., "My SEO")
 */
export function formatCamelCaseToProperCase(filename) {
  // Remove .json extension
  const nameWithoutExtension = filename.replace(/\.json$/, '');
  
  // Handle edge case of empty or single character
  if (nameWithoutExtension.length <= 1) {
    return nameWithoutExtension.charAt(0).toUpperCase() + nameWithoutExtension.slice(1);
  }
  
  // Split camelCase into words
  // This regex matches:
  // - Lowercase letter followed by uppercase letter
  // - Uppercase letter followed by lowercase letter (for cases like "SEO" -> "S EO")
  const words = nameWithoutExtension
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // camelCase -> camel Case
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')  // SEOTitle -> SEO Title
    .split(' ');
  
  // Capitalize first letter of each word, but preserve common abbreviations
  const commonAbbreviations = ['SEO', 'API', 'URL', 'HTML', 'CSS', 'JS', 'JSON', 'XML', 'HTTP', 'HTTPS', 'ID', 'UUID'];
  const properCaseWords = words.map(word => {
    if (word.length === 0) return word;
    
    // Check if this word is a common abbreviation (case-insensitive)
    const upperWord = word.toUpperCase();
    if (commonAbbreviations.includes(upperWord)) {
      return upperWord;
    }
    
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return properCaseWords.join(' ');
}

/**
 * Gets content types from a directory's content-types folder
 * @param {string} directoryPath - Path to template/model directory
 * @returns {string[]} - Array of formatted content type names
 */
export function getContentTypes(directoryPath) {
  const contentTypesPath = path.join(directoryPath, 'content-types');
  
  try {
    // Check if content-types directory exists
    if (!fs.existsSync(contentTypesPath)) {
      return []; // Return empty array if no content-types directory
    }
    
    // Read all files in content-types directory
    const files = fs.readdirSync(contentTypesPath, { withFileTypes: true });
    
    // Filter for .json files only
    const jsonFiles = files
      .filter(file => file.isFile() && file.name.endsWith('.json'))
      .map(file => file.name);
    
    // Convert each filename to Proper Case
    const formattedContentTypes = jsonFiles.map(filename => 
      formatCamelCaseToProperCase(filename)
    );
    
    return formattedContentTypes;
    
  } catch (error) {
    // If there's any error reading the directory, return empty array
    return [];
  }
}

/**
 * Gets list of available templates with their content types
 * @param {string} cwd - Current working directory  
 * @returns {Object} - { templates: Array<{name: string, contentTypes: string[]}>, error?: string }
 */
export function getAvailableTemplates(cwd) {
  const templatesDir = path.join(cwd, 'content-model-templates', 'templates');
  
  try {
    // Check if content-model-templates directory exists
    const contentModelTemplatesDir = path.join(cwd, 'content-model-templates');
    if (!fs.existsSync(contentModelTemplatesDir)) {
      return {
        templates: [],
        error: "Error: No content-model-templates directory found in project"
      };
    }
    
    // Check if templates subdirectory exists
    if (!fs.existsSync(templatesDir)) {
      return {
        templates: [],
        error: "Error: No templates directory found in content-model-templates"
      };
    }

    // Read all entries in templates directory
    const templateEntries = fs.readdirSync(templatesDir, { withFileTypes: true });
    
    // Filter for directories only
    const templateDirs = templateEntries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    
    if (templateDirs.length === 0) {
      return {
        templates: [],
        error: "Error: No templates found in project"
      };
    }

    // Build templates array with content types
    const templates = templateDirs.map(templateName => {
      const templatePath = path.join(templatesDir, templateName);
      const contentTypes = getContentTypes(templatePath);
      
      return {
        name: templateName,
        contentTypes: contentTypes
      };
    });

    return { templates };
    
  } catch (error) {
    return {
      templates: [],
      error: `Error: Failed to read templates directory: ${error.message}`
    };
  }
}

/**
 * Gets list of available content models with optional content types
 * @param {string} cwd - Current working directory
 * @param {boolean} includeContentTypes - Whether to include content types in response
 * @returns {Object} - { models: string[] | Array<{name: string, contentTypes: string[]}>, error?: string }
 */
export function getAvailableModels(cwd, includeContentTypes = false) {
  const modelsDir = path.join(cwd, "content-models", "models");
  
  try {
    // Check if the models subdirectory exists
    if (!fs.existsSync(modelsDir)) {
      return {
        models: [],
        error: "Error: No models directory found in content-models"
      };
    }

    const modelEntries = fs.readdirSync(modelsDir, { withFileTypes: true });
    
    const modelDirs = modelEntries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    
    if (modelDirs.length === 0) {
      return {
        models: [],
        error: "Error: No content models found in project"
      };
    }

    // If not including content types, return simple string array (backward compatibility)
    if (!includeContentTypes) {
      return { models: modelDirs };
    }
    
    // Build models array with content types
    const modelsWithContentTypes = modelDirs.map(modelName => {
      const modelPath = path.join(modelsDir, modelName);
      const contentTypes = getContentTypes(modelPath);
      
      return {
        name: modelName,
        contentTypes: contentTypes
      };
    });

    return { models: modelsWithContentTypes };
    
  } catch (error) {
    return {
      models: [],
      error: `Error: Failed to read models directory: ${error.message}`
    };
  }
}