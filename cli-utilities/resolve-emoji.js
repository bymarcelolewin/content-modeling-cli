//======================================
// file: resolve-emoji.js
// version: 1.2
// last updated: 06-02-2025
//======================================

const fs = require("fs");
const path = require("path");
const loadProjectRoot = require("@loadProjectRoot");

let emojis = {};

/**
 * Loads the emojis.json file from the default content-models root.
 * Skips loading if SKIP_EMOJI_RESOLUTION is set to "true".
 * @returns {Object} - Parsed emoji map
 */
function loadEmojis() {
  if (process.env.SKIP_EMOJI_RESOLUTION === "true") return {};

  const projectRoot = loadProjectRoot();
  const emojiPath = path.join(projectRoot, "content-models", "emojis.json");

  if (!fs.existsSync(emojiPath)) {
    throw new Error(`❌ emojis.json not found at expected path: ${emojiPath}`);
  }

  return JSON.parse(fs.readFileSync(emojiPath, "utf-8"));
}

/**
 * Resolves an emoji from a direct character or a path like "emoji.field.developer".
 * @param {string} emoji - Emoji character or emoji path
 * @returns {string}
 */
function resolveEmoji(emoji) {
  if (!emojis || Object.keys(emojis).length === 0) {
    emojis = loadEmojis();
  }

  if (!emoji || typeof emoji !== "string") return "";

  if (emoji.startsWith("emoji.")) {
    const parts = emoji.split(".");
    if (parts.length !== 3 || parts[0] !== "emoji") {
      throw new Error(
        `resolveEmoji: Invalid format. Expected "emoji.<type>.<name>". Received: "${emoji}"`
      );
    }

    const [, type, name] = parts;

    if (!emojis[type]) {
      throw new Error(
        `resolveEmoji: Unknown emoji type "${type}". Valid types: ${Object.keys(emojis).join(", ")}`
      );
    }

    if (!emojis[type][name]) {
      throw new Error(
        `resolveEmoji: Unknown emoji name "${name}" in type "${type}". Valid names: ${Object.keys(emojis[type]).join(", ")}`
      );
    }

    return emojis[type][name];
  }

  if (/^[\p{Emoji}\u200d]+$/u.test(emoji)) {
    return emoji;
  }

  throw new Error(
    `resolveEmoji: Invalid emoji value. Must be a real emoji character or a valid "emoji.<type>.<name>" path. Received: "${emoji}"`
  );
}

module.exports = resolveEmoji;