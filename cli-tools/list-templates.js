//======================================
// file: list-templates.js
// version: 1.1
// last updated: 05-22-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");

// ✅ Updated path to new templates directory
const loadProjectRoot = require("@loadProjectRoot");
const templatesDir = path.join(loadProjectRoot(), "content-model-templates", "templates");

try {
  const folders = fs
    .readdirSync(templatesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const name = dirent.name;
      const location = `templates/${dirent.name}`;

      const contentTypesPath = path.join(
        templatesDir,
        dirent.name,
        "content-types"
      );
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
        "Content Types":
          contentTypes.length > 0 ? contentTypes.join(", ") : "[none]",
      };
    });

  if (folders.length === 0) {
    console.log("No templates found in templates/ folder.");
  } else {
    console.table(folders);
  }
} catch (err) {
  console.error(`❌ Failed to list templates: ${err.message}`);
  process.exit(1);
}