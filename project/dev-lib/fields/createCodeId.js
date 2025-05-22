//======================================
// file: createCodeId.js
// version: 1.0
// last updated: 05-25-2025
//======================================

const resolveEmoji = require("../../../cli-utilities/resolve-emoji");

function createCodeId(contentType, {
  fieldName = "Code ID",
  fieldId = "codeId",
  required = true,
  unique = true,
  validate = "camelCase",
  emoji = "emoji.field.developer",
} = {}) {
  const validations = [];

  if (validate === "camelCase") {
    validations.push({
      regexp: {
        pattern: "^[a-z]+([A-Z0-9][a-z0-9]*)*$",
        flags: null,
      },
    });
  } else if (validate === "snake_case") {
    validations.push({
      regexp: {
        pattern: "^[a-z]+(_[a-z0-9]+)*$",
        flags: null,
      },
    });
  }

  validations.push(
    { unique: unique },
    {
      size: {
        min: 2,
      },
    }
  );

  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  contentType.createField(fieldId, {
    name,
    type: "Symbol",
    required: required,
    validations,
  });

  contentType.changeFieldControl(fieldId, "builtin", "singleLine");
}

module.exports = {
  createCodeId,
};