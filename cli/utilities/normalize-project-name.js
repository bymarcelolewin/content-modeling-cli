//======================================
// file: normalize-project-name.js
// version: 1.0
// last updated: 05-22-2025
//======================================

/**
 * Validates and normalizes a project name.
 * - Must start with a letter
 * - Allows letters, numbers, spaces, and dashes
 * - Converts spaces to dashes
 * - Converts to lowercase
 * - Throws an error if invalid
 */

function normalizeProjectName(name) {
  if (!name || typeof name !== "string") {
    throw new Error("❌ Project name must be a non-empty string.");
  }

  const trimmed = name.trim();

  if (!/^[a-zA-Z]/.test(trimmed)) {
    throw new Error("❌ Project name must start with a letter.");
  }

  if (!/^[a-zA-Z0-9 -]+$/.test(trimmed)) {
    throw new Error("❌ Project name can only contain letters, numbers, spaces, and dashes.");
  }

  return trimmed
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

module.exports = normalizeProjectName;