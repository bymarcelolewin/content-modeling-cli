//======================================
// file: createSingleSelect.js
// version: 1.0
// last updated: 05-25-2025
//======================================

const resolveEmoji = require("../../../cli-utilities/resolve-emoji");

function createSingleSelect(contentType, {
  fieldName = "Category",
  fieldId = "category",
  required = false,
  options = [],
  defaultValue = undefined,
  emoji = "",
} = {}) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error(`createSingleSelect: 'options' array is required and cannot be empty.`);
  }

  if (defaultValue && !options.includes(defaultValue)) {
    throw new Error(
      `createSingleSelect: 'defaultValue' must be one of the values in 'options'. Received: "${defaultValue}"`
    );
  }

  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  const fieldConfig = {
    name,
    type: "Symbol",
    required: required,
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

  contentType.createField(fieldId, fieldConfig);
  contentType.changeFieldControl(fieldId, "builtin", "radio");
}

module.exports = {
  createSingleSelect,
};