//======================================
// file: list-content-models.js
// version: 1.0
// last updated: 05-25-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");

// ✅ New path to models directory
const MODELS_DIR = path.join(__dirname, "../project/content-models/models");

function getContentModelFolders() {
  return fs.readdirSync(MODELS_DIR).filter((item) => {
    const fullPath = path.join(MODELS_DIR, item);
    return fs.statSync(fullPath).isDirectory();
  });
}

function main() {
  const folders = getContentModelFolders();
  console.log("CONTENT MODELS");
  folders.forEach((folder) => console.log(folder));
}

main();