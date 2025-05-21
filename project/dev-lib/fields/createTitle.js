const resolveEmoji = require("../../../cli-utilities/resolve-emoji");

function createTitle(contentType, {
  fieldName = "Title",
  fieldId = "title",
  required = true,
  emoji = "",
} = {}) {
  const resolvedEmoji = resolveEmoji(emoji);
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