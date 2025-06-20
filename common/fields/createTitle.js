//======================================
// file: createTitle.js
// version: 2.1
// last updated: 06-02-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

/**
 * Returns a CMA-compatible Symbol field intended for content titles.
 *
 * @param {Object} options
 * @param {string} options.fieldName - Display name of the field
 * @param {string} options.fieldId - Field ID
 * @param {boolean} options.required - Whether the field is required
 * @param {string} options.emoji - Optional emoji key or literal
 * @returns {Object} CMA-compatible field definition
 */
function createTitle({
  fieldName = "Title",
  fieldId = "title",
  required = true,
  emoji = "",
} = {}) {
  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  return {
    id: fieldId,
    name,
    type: "Symbol",
    required,
    localized: false,
    disabled: false,
    omitted: false,
    validations: [
      {
        size: {
          min: 2,
          max: 255,
        },
      },
    ],
  };
}

module.exports = {
  createTitle,
};