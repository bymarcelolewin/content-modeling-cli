//======================================
// file: list-templates.js
// version: 1.2
// last updated: 05-28-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");
const loadProjectRoot = require("@loadProjectRoot");

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

  if (folders.length === 0) {
    console.log("⚠️  No templates found in content-model-templates/templates/");
  } else {
    console.log("📁 Available Templates:\n");
    console.table(folders);
  }
} catch (err) {
  console.error(`❌ Failed to list templates: ${err.message}`);
  process.exit(1);
}