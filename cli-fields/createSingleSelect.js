//======================================
// file: createSingleSelect.js
// version: 2.1
// last updated: 06-02-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

/**
 * Returns a CMA-compatible Symbol field with a single-select value from a list.
 *
 * @param {Object} options
 * @param {string} options.fieldName - Display name of the field
 * @param {string} options.fieldId - Field ID
 * @param {boolean} options.required - Whether the field is required
 * @param {string[]} options.options - List of allowed values
 * @param {string} [options.defaultValue] - Optional default value (must be in options)
 * @param {string} options.emoji - Optional emoji key or literal
 * @returns {Object} CMA-compatible field definition
 */
function createSingleSelect({
  fieldName = "Category",
  fieldId = "category",
  required = false,
  options = [],
  defaultValue = undefined,
  emoji = "",
} = {}) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error(
      `createSingleSelect: 'options' array is required and cannot be empty.`
    );
  }

  if (defaultValue && !options.includes(defaultValue)) {
    throw new Error(
      `createSingleSelect: 'defaultValue' must be one of the values in 'options'. Received: "${defaultValue}"`
    );
  }

  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  const fieldConfig = {
    id: fieldId,
    name,
    type: "Symbol",
    required,
    localized: false,
    disabled: false,
    omitted: false,
    validations: [
      {
        in: options,
      },
    ],
  };

  if (defaultValue) {
    fieldConfig.defaultValue = {
      "en-US": defaultValue,
    };
  }

  return fieldConfig;
}

module.exports = {
  createSingleSelect,
};