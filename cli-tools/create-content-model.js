//======================================
// file: create-content-model.js
// version: 1.1
// last updated: 05-22-2025
//======================================

require("module-alias/register");

const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const readline = require("readline");
const loadProjectRoot = require("@loadProjectRoot");

// --------------------------------------------
// 🔧 Parse CLI arguments
// --------------------------------------------
const args = process.argv.slice(2);
const templateFlagIndex = args.indexOf("--template");
const modelFlagIndex = args.indexOf("--model");

const templateName = templateFlagIndex !== -1 ? args[templateFlagIndex + 1] : null;
const modelName = modelFlagIndex !== -1 ? args[modelFlagIndex + 1] : null;

const projectRoot = loadProjectRoot();
const templatesDir = path.join(projectRoot, "content-model-templates");
const templateContentTypesDir = path.join(templatesDir, "templates", templateName, "content-types");
const templateConfigPath = path.join(templatesDir, "templates", templateName, ".contentfulrc.json");

const modelsDir = path.join(projectRoot, "content-models");
const modelFolder = path.join(modelsDir, "models", modelName);
const modelContentTypesDir = path.join(modelFolder, "content-types");
const modelConfigPath = path.join(modelFolder, ".contentfulrc.json");

const emojisSourcePath = path.join(templatesDir, "emojis.json");
const emojisDestPath = path.join(modelsDir, "emojis.json");

const componentsSourceDir = path.join(templatesDir, "components");
const componentsDestDir = path.join(modelsDir, "components");

// Summary tracking
let copiedComponents = [];
let skippedComponents = [];
let overwrittenComponents = [];
let skippedEmojis = false;
let copiedEmojis = false;
let overwrittenEmojis = false;
let copiedConfig = false;

// --------------------------------------------
// 🔄 Helper: Prompt for yes/no
// --------------------------------------------
const promptYesNo = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question + " (y/n): ", (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
};

// --------------------------------------------
// 🧪 Validate arguments
// --------------------------------------------
if (!templateName || !modelName) {
  console.error("❌ Please provide both --template and --model arguments.");
  console.error("Usage:");
  console.error("  ccm create-model --template simple-blog --model myblog");
  process.exit(1);
}

// --------------------------------------------
// 📂 Check template content-types folder exists
// --------------------------------------------
if (!fs.existsSync(templateContentTypesDir)) {
  console.error(`❌ Template folder does not exist: templates/${templateName}`);
  process.exit(1);
}

// 🚫 Abort if model folder already exists
if (fs.existsSync(modelFolder)) {
  console.error(`❌ Model folder already exists: models/${modelName}`);
  process.exit(1);
}

// --------------------------------------------
// ✅ Copy template content-types to new model folder
// --------------------------------------------
try {
  fse.copySync(templateContentTypesDir, modelContentTypesDir);
} catch (err) {
  console.error(`❌ Failed to copy template: ${err.message}`);
  process.exit(1);
}

// --------------------------------------------
// 📦 Copy .contentfulrc.json from template
// --------------------------------------------
if (fs.existsSync(templateConfigPath)) {
  try {
    fs.copyFileSync(templateConfigPath, modelConfigPath);
    copiedConfig = true;
  } catch (err) {
    console.error(`❌ Failed to copy .contentfulrc.json: ${err.message}`);
    process.exit(1);
  }
}

// --------------------------------------------
// 📦 Copy emojis.json (if available)
// --------------------------------------------
(async () => {
  if (fs.existsSync(emojisSourcePath)) {
    if (!fs.existsSync(emojisDestPath)) {
      fs.copyFileSync(emojisSourcePath, emojisDestPath);
      copiedEmojis = true;
    } else {
      const sourceStat = fs.statSync(emojisSourcePath);
      const destStat = fs.statSync(emojisDestPath);

      if (sourceStat.mtime > destStat.mtime) {
        const overwrite = await promptYesNo("⚠️ emojis.json already exists and is older. Overwrite?");
        if (overwrite) {
          fs.copyFileSync(emojisSourcePath, emojisDestPath);
          overwrittenEmojis = true;
        } else {
          skippedEmojis = true;
        }
      } else {
        skippedEmojis = true;
      }
    }
  }

  // --------------------------------------------
  // 📦 Copy components folder
  // --------------------------------------------
  if (fs.existsSync(componentsSourceDir)) {
    if (!fs.existsSync(componentsDestDir)) {
      fs.mkdirSync(componentsDestDir, { recursive: true });
    }

    const files = fs.readdirSync(componentsSourceDir).filter(f => f.endsWith(".json"));

    for (const file of files) {
      const srcFile = path.join(componentsSourceDir, file);
      const destFile = path.join(componentsDestDir, file);

      if (!fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
        copiedComponents.push(file);
      } else {
        const srcStat = fs.statSync(srcFile);
        const destStat = fs.statSync(destFile);

        if (srcStat.mtime > destStat.mtime) {
          const overwrite = await promptYesNo(`⚠️ Component "${file}" already exists and is older. Overwrite?`);
          if (overwrite) {
            fs.copyFileSync(srcFile, destFile);
            overwrittenComponents.push(file);
          } else {
            skippedComponents.push(file);
          }
        } else {
          skippedComponents.push(file);
        }
      }
    }
  }

  // --------------------------------------------
  // 🧾 Final Summary
  // --------------------------------------------
  console.log("\n=============");
  console.log("Summary");
  console.log("=============");

  console.log(`✅ Model "${modelName}" created from template "${templateName}"`);
  if (copiedConfig) console.log("✅ Copied .contentfulrc.json to model folder");

  if (copiedEmojis) console.log("✅ Copied emojis.json");
  if (overwrittenEmojis) console.log("⚠️ Overwritten emojis.json");
  if (skippedEmojis) console.log("⚠️ Skipped emojis.json");

  if (copiedComponents.length)
    console.log(`✅ Copied components: ${copiedComponents.join(", ")}`);
  if (overwrittenComponents.length)
    console.log(`⚠️ Overwritten components: ${overwrittenComponents.join(", ")}`);
  if (skippedComponents.length)
    console.log(`⚠️ Skipped components: ${skippedComponents.join(", ")}`);

  console.log(""); // newline
})();