require("module-alias/register");

const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

// --------------------------------------------
// 🔧 Parse CLI arguments
// --------------------------------------------
const args = process.argv.slice(2);
const templateFlagIndex = args.indexOf("--template");
const modelFlagIndex = args.indexOf("--model");
const emojisFlagIndex = args.indexOf("--emojis");

const templateName =
  templateFlagIndex !== -1 ? args[templateFlagIndex + 1] : null;
const modelName = modelFlagIndex !== -1 ? args[modelFlagIndex + 1] : null;

const templatesDir = path.join(__dirname, "../project/content-model-templates");
const modelsDir = path.join(__dirname, "../project/content-models");
const emojisSourcePath = path.join(templatesDir, "emojis.json");
const emojisDestPath = path.join(modelsDir, "emojis.json");

// --------------------------------------------
// 🧪 Validate argument combinations
// --------------------------------------------
const usingTemplate = !!templateName;
const usingModel = !!modelName;
const usingEmojis = emojisFlagIndex !== -1;

if (usingEmojis && !(usingTemplate || usingModel)) {
  // ✅ Only copying emojis — allow
  if (fs.existsSync(emojisDestPath)) {
    console.error("❌ emojis.json already exists in content-models/");
    process.exit(1);
  }

  try {
    fs.copyFileSync(emojisSourcePath, emojisDestPath);
    console.log("✅ emojis.json copied to content-models/");
  } catch (err) {
    console.error(`❌ Failed to copy emojis.json: ${err.message}`);
    process.exit(1);
  }

  process.exit(0);
}

if (!usingTemplate || !usingModel) {
  console.error("❌ Please provide both --template and --model arguments.");
  console.error("Usage:");
  console.error("  ccm create-model --template generic --model my-model");
  console.error("  ccm create-model --emojis");
  process.exit(1);
}

const templateFolder = path.join(templatesDir, `${templateName}`);
const modelFolder = path.join(modelsDir, modelName);

// --------------------------------------------
// 📂 Check template folder exists
// --------------------------------------------
if (!fs.existsSync(templateFolder)) {
  console.error(
    `❌ Template folder does not exist: templates/${templateName}`
  );
  process.exit(1);
}

// 🚫 Abort if model folder already exists
if (fs.existsSync(modelFolder)) {
  console.error(`❌ Model folder already exists: content-models/${modelName}`);
  process.exit(1);
}

// --------------------------------------------
// ✅ Copy template to new model folder
// --------------------------------------------
try {
  fse.copySync(templateFolder, modelFolder);
  console.log(
    `✅ Model "${modelName}" created from template "${templateName}"`
  );
} catch (err) {
  console.error(`❌ Failed to copy template: ${err.message}`);
  process.exit(1);
}

// --------------------------------------------
// 😊 Copy emojis.json if --emojis flag is set
// --------------------------------------------
if (emojisFlagIndex !== -1) {
  if (fs.existsSync(emojisDestPath)) {
    console.error("❌ emojis.json already exists in content-models/");
    process.exit(1);
  }

  try {
    fs.copyFileSync(emojisSourcePath, emojisDestPath);
    console.log("✅ emojis.json copied to content-models/");
  } catch (err) {
    console.error(`❌ Failed to copy emojis.json: ${err.message}`);
    process.exit(1);
  }
}