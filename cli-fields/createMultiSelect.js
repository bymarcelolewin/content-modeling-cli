//======================================
// file: createMultiSelect.js
// version: 1.2
// last updated: 05-22-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

function createMultiSelect(contentType, {
  fieldName = "Tags",
  fieldId = "tags",
  required = false,
  options = [],
  defaultValues = undefined,
  emoji = "",
  emojiPath = undefined, // ✅ Injected by CLI
} = {}) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error(`createMultiSelect: 'options' array is required and cannot be empty.`);
  }

  if (defaultValues && (!Array.isArray(defaultValues) || defaultValues.some((val) => !options.includes(val)))) {
    throw new Error(
      `createMultiSelect: 'defaultValues' must be an array of values included in 'options'.\nInvalid values: ${defaultValues.filter((val) => !options.includes(val)).join(", ")}`
    );
  }

  const resolvedEmoji = resolveEmoji(emoji, emojiPath);
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