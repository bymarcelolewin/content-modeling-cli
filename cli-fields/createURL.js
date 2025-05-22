//======================================
// file: createURL.js
// version: 1.2
// last updated: 05-22-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

function createURL(contentType, {
  fieldName = "URL or Path",
  fieldId = "urlOrPath",
  required = true,
  validate = "both",
  emoji = "",
  emojiPath = undefined, // ✅ Injected by CLI
} = {}) {
  const resolvedEmoji = resolveEmoji(emoji, emojiPath);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  let pattern;

  switch (validate) {
    case "url":
      pattern = "^https?:\\/\\/[^\\s]+$";
      break;
    case "path":
      pattern = "^\\/[a-zA-Z0-9\\-_/]*$";
      break;
    case "both":
    default:
      pattern = "^(https?:\\/\\/[^\\s]+|\\/[a-zA-Z0-9\\-_/]*)$";
      break;
  }

  contentType.createField(fieldId, {
    name,
    type: "Symbol",
    required: required,
    validations: [
      {
        regexp: {
          pattern,
          flags: null,
        },
      },
    ],
  });

  contentType.changeFieldControl(fieldId, "builtin", "singleLine");
}

module.exports = {
  createURL,
};