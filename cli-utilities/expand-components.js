//======================================
// file: expand-components.js
// version: 1.0
// last updated: 05-25-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");

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
        throw new Error(`❌ Missing "componentId" in a field of type "component" in "${contentTypeJson.id}".`);
      }

      const componentPath = path.join(componentsDir, `${componentId}.json`);

      if (!fs.existsSync(componentPath)) {
        throw new Error(`❌ Component "${componentId}" not found at path: ${componentPath}`);
      }

      const componentJson = JSON.parse(fs.readFileSync(componentPath, "utf-8"));

      if (!Array.isArray(componentJson.fields)) {
        throw new Error(`❌ Component "${componentId}" does not contain a valid "fields" array.`);
      }

      expandedFields.push(...componentJson.fields);
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

/**
 * Validates that all fieldId values in the expanded field list are unique.
 *
 * @param {Array} fields - The array of all fields (after expansion).
 * @param {string} contentTypeId - The ID of the content type being processed.
 * @throws {Error} - If duplicate fieldIds are found.
 */
function validateUniqueFieldIds(fields, contentTypeId) {
  const seen = new Set();

  for (const field of fields) {
    if (!field.fieldId) continue; // Some field types like 'title' may not have a fieldId
    if (seen.has(field.fieldId)) {
      throw new Error(
        `❌ Duplicate fieldId "${field.fieldId}" found in content type "${contentTypeId}".\n` +
        `   ➤ This may be caused by an overlapping field in a component.`
      );
    }
    seen.add(field.fieldId);
  }
}

module.exports = {
  expandComponents,
};