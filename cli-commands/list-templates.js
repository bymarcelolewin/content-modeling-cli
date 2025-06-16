//======================================
// file: list-templates.js
// version: 1.3
// last updated: 06-16-2025
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
const jsonIdx = args.indexOf("--json");
if (jsonIdx !== -1) {
  jsonMode = true;
  args.splice(jsonIdx, 1);
}

// --------------------------------------------
// 📂 Resolve templates directory
// --------------------------------------------
const templatesDir = path.join(loadProjectRoot(), "content-model-templates", "templates");

// --------------------------------------------
// 🧾 Attempt to read and display templates
// --------------------------------------------
try {
  const folders = fs
    .readdirSync(templatesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const name = dirent.name;
      const location = `templates/${name}`;

      const contentTypesPath = path.join(templatesDir, name, "content-types");
      let contentTypes = [];

      if (fs.existsSync(contentTypesPath)) {
        const files = fs
          .readdirSync(contentTypesPath)
          .filter((f) => f.endsWith(".json"));
        contentTypes = files.map((f) => path.basename(f, ".json"));
      }

      return {
        "Template Name": name,
        "Template Location": location,
        "Content Types": contentTypes.length > 0 ? contentTypes.join(", ") : "[none]",
      };
    });

  if (jsonMode) {
    // Return JSON output without emojis
    process.stdout.write(JSON.stringify({ templates: folders }) + "\n");
    process.exit(0);
  }

  if (folders.length === 0) {
    console.log("⚠️  No templates found in content-model-templates/templates/");
  } else {
    console.log("📁 Available Templates:\n");
    console.table(folders);
  }
} catch (err) {
  if (jsonMode) {
    process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    process.exit(1);
  }
  console.error(`❌ Failed to list templates: ${err.message}`);
  process.exit(1);
}
