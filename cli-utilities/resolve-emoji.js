require("module-alias/register");

const fs = require("fs");
const path = require("path");

let emojis = {};

/**
 * Loads the emojis.json file from the given path, or defaults to process.cwd().
 * Skips loading if SKIP_EMOJI_RESOLUTION is set to "true".
 * @param {string} [emojiPath] - Optional absolute path to emojis.json
 * @returns {Object} - Parsed emoji map
 */
function loadEmojis(emojiPath) {
  if (process.env.SKIP_EMOJI_RESOLUTION === "true") return {};

  const finalPath = emojiPath || path.resolve(process.cwd(), "../emojis.json"); 

  if (!fs.existsSync(finalPath)) {
    throw new Error(`❌ emojis.json not found at expected path: ${finalPath}`);
  }

  return JSON.parse(fs.readFileSync(finalPath, "utf-8"));
}

/**
 * Resolves an emoji from a direct character or a path like "emoji.field.developer".
 * @param {string} emoji - Emoji character or emoji path
 * @param {string} [emojiPath] - Optional path to emojis.json (resolved externally or via cwd)
 * @returns {string}
 */
function resolveEmoji(emoji, emojiPath) {
  if (!emojis || Object.keys(emojis).length === 0) {
    emojis = loadEmojis(emojiPath);
  }

  if (!emoji || typeof emoji !== "string") return "";

  // Handle dot-path like "emoji.field.developer"
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

  // Handle literal emoji (basic check)
  if (/^[\p{Emoji}\u200d]+$/u.test(emoji)) {
    return emoji;
  }

  throw new Error(
    `resolveEmoji: Invalid emoji value. Must be a real emoji character or a valid "emoji.<type>.<name>" path. Received: "${emoji}"`
  );
}

module.exports = resolveEmoji;