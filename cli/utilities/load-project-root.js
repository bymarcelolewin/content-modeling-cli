//======================================
// file: load-project-root.js
// version: 1.1
// last updated: 05-22-2025
//======================================

const fs = require("fs");
const path = require("path");

function loadProjectRoot() {
  let currentDir = process.cwd();

  while (currentDir !== path.parse(currentDir).root) {
    const configPath = path.join(currentDir, ".cmcli.json");
    if (fs.existsSync(configPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir); // 🔁 Traverse upward
  }

  console.error("❌ Unable to locate .cmcli.json\n");
  console.error("You must run this command inside a valid project folder that contains the .cmcli.json file at its root.\n");
  process.exit(1);
}

module.exports = loadProjectRoot;