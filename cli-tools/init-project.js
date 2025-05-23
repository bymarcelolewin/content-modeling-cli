//======================================
// file: init-project.js
// version: 1.2
// last updated: 05-23-2025
//======================================

const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const readline = require("readline");
const { spawnSync } = require("child_process");
const normalizeProjectName = require("../cli-utilities/normalize-project-name");

// --------------------------------------------
// 🧾 Parse CLI arguments
// --------------------------------------------
const args = process.argv.slice(2);
const nameIndex = args.indexOf("--name");
const gitIndex = args.indexOf("--git");

if (nameIndex === -1 || !args[nameIndex + 1]) {
  console.error("❌ Usage: cm init --name \"Project Name\" [--git]");
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
// 🏗️ Function to create project structure
// --------------------------------------------
function createProject() {
  try {
    fse.copySync(path.join(templateDir, "content-models"), path.join(destDir, "content-models"));
    fse.copySync(path.join(templateDir, "content-model-templates"), path.join(destDir, "content-model-templates"));

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
}

// --------------------------------------------
// ✅ Final user feedback
// --------------------------------------------
function finalize(successGit) {
  console.log("\n🎉 Project created successfully.");
  if (gitIndex !== -1) {
    if (successGit) {
      console.log("✅ Git version control initialized at the root of your project.");
      console.log("🚫 Git will not track any of your .contentfulrc.json files.");
    } else {
      console.log("🚫 Git version control was not installed.");
    }
  }
}

// --------------------------------------------
// 🧠 Handle --git logic and prompt if needed
// --------------------------------------------
if (gitIndex !== -1) {
  const gitCheck = spawnSync("git", ["--version"], { stdio: "ignore" });

  if (gitCheck.error) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("\n⚠️ Git is not installed or not available in your PATH.\nWould you like to continue without initializing Git? (y/n) ", (answer) => {
      rl.close();
      if (answer.toLowerCase() === "y") {
        createProject();
        finalize(false);
      } else {
        console.log("❌ Project creation aborted by user.");
        process.exit(1);
      }
    });
  } else {
    createProject();

    try {
      spawnSync("git", ["init"], { cwd: destDir, stdio: "ignore" });

      const gitignorePath = path.join(destDir, ".gitignore");
      const gitignoreContents = `
.DS_Store
**/.contentfulrc.json
      `.trimStart();
      fs.writeFileSync(gitignorePath, gitignoreContents, "utf-8");

      finalize(true);
    } catch (err) {
      console.error("❌ Git initialization failed:", err.message);
      finalize(false);
    }
  }
} else {
  createProject();
  finalize(false);
}