//======================================
// file: createText.js
// version: 2.1
// last updated: 06-02-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

/**
 * Returns a CMA-compatible field definition for various text types.
 *
 * @param {Object} options
 * @param {string} options.fieldName - Display name
 * @param {string} options.fieldId - Field ID
 * @param {boolean} options.required - Whether the field is required
 * @param {string} options.textType - single-line | multi-line | markdown | rich-text
 * @param {string} options.emoji - Optional emoji key or literal
 * @returns {Object} CMA-compatible field definition
 */
function createText({
  fieldName = "Description",
  fieldId = "description",
  required = false,
  textType = "single-line",
  emoji = "",
} = {}) {
  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  let fieldConfig;

  switch (textType) {
    case "single-line":
      fieldConfig = {
        id: fieldId,
        name,
        type: "Symbol",
        required,
      };
      break;

    case "multi-line":
    case "markdown":
      fieldConfig = {
        id: fieldId,
        name,
        type: "Text",
        required,
      };
      break;

    case "rich-text":
      fieldConfig = {
        id: fieldId,
        name,
        type: "RichText",
        required,
      };
      break;

    default:
      throw new Error(
        `createText: Unknown textType "${textType}". Valid options are: single-line, multi-line, markdown, rich-text.`
      );
  }

  // Set standard defaults across all types
  fieldConfig.localized = false;
  fieldConfig.disabled = false;
  fieldConfig.omitted = false;
  fieldConfig.validations = [];

  return fieldConfig;
}

module.exports = {
  createText,
};