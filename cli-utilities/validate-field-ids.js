//======================================
// file: validate-field-ids.js
// version: 1.0
// last updated: 05-28-2025
//======================================

/**
 * Validates that all fieldId values in an array of fields are unique.
 *
 * @param {Array<Object>} fields - Array of field definitions
 * @param {string} contentTypeId - ID of the content type being validated
 * @throws {Error} If duplicate field IDs are found
 */
function validateUniqueFieldIds(fields, contentTypeId) {
  const seen = new Set();

  for (const field of fields) {
    if (!field.fieldId) continue;
    if (seen.has(field.fieldId)) {
      throw new Error(
        `❌ Duplicate fieldId "${field.fieldId}" found in content type "${contentTypeId}".\n` +
        `   ➤ This may be caused by an overlapping field in a component.`
      );
    }
    seen.add(field.fieldId);
  }
}

module.exports = {
  validateUniqueFieldIds,
};