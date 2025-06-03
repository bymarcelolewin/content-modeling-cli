//======================================
// file: list-content-models.js
// version: 1.3
// last updated: 05-28-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");
const loadProjectRoot = require("@loadProjectRoot");

const MODELS_DIR = path.join(loadProjectRoot(), "content-models", "models");

// --------------------------------------------
// 🔍 Read only directories (models) in the folder
// --------------------------------------------
function getContentModelFolders() {
  if (!fs.existsSync(MODELS_DIR)) return [];

  return fs.readdirSync(MODELS_DIR).filter((item) => {
    const fullPath = path.join(MODELS_DIR, item);
    return fs.statSync(fullPath).isDirectory();
  });
}

// --------------------------------------------
// 🧾 Main execution
// --------------------------------------------
function main() {
  const folders = getContentModelFolders();

  if (folders.length === 0) {
    console.log("⚠️  No content models found.");
    return;
  }

  console.log("📦 Available Content Models:\n");
  folders.forEach((folder) => console.log(`- ${folder}`));
  console.log(); // newline
}

main();