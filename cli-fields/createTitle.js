//======================================
// file: createTitle.js
// version: 1.3
// last updated: 05-22-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

function createTitle(contentType, {
  fieldName = "Title",
  fieldId = "title",
  required = true,
  emoji = "",
  emojiPath = undefined, // ✅ Accept emojiPath passed in from CLI
} = {}) {
  const resolvedEmoji = resolveEmoji(emoji, emojiPath); // ✅ Use provided path
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  contentType.createField(fieldId, {
    name,
    type: "Symbol",
    required: required,
    validations: [
      {
        size: {
          min: 2,
          max: 255,
        },
      },
    ],
  });

  contentType.changeFieldControl(fieldId, "builtin", "singleLine");
}

module.exports = {
  createTitle,
};