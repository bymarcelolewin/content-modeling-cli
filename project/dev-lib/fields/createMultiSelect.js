//======================================
// file: createMultiSelect.js
// version: 1.0
// last updated: 05-25-2025
//======================================

const resolveEmoji = require("../../../cli-utilities/resolve-emoji");

function createMultiSelect(contentType, {
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

  if (defaultValues && (!Array.isArray(defaultValues) || defaultValues.some((val) => !options.includes(val)))) {
    throw new Error(
      `createMultiSelect: 'defaultValues' must be an array of values included in 'options'.\nInvalid values: ${defaultValues.filter((val) => !options.includes(val)).join(", ")}`
    );
  }

  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  const fieldConfig = {
    name,
    type: "Array",
    required: required,
    items: {
      type: "Symbol",
      validations: [
        {
          in: options,
        },
      ],
    },
  };

  if (defaultValues && defaultValues.length > 0) {
    fieldConfig.defaultValue = {
      "en-US": defaultValues,
    };
  }

  contentType.createField(fieldId, fieldConfig);
  contentType.changeFieldControl(fieldId, "builtin", "checkbox");
}

module.exports = {
  createMultiSelect,
};