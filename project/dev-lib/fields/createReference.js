//======================================
// file: createReference.js
// version: 1.0
// last updated: 05-25-2025
//======================================

const resolveEmoji = require("../../../cli-utilities/resolve-emoji");

function createReference(contentType, {
  fieldId = "metadata",
  fieldName = "Metadata",
  allowedEntries = "one-to-many",
  allowedContentTypes = [],
  emoji = "",
} = {}) {
  if (!Array.isArray(allowedContentTypes) || allowedContentTypes.length === 0) {
    throw new Error(`createReference: 'allowedContentTypes' must be a non-empty array of content type IDs.`);
  }

  const resolvedEmoji = resolveEmoji(emoji);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  const linkValidation = [
    {
      linkContentType: allowedContentTypes,
    },
  ];

  switch (allowedEntries) {
    case "one":
      contentType.createField(fieldId, {
        name,
        type: "Link",
        linkType: "Entry",
        validations: linkValidation,
        required: true,
      });
      contentType.changeFieldControl(fieldId, "builtin", "entryLinkEditor");
      break;

    case "zero-to-one":
      contentType.createField(fieldId, {
        name,
        type: "Link",
        linkType: "Entry",
        validations: linkValidation,
        required: false,
      });
      contentType.changeFieldControl(fieldId, "builtin", "entryLinkEditor");
      break;

    case "one-to-many":
      contentType.createField(fieldId, {
        name,
        type: "Array",
        items: {
          type: "Link",
          linkType: "Entry",
          validations: linkValidation,
        },
        required: true,
      });
      contentType.changeFieldControl(fieldId, "builtin", "entryLinksEditor");
      break;

    case "zero-to-many":
      contentType.createField(fieldId, {
        name,
        type: "Array",
        items: {
          type: "Link",
          linkType: "Entry",
          validations: linkValidation,
        },
        required: false,
      });
      contentType.changeFieldControl(fieldId, "builtin", "entryLinksEditor");
      break;

    default:
      throw new Error(
        `createReference: 'allowedEntries' must be one of 'one', 'zero-to-one', 'one-to-many', or 'zero-to-many'. Received: '${allowedEntries}'`
      );
  }
}

module.exports = {
  createReference,
};