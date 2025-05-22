//======================================
// file: init-project.js
// version: 1.0
// last updated: 05-22-2025
//======================================

const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const normalizeProjectName = require("../cli-utilities/normalize-project-name");

// --------------------------------------------
// 🧾 Parse CLI arguments
// --------------------------------------------
const args = process.argv.slice(2);
const nameIndex = args.indexOf("--name");

if (nameIndex === -1 || !args[nameIndex + 1]) {
  console.error("❌ Usage: cm init --name \"Project Name\"");
  process.exit(1);
}

const originalName = args[nameIndex + 1];
let folderName;

try {
  folderName = normalizeProjectName(originalName);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

// --------------------------------------------
// 📁 Paths
// --------------------------------------------
const templateDir = path.join(__dirname, "../cli-project-template");
const destDir = path.join(process.cwd(), folderName);

// --------------------------------------------
// 🚧 Check if folder already exists
// --------------------------------------------
if (fs.existsSync(destDir)) {
  console.error(`❌ Folder "${folderName}" already exists. Please choose a different name.`);
  process.exit(1);
}

// --------------------------------------------
// 📦 Copy base template (2 folders + config file)
// --------------------------------------------
try {
  // Copy folders
  fse.copySync(path.join(templateDir, "content-models"), path.join(destDir, "content-models"));
  fse.copySync(path.join(templateDir, "content-model-templates"), path.join(destDir, "content-model-templates"));

  // Read, update, and write .cmcli.json
  const configPath = path.join(templateDir, ".cmcli.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  config.projectName = originalName;
  config.projectFolder = folderName;

  fs.writeFileSync(
    path.join(destDir, ".cmcli.json"),
    JSON.stringify(config, null, 2),
    "utf-8"
  );
} catch (err) {
  console.error("❌ Failed to initialize project:", err.message);
  process.exit(1);
}