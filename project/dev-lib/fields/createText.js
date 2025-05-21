const resolveEmoji = require("../../../cli-utilities/resolve-emoji");

function createText(contentType, {
  fieldName = "Description",
  fieldId = "description",
  required = false,
  textType = "single-line",
  emoji = "",
} = {}) {
  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  let fieldDefinition;
  let widget;

  switch (textType) {
    case "single-line":
      fieldDefinition = { name, type: "Symbol", required };
      widget = "singleLine";
      break;

    case "multi-line":
      fieldDefinition = { name, type: "Text", required };
      widget = "multipleLine";
      break;

    case "markdown":
      fieldDefinition = { name, type: "Text", required };
      widget = "markdown";
      break;

    case "rich-text":
      fieldDefinition = { name, type: "RichText", required };
      widget = "richTextEditor";
      break;

    default:
      throw new Error(`createText: Unknown type "${textType}". Valid options are single-line, multi-line, markdown, rich-text.`);
  }

  contentType.createField(fieldId, fieldDefinition);
  contentType.changeFieldControl(fieldId, "builtin", widget);
}

module.exports = {
  createText,
};