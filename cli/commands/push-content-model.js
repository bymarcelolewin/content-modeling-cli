//======================================
// file: push-content-model.js
// version: 3.25
// last updated: 06-02-2025
//======================================

require("module-alias/register");

const path = require("path");
const fs = require("fs");
const readline = require("readline");
const contentful = require("contentful-management");

const resolveEmoji = require("@resolve-emoji");
const { expandComponents } = require("@expand");
const loadProjectRoot = require("@loadProjectRoot");
const fieldRegistry = require("@fields/field-registry.json");

// --------------------------------------------
// 🧠 Prompt utility
// --------------------------------------------
function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    })
  );
}

// --------------------------------------------
// 🧠 Parse CLI arguments
// --------------------------------------------
const args = process.argv.slice(2);
const modelFlagIndex = args.indexOf("--model");
const modelName = modelFlagIndex !== -1 ? args[modelFlagIndex + 1] : null;
const isForce = args.includes("--force");
const isDryRun = !isForce;

if (!modelName) {
  console.error("❌ Please provide a content model using --model");
  console.error("Usage: cm push-model --model [model-name] [--force]");
  process.exit(1);
}

// --------------------------------------------
// 🛠 Resolve paths
// --------------------------------------------
const projectRoot = loadProjectRoot();
const modelFolder = path.join(projectRoot, "content-models", "models", modelName);
const contentTypesFolder = path.join(modelFolder, "content-types");
const componentsFolder = path.join(projectRoot, "content-models", "components");
const configPath = path.join(modelFolder, ".contentfulrc.json");

// --------------------------------------------
// 🔐 Load and validate environment config
// --------------------------------------------
let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch (err) {
  console.error(`❌ Error reading .contentfulrc.json: ${err.message}`);
  process.exit(1);
}

const { managementToken, activeSpaceId, activeEnvironmentId } = config;

const isPlaceholder = (val) =>
  !val || val.includes("your-contentful") || val.includes("your-cma-token");

if (
  isPlaceholder(managementToken) ||
  isPlaceholder(activeSpaceId) ||
  isPlaceholder(activeEnvironmentId)
) {
  console.error("❌ Missing or invalid values in .contentfulrc.json");
  console.error("Please ensure you set:\n");
  console.error("  - managementToken");
  console.error("  - activeSpaceId");
  console.error("  - activeEnvironmentId\n");
  process.exit(1);
}

// Load up host here from .cmcli.json file.
const resolveCMAHost = require("@resolve-cma");
const host = resolveCMAHost();

// --------------------------------------------
// 🔌 Create Contentful Management client
// --------------------------------------------
const client = contentful.createClient({
  accessToken: managementToken,
  host: host,
});

// --------------------------------------------
// 🧱 Build field-type registry map
// --------------------------------------------
const typeToHandler = {};
fieldRegistry.forEach(({ type, function: fn, file }) => {
  const mod = require(`@fields/${file}`);
  if (!mod[fn]) {
    throw new Error(`❌ Function '${fn}' not exported in ${file}`);
  }
  typeToHandler[type] = mod[fn];
});

// --------------------------------------------
// Read content type files
// --------------------------------------------
const files = fs.readdirSync(contentTypesFolder).filter(f => f.endsWith(".json"));
if (files.length === 0) {
  console.error(`❌ No content types found in ${contentTypesFolder}`);
  process.exit(1);
}

// --------------------------------------------
// 🚀 Main push function
// --------------------------------------------
async function push() {
  let space, env;

  try {
    space = await client.getSpace(activeSpaceId);
    env = await space.getEnvironment(activeEnvironmentId);
  } catch {
    console.error("❌ CMA connection failed. Please verify your .contentfulrc.json settings.");
    process.exit(1);
  }

  // --------------------------------------------
  // 🟡 Dry Run vs Force Warning
  // --------------------------------------------
  if (!isDryRun) {
    console.log("\n\x1b[31m************************************************\x1b[0m");
    console.log("🚨 \x1b[1m\x1b[31mREAD THIS! IMPORTANT!\x1b[0m 🚨");
    console.log();
    console.log("You are running the script in --force mode.");
    console.log("This will CREATE the content model in Contentful.");
    console.log("\x1b[31m************************************************\x1b[0m");
  } else {
    console.log("\n\x1b[36m🟡 DRY RUN: No changes will be made. Use --force to apply.\x1b[0m");
  }

  console.log("\n---------------------------------------");
  console.log("CONTENTFUL ENVIRONMENT");
  console.log("---------------------------------------");
  console.log(`Space:         ${space.sys.id}`);
  console.log(`Environment:   ${env.sys.id}`);
  console.log(`Model:         ${modelName}`);

  const envConfirm = await promptUser("\n❓ Is this the correct environment? (yes/no): ");
  if (envConfirm !== "yes") {
    console.log("❌ Aborted by user.");
    return;
  }

  const updates = [];

  for (const file of files) {
    const fullPath = path.join(contentTypesFolder, file);
    const raw = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    raw.emoji = resolveEmoji(raw.emoji);

    const expanded = expandComponents(raw, componentsFolder);
    const { id, name, description, entryField } = expanded;
    const contentTypeId = id;
    const contentTypeName = raw.emoji ? `${raw.emoji} ${name}` : name;

    const fields = expanded.fields.map((field) => {
      const fieldType = field.type;
      const handler = typeToHandler[fieldType];
      if (!handler) {
        throw new Error(`❌ No handler found for type '${fieldType}' in ${file}`);
      }
      return handler(field);
    });

    updates.push({ id: contentTypeId, name: contentTypeName, fields, description, entryField });
  }

  // --------------------------------------------
  // 📋 Display model preview
  // --------------------------------------------
  console.log("\n---------------------------------------");
  console.log("MODEL CHANGES TO BE APPLIED");
  console.log("---------------------------------------");

  updates.forEach((ct) => {
    console.log(`\n>>> ${ct.name} (ID: ${ct.id}) <<<`);
    ct.fields.forEach((f) => {
      console.log(`- ${f.name}`);
    });
  });

  const applyConfirm = await promptUser("\n❓ Are you sure you want to apply these changes? (yes/no): ");
  if (applyConfirm !== "yes") {
    console.log("❌ Aborted by user.");
    return;
  }

  // --------------------------------------------
  // 🛠️ Apply updates to Contentful
  // --------------------------------------------
  const summary = [];

  for (const ctDef of updates) {
    const { id, name, description, entryField, fields } = ctDef;

    try {
      await env.getContentType(id);
      console.log(`🔍 Found existing content type: ${id}`);
      console.log(`🔴  Skipping '${id}' because it already exists.`);
      summary.push({ id, action: "skipped-exists" });
      continue;
    } catch (err) {
      if (err.name === "NotFound") {
        if (isDryRun) {
          console.log(`🟡 [Dry Run] Would create & publish: ${id}`);
          summary.push({ id, action: "dry-run" });
        } else {
          const ct = await env.createContentTypeWithId(id, {
            name,
            description,
            displayField: entryField || "title",
            fields,
          });
          await ct.publish();
          console.log(`🟢 Created & published: ${id}`);
          summary.push({ id, action: "created" });
        }
      } else {
        console.log(`❌ Failed to check/create '${id}': Unknown error`);
        summary.push({ id, action: "failed" });
      }
    }
  }

  // --------------------------------------------
  // ✅ Final summary
  // --------------------------------------------
  console.log("\n---------------------------------------");
  console.log("SUMMARY");
  console.log("---------------------------------------");

  summary.forEach(({ id, action }) => {
    const icon = action === "created"         ? "🟢"
               : action === "dry-run"         ? "🟡"
               : action === "skipped-exists"  ? "🔴"
               : "❌";

    const label = action === "skipped-exists"
      ? "Skipped - Already Exists"
      : action === "dry-run"
      ? "Dry Run – No changes applied"
      : action;

    console.log(`${icon} ${id}: ${label}`);
  });

  console.log("\n🎉 Model push complete.");
  if (isDryRun) {
    console.log("(No changes were made. Use --force to apply changes.)");
  }
}

// --------------------------------------------
// 🚀 Kick off
// --------------------------------------------
push().catch((err) => {
  console.error("❌ Fatal error: Could not complete push process.");
  //console.error(err);
  process.exit(1);
});