//======================================
// file: createTitle.js
// version: 2.0
// last updated: 05-27-2025
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
 * @param {string} options.emojiPath - Path to emojis.json
 * @returns {Object} CMA-compatible field definition
 */
function createTitle({
  fieldName = "Title",
  fieldId = "title",
  required = true,
  emoji = "",
  emojiPath = undefined,
} = {}) {
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