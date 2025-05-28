//======================================
// file: dev.js
// version: 1.1
// last updated: 05-28-2025
//======================================

require("module-alias/register");

// ✅ Set flag to skip emoji loading in dev mode
process.env.SKIP_EMOJI_RESOLUTION = "true";

const path = require("path");

//
// ✅ Extract subcommand args
//
const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  console.log(`
🛠️  Developer Tools (cm dev)

Usage:
  cm dev --validate-field-registry   Validate field-registry.json

More dev tools coming soon...
  `);
  process.exit(0);
}

//
// ✅ Handle --validate-field-registry
//
if (args.includes("--validate-field-registry")) {
  const { validateFieldRegistry } = require("@validateRegistry");

  try {
    validateFieldRegistry();
  } catch (err) {
    console.error(`❌ Developer validation failed: ${err.message}`);
    process.exit(1);
  }

  process.exit(0);
}

//
// ❌ Unknown dev command
//
console.error("❌ Unknown dev command.");
console.log('Try: cm dev --help');
process.exit(1);