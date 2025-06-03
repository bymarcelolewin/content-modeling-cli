//======================================
// file: createMultiSelect.js
// version: 2.1
// last updated: 06-02-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

/**
 * Returns a CMA-compatible Array field with Symbol items and value restrictions.
 *
 * @param {Object} options
 * @param {string} options.fieldName - Display name of the field
 * @param {string} options.fieldId - Field ID
 * @param {boolean} options.required - Whether the field is required
 * @param {Array<string>} options.options - Allowed string values
 * @param {Array<string>} [options.defaultValues] - Optional default values
 * @param {string} options.emoji - Optional emoji key or literal
 * @returns {Object} CMA-compatible field definition
 */
function createMultiSelect({
  fieldName = "Tags",
  fieldId = "tags",
  required = false,
  options = [],
  defaultValues = undefined,
  emoji = "",
} = {}) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error(`createMultiSelect: 'options' array is required and cannot be empty.`);
  }

  if (
    defaultValues &&
    (!Array.isArray(defaultValues) ||
      defaultValues.some((val) => !options.includes(val)))
  ) {
    throw new Error(
      `createMultiSelect: 'defaultValues' must be an array of values included in 'options'.\nInvalid values: ${defaultValues
        .filter((val) => !options.includes(val))
        .join(", ")}`
    );
  }

  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  const fieldConfig = {
    id: fieldId,
    name,
    type: "Array",
    required,
    localized: false,
    disabled: false,
    omitted: false,
    items: {
      type: "Symbol",
      validations: [
        {
          in: options,
        },
      ],
    },
    validations: [],
  };

  if (defaultValues && defaultValues.length > 0) {
    fieldConfig.defaultValue = {
      "en-US": defaultValues,
    };
  }

  return fieldConfig;
}

module.exports = {
  createMultiSelect,
};