//======================================
// file: expand-components.js
// version: 1.5
// last updated: 05-28-2025
//======================================

const fs = require("fs");
const path = require("path");
const { validateUniqueFieldIds } = require("@validateFieldIds");

/**
 * Expands "component" field types in a content type definition.
 *
 * @param {Object} contentTypeJson - The JSON object for the content type (e.g., article.json).
 * @param {string} componentsDir - Absolute path to the components folder.
 * @returns {Object} - Updated content type with expanded fields.
 * @throws {Error} - If a component file is missing or fieldId conflicts are detected.
 */
function expandComponents(contentTypeJson, componentsDir) {
  const expandedFields = [];

  for (const field of contentTypeJson.fields) {
    if (field.type === "component") {
      const componentId = field.componentId;
      if (!componentId) {
        throw new Error(`❌ Missing "componentId" in a component field in "${contentTypeJson.id}".`);
      }

      const componentPath = path.join(componentsDir, `${componentId}.json`);

      if (!fs.existsSync(componentPath)) {
        throw new Error(`❌ Component "${componentId}" not found at path: ${componentPath}`);
      }

      const componentJson = JSON.parse(fs.readFileSync(componentPath, "utf-8"));

      if (!Array.isArray(componentJson.fields)) {
        throw new Error(`❌ Component "${componentId}" does not contain a valid "fields" array.`);
      }

      const fieldsWithSource = componentJson.fields.map(f => ({
        ...f,
        __sourceComponent: componentId
      }));

      expandedFields.push(...fieldsWithSource);
    } else {
      expandedFields.push(field);
    }
  }

  validateUniqueFieldIds(expandedFields, contentTypeJson.id);

  return {
    ...contentTypeJson,
    fields: expandedFields,
  };
}

module.exports = {
  expandComponents,
};