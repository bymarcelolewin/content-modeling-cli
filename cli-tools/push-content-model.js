//======================================
// file: push-content-model.js
// version: 1.0
// last updated: 05-25-2025
//======================================

require("module-alias/register"); // 🔗 Enable @expand alias

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// --------------------------------------------
// ✅ Load shared utilities
// --------------------------------------------
const resolveEmoji = require("@resolve-emoji");
const { expandComponents } = require("@expand");

//
// ✅ Load field registry and build dynamic handler map
//
const fieldRegistry = require("../project/dev-lib/fields/field-registry.json");

const typeToHandler = {};
fieldRegistry.forEach(({ type, function: functionName, file }) => {
  const fullPath = path.join(__dirname, "..", "project", "dev-lib", "fields", file);
  const module = require(fullPath);

  if (!module[functionName]) {
    throw new Error(`❌ Function "${functionName}" not found in ${file}`);
  }

  typeToHandler[type] = module[functionName];
});

//
// 🔧 Parse --model from arguments
//
const args = process.argv.slice(2);
const modelFlagIndex = args.indexOf("--model");
const modelName = modelFlagIndex !== -1 ? args[modelFlagIndex + 1] : null;

if (!modelName) {
  console.error("❌ Please provide a content model using --model");
  console.error("Usage: node push-content-model.js --model [model-name]");
  process.exit(1);
}

const modelFolder = path.join(__dirname, "../project/content-models/models", modelName);
const contentTypesFolder = path.join(modelFolder, "content-types");
const componentsFolder = path.join(__dirname, "../project/content-models/components");
const emojisPath = path.join(__dirname, "../project/content-models/emojis.json");
const tempModelScriptPath = path.join(modelFolder, "temp-push-content-model.js");

//
// 🧼 Generate temp-push-content-model.js
//
try {
  if (!fs.existsSync(contentTypesFolder)) {
    console.error(`❌ content-types folder does not exist at: ${contentTypesFolder}`);
    process.exit(1);
  }

  if (fs.existsSync(tempModelScriptPath)) {
    fs.unlinkSync(tempModelScriptPath);
    console.log(`🗑️  Deleted existing temp-push-content-model.js in "${modelName}"`);
  }

  const files = fs.readdirSync(contentTypesFolder).filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    console.error(`❌ No .json files found in ${contentTypesFolder}`);
    process.exit(1);
  }

  const contentTypeObjects = files.map((file) => {
    const fullPath = path.join(contentTypesFolder, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const def = JSON.parse(raw);

    def.__filename = file;
    def.emoji = resolveEmoji(def.emoji, emojisPath);

    return expandComponents(def, componentsFolder);
  });

  const tempScript = `const path = require("path");

// ✅ Load field registry
const fieldRegistry = require("../../../dev-lib/fields/field-registry.json");

const typeToHandler = {};
fieldRegistry.forEach(({ type, function: functionName, file }) => {
  const fullPath = path.join(__dirname, "..", "..", "..", "dev-lib", "fields", file);
  const module = require(fullPath);
  if (!module[functionName]) {
    throw new Error(\`❌ Function "\${functionName}" not found in \${file}\`);
  }
  typeToHandler[type] = module[functionName];
});

module.exports = function (migration) {
${contentTypeObjects.map((def) => {
  const varName = `ct_${def.id}`;
  return `
  // 👉 ${def.__filename}
  const ${varName} = migration.createContentType("${def.id}", {
    name: ${JSON.stringify(def.emoji ? def.emoji + " " + def.name : def.name)},
    description: ${JSON.stringify(def.description || "")},
    displayField: ${JSON.stringify(def.entryField || "title")}
  });

  ${JSON.stringify(def.fields, null, 2)}.forEach((field) => {
    const handler = typeToHandler[field.type];
    if (!handler) {
      throw new Error("❌ Unsupported field type: " + field.type + " in ${def.__filename}");
    }
    handler(${varName}, field);
  });`;
}).join("\n")}
};
`;

  fs.writeFileSync(tempModelScriptPath, tempScript);
  console.log("\n---------------------------------------");
  console.log("INITIALIZING");
  console.log("---------------------------------------");
  console.log(`\n>> Generated temp script for installing "${modelName}"`);
} catch (err) {
  console.error(`❌ Failed to generate temp-push-content-model.js: ${err.message}`);
  process.exit(1);
}

//
// 🚀 Run the migration script
//
console.log(`>> Running migration script for installing "${modelName}"...`);
console.log("\n---------------------------------------");
console.log("MIGRATING - CONFIRMATION REQUIRED");
console.log("---------------------------------------");

try {
  execSync(`npx contentful space migration temp-push-content-model.js`, {
    stdio: "inherit",
    cwd: modelFolder,
  });

  console.log(`✅ Migration complete for "${modelName}"`);
  fs.unlinkSync(tempModelScriptPath);
  console.log(`🧹 Deleted temp-push-content-model.js after successful run`);
} catch (err) {
  console.error(`❌ Migration failed: ${err.message}`);
  console.warn(`⚠️ temp-push-content-model.js left in "${modelName}" for inspection`);
}