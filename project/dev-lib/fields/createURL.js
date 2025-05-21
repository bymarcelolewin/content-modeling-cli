const resolveEmoji = require("../../../cli-utilities/resolve-emoji");

function createURL(contentType, {
  fieldName = "URL or Path",
  fieldId = "urlOrPath",
  required = true,
  validate = "both",
  emoji = "",
} = {}) {
  const resolvedEmoji = resolveEmoji(emoji);
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