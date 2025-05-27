//======================================
// file: createReference.js
// version: 2.0
// last updated: 05-27-2025
//======================================

const resolveEmoji = require("@resolve-emoji");

/**
 * Returns a CMA-compatible reference field for entries.
 *
 * @param {Object} options
 * @param {string} options.fieldId - ID of the field
 * @param {string} options.fieldName - Name of the field
 * @param {string} options.allowedEntries - one, zero-to-one, one-to-many, zero-to-many
 * @param {string[]} options.allowedContentTypes - List of allowed content type IDs
 * @param {string} options.emoji - Optional emoji key or literal
 * @param {string} options.emojiPath - Path to emojis.json
 * @returns {Object} CMA-compatible field definition
 */
function createReference({
  fieldId = "metadata",
  fieldName = "Metadata",
  allowedEntries = "one-to-many",
  allowedContentTypes = [],
  emoji = "",
  emojiPath = undefined,
} = {}) {
  if (
    !Array.isArray(allowedContentTypes) ||
    allowedContentTypes.length === 0
  ) {
    throw new Error(
      `createReference: 'allowedContentTypes' must be a non-empty array of content type IDs.`
    );
  }

  const resolvedEmoji = resolveEmoji(emoji, emojiPath);
  const name = resolvedEmoji ? `${resolvedEmoji} ${fieldName}` : fieldName;

  const linkValidation = [
    {
      linkContentType: allowedContentTypes,
    },
  ];

  switch (allowedEntries) {
    case "one":
      return {
        id: fieldId,
        name,
        type: "Link",
        linkType: "Entry",
        required: true,
        localized: false,
        disabled: false,
        omitted: false,
        validations: linkValidation,
      };

    case "zero-to-one":
      return {
        id: fieldId,
        name,
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        disabled: false,
        omitted: false,
        validations: linkValidation,
      };

    case "one-to-many":
      return {
        id: fieldId,
        name,
        type: "Array",
        required: true,
        localized: false,
        disabled: false,
        omitted: false,
        items: {
          type: "Link",
          linkType: "Entry",
          validations: linkValidation,
        },
        validations: [],
      };

    case "zero-to-many":
      return {
        id: fieldId,
        name,
        type: "Array",
        required: false,
        localized: false,
        disabled: false,
        omitted: false,
        items: {
          type: "Link",
          linkType: "Entry",
          validations: linkValidation,
        },
        validations: [],
      };

    default:
      throw new Error(
        `createReference: 'allowedEntries' must be one of 'one', 'zero-to-one', 'one-to-many', or 'zero-to-many'. Received: '${allowedEntries}'`
      );
  }
}

module.exports = {
  createReference,
};