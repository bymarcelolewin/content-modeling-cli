#!/usr/bin/env node
//======================================
// file: list-content-models.js
// version: 1.8
// last updated: 06-13-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");
const loadProjectRoot = require("@loadProjectRoot");

// -----------------------------
// Parse flags: --json
// -----------------------------
const args = process.argv.slice(2);
let jsonMode = false;

// detect --json
const jsonIdx = args.indexOf("--json");
if (jsonIdx !== -1) {
  jsonMode = true;
  args.splice(jsonIdx, 1);
}

// determine project root
const MODELS_DIR = path.join(loadProjectRoot(), "content-models", "models");

// --------------------------------------------
// 🔍 Read only directories (models) in the folder
// --------------------------------------------
function getContentModelFolders() {
  if (!fs.existsSync(MODELS_DIR)) return [];
  return fs
    .readdirSync(MODELS_DIR)
    .filter((item) => fs.statSync(path.join(MODELS_DIR, item)).isDirectory());
}

// --------------------------------------------
// 🧾 Main execution
// --------------------------------------------
try {
  const folders = getContentModelFolders();

  if (jsonMode) {
    // JSON object with "models" key
    process.stdout.write(JSON.stringify({ models: folders }) + "\n");
    process.exit(0);
  }

  // Human-friendly output
  if (folders.length === 0) {
    console.log("⚠️  No content models found.");
    process.exit(0);
  }

  console.log("📦 Available Content Models:\n");
  folders.forEach((folder) => console.log(`- ${folder}`));
  console.log(); // trailing newline

} catch (err) {
  if (jsonMode) {
    process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    process.exit(1);
  }
  console.error(err.message);
  process.exit(1);
}
