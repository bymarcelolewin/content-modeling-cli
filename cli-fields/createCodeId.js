//======================================
// file: createCodeId.js
// version: 2.0
// last updated: 05-27-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

/**
 * Returns a CMA-compatible Symbol field for a developer-friendly ID
 *
 * @param {Object} options
 * @param {string} options.fieldName - Display name of the field
 * @param {string} options.fieldId - Field ID (e.g., "codeId")
 * @param {boolean} options.required - Whether the field is required
 * @param {boolean} options.unique - Whether the field value must be unique
 * @param {string} options.validate - "camelCase" or "snake_case"
 * @param {string} options.emoji - Optional emoji key or literal
 * @param {string} options.emojiPath - Path to emojis.json
 * @returns {Object} A CMA-compatible field definition
 */
function createCodeId({
  fieldName = "Code ID",
  fieldId = "codeId",
  required = true,
  unique = true,
  validate = "camelCase",
  emoji = "emoji.field.developer",
  emojiPath = undefined,
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

  if (unique) {
    validations.push({ unique: true });
  }

  validations.push({
    size: {
      min: 2,
    },
  });

  const resolvedEmoji = resolveEmoji(emoji, emojiPath);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  return {
    id: fieldId,
    name,
    type: "Symbol",
    required,
    localized: false,
    disabled: false,
    omitted: false,
    validations,
  };
}

module.exports = {
  createCodeId,
};