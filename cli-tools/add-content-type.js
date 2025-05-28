//======================================
// file: add-content-type.js
// version: 1.3
// last updated: 05-28-2025
//======================================

require("module-alias/register"); 

const fs = require("fs");
const path = require("path");
const { camelCase } = require("lodash");
const loadProjectRoot = require("@loadProjectRoot");

// --------------------------------------------
// 🧾 Parse CLI arguments
// --------------------------------------------
const args = process.argv.slice(2);
const modelIndex = args.indexOf("--model");
const nameIndex = args.indexOf("--name");

const modelName = modelIndex !== -1 ? args[modelIndex + 1] : null;
const contentTypeName = nameIndex !== -1 ? args[nameIndex + 1] : null;

if (!modelName || !contentTypeName) {
  console.error("❌ Usage: cm add-content-type --model <model-name> --name <Display Name>");
  process.exit(1);
}

// --------------------------------------------
// 🛠 Convert to content type ID (camelCase)
// --------------------------------------------
const contentTypeId = camelCase(contentTypeName);

// --------------------------------------------
// 📦 Load project root from .cmcli.json
// --------------------------------------------
const projectRoot = loadProjectRoot();
const modelFolder = path.join(projectRoot, "content-models", "models", modelName);
const contentTypesFolder = path.join(modelFolder, "content-types");
const filePath = path.join(contentTypesFolder, `${contentTypeId}.json`);

// --------------------------------------------
// ✅ Ensure model and content-types folder exist
// --------------------------------------------
if (!fs.existsSync(modelFolder)) {
  console.error(`❌ Model folder does not exist: ${modelFolder}`);
  process.exit(1);
}

if (!fs.existsSync(contentTypesFolder)) {
  fs.mkdirSync(contentTypesFolder);
}

// --------------------------------------------
// 🚫 Check if content type already exists
// --------------------------------------------
if (fs.existsSync(filePath)) {
  console.error(`❌ Content type already exists: ${filePath}`);
  process.exit(1);
}

// --------------------------------------------
// 📝 Create content type JSON
// --------------------------------------------
const contentTypeDefinition = {
  id: contentTypeId,
  name: contentTypeName,
  emoji: "emoji.contentType.contentblock",
  entryField: "title",
  description: "Describe this content type.",
  fields: [
    {
      type: "global.title"
    }
  ]
};

fs.writeFileSync(filePath, JSON.stringify(contentTypeDefinition, null, 2));
console.log(`✅ Created content-types/${contentTypeId}.json in "${modelName}" model`);