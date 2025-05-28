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
    if (typeof field.type === "string" && field.type.endsWith(".component")) {
      const [namespace, typeName] = field.type.split(".");

      if (typeName !== "component") {
        throw new Error(`❌ Invalid component type "${field.type}" in "${contentTypeJson.id}".`);
      }

      if (namespace === "local") {
        const componentId = field.componentId;
        if (!componentId) {
          throw new Error(`❌ Missing "componentId" in a field of type "local.component" in "${contentTypeJson.id}".`);
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
          __sourceComponent: componentId,
          __sourceComponentNamespace: namespace
        }));

        expandedFields.push(...fieldsWithSource);
      } else if (namespace === "global") {
        throw new Error(`❌ "global.component" is not supported yet in "${contentTypeJson.id}".`);
      } else {
        throw new Error(`❌ Unknown component namespace "${namespace}" in "${contentTypeJson.id}".`);
      }

    } else if (field.type === "component") {
      throw new Error(`❌ Field type "component" is missing a namespace in "${contentTypeJson.id}". Use "local.component" instead.`);
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