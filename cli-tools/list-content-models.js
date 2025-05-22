//======================================
// file: list-content-models.js
// version: 1.2
// last updated: 05-22-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");

const loadProjectRoot = require("@loadProjectRoot");
const MODELS_DIR = path.join(loadProjectRoot(), "content-models", "models");

function getContentModelFolders() {
  if (!fs.existsSync(MODELS_DIR)) {
    return [];
  }

  return fs.readdirSync(MODELS_DIR).filter((item) => {
    const fullPath = path.join(MODELS_DIR, item);
    return fs.statSync(fullPath).isDirectory();
  });
}

function main() {
  const folders = getContentModelFolders();

  if (folders.length === 0) {
    console.log("No content models found.");
    return;
  }

  console.log("CONTENT MODELS");
  folders.forEach((folder) => console.log(folder));
}

main();