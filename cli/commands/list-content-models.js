#!/usr/bin/env node
//======================================
// file: list-content-models.js
// version: 1.9
// last updated: 06-18-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");
const loadProjectRoot = require("@loadProjectRoot");

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

  // Human-friendly output
  if (folders.length === 0) {
    console.log("⚠️  No content models found.");
    process.exit(0);
  }

  console.log("📦 Available Content Models:\n");
  folders.forEach((folder) => console.log(`- ${folder}`));
  console.log(); // trailing newline

} catch (err) {
  console.error(err.message);
  process.exit(1);
}