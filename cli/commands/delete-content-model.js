//======================================
// file: delete-content-model.js
// version: 1.5
// last updated: 05-28-2025
//======================================

require("module-alias/register");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const contentful = require("contentful-management");
const loadProjectRoot = require("@loadProjectRoot");

// --------------------------------------------
// 🔧 Parse arguments
// --------------------------------------------
const args = process.argv.slice(2);
const isForce = args.includes("--force");
const modelIndex = args.indexOf("--model");
const modelArg = modelIndex !== -1 ? args[modelIndex + 1] : null;
const isDryRun = !isForce;

if (!modelArg) {
  console.error("❌ Please specify a content model name using --model");
  process.exit(1);
}

// --------------------------------------------
// 🛑 Warn user they are not in dry-mode
// --------------------------------------------
if (!isDryRun) {
  console.log(
    "\n\x1b[31m************************************************\x1b[0m"
  );
  console.log("🚨 \x1b[1m\x1b[31mREAD THIS! IMPORTANT!\x1b[0m 🚨");
  console.log();
  console.log("You are running the script in --force mode.");
  console.log("This will DELETE YOUR ENTIRE content model.");
  console.log("There is no going back from this.");
  console.log(
    "\x1b[31m************************************************\x1b[0m"
  );
  console.log("\x1b[0m");
} else {
  console.log("\n\x1b[36m💡 DRY RUN: No changes will be made. Use --force to apply.\x1b[0m\n");
}

// --------------------------------------------
// 🗂️ Resolve paths using project root
// --------------------------------------------
const projectRoot = loadProjectRoot();
const modelPath = path.join(projectRoot, "content-models", "models", modelArg);
const configPath = path.join(modelPath, ".contentfulrc.json");

// --------------------------------------------
// 🧾 Load config from .contentfulrc.json
// --------------------------------------------
let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch (err) {
  console.error(`❌ Error reading .contentfulrc.json: ${err.message}`);
  process.exit(1);
}

const { managementToken, activeSpaceId, activeEnvironmentId } = config;

if (!managementToken || !activeSpaceId || !activeEnvironmentId) {
  console.error("❌ Missing required fields in .contentfulrc.json");
  process.exit(1);
}

// Load up host here from .cmcli.json file.
const resolveCMAHost = require("@resolve-cma");
const host = resolveCMAHost();

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

async function deleteAllContentTypes() {
  const client = contentful.createClient({
    accessToken: managementToken,
    host: host,
  });

  try {
    const space = await client.getSpace(activeSpaceId);
    const environment = await space.getEnvironment(activeEnvironmentId);

    console.log("---------------------------------------");
    console.log("CONTENTFUL ENVIRONMENT");
    console.log("---------------------------------------");
    console.log(`Space:         ${space.sys.id}`);
    console.log(`Environment:   ${environment.sys.id}`);
    console.log(`Model:         ${modelArg}`);

    const envConfirm = await promptUser(
      "\n❓ Is this the correct environment? (yes/no): "
    );
    if (envConfirm !== "yes") {
      console.log("❌ Aborted by user.");
      return;
    }

    const contentTypes = await environment.getContentTypes();

    if (contentTypes.items.length === 0) {
      console.log("✅ No content types found to delete.");
      return;
    }

    const typesWithEntries = [];
    const typesWithoutEntries = [];
    const contentTypeEntryCounts = {};
    const entriesToDelete = {};

    console.log("\n---------------------------------------");
    console.log("MODEL DETAILS");
    console.log("---------------------------------------");

    for (const ct of contentTypes.items) {
      const ctId = ct.sys.id;
      const entries = await environment.getEntries({ content_type: ctId, limit: 1 });
      const count = entries.total;
      contentTypeEntryCounts[ctId] = count;

      if (count > 0) {
        typesWithEntries.push(ct);
      } else {
        typesWithoutEntries.push(ct);
      }
    }

    if (typesWithEntries.length > 0) {
      console.log("🚫 CONTENT TYPES WITH ENTRIES\n");
      typesWithEntries.forEach((ct) => {
        const id = ct.sys.id;
        const count = contentTypeEntryCounts[id] || 0;
        console.log(`>> ${ct.name} (ID: ${id}) (Total Entries: ${count})`);
      });
    }

    if (typesWithoutEntries.length > 0) {
      console.log("✅ CONTENT TYPES WITH NO ENTRIES\n");
      typesWithoutEntries.forEach((ct) => {
        console.log(`>> ${ct.name} (ID: ${ct.sys.id})`);
      });
    }

    let confirmedDeleteEntries = false;

    if (typesWithEntries.length > 0) {
      const confirm = await promptUser(
        "\n⚠️  Do you want to delete ALL entries in the\ncontent types above (including archived,\ndraft, published)? (yes/no): "
      );
      if (confirm === "yes") {
        confirmedDeleteEntries = true;

        for (const ct of typesWithEntries) {
          const ctId = ct.sys.id;
          const response = await environment.getEntries({
            content_type: ctId,
            limit: 1000,
            include: 0,
          });
          entriesToDelete[ctId] = response.items;
        }
      } else {
        console.log(
          "\n🔴 Skipping deletion of entries. Those content types will NOT be deleted."
        );
      }
    }

    const deletableTypes = confirmedDeleteEntries
      ? [...typesWithEntries, ...typesWithoutEntries]
      : typesWithoutEntries;

    if (deletableTypes.length === 0) {
      console.log("\n🛑 No content types can be deleted at this time.");
      return;
    }

    console.log("\n---------------------------------------");
    console.log("CONTENT TYPES TO DELETE");
    console.log("---------------------------------------");
    deletableTypes.forEach((ct) => {
      const id = ct.sys.id;
      const count = contentTypeEntryCounts[id] || 0;
      const entryInfo = count > 0 ? ` with ${count} entries` : "";
      console.log(`- ${ct.name} (ID: ${id})${entryInfo}`);
    });

    const confirmDelete1 = await promptUser(
      "\n⚠️  Are you sure you want to delete ALL\nthe content types above? (yes/no): "
    );
    if (confirmDelete1 !== "yes") {
      console.log("❌ Aborted by user.");
      return;
    }

    const confirmDelete2 = await promptUser(
      '\n⚠️  Please type "delete all" to confirm\nfinal deletion: '
    );
    if (confirmDelete2 !== "delete all") {
      console.log("❌ Final confirmation failed. No content types were deleted.");
      return;
    }

    // 🔥 Begin actual deletions
    console.log("\n---------------------------------------");
    console.log(`DELETING PROCESS STARTED ${isDryRun ? "(Dry Run)" : ""}`);
    console.log("---------------------------------------");

    if (confirmedDeleteEntries) {
      for (const ct of typesWithEntries) {
        const ctId = ct.sys.id;
        const ctName = ct.name;
        const entries = entriesToDelete[ctId] || [];

        console.log(`\n🛑 Deleting entries for ${ctName} (${ctId})`);

        for (const entry of entries) {
          const entryId = entry.sys.id;
          let label = "N/A";
          const fields = entry.fields || {};
          const locales = Object.keys(fields.title || fields.name || {}) || [];

          if (locales.length > 0) {
            const candidate =
              fields.title?.[locales[0]] ||
              fields.name?.[locales[0]] ||
              Object.values(fields)[0]?.[locales[0]];
            if (typeof candidate === "string") label = candidate;
          }

          console.log(`>> "${label}" - (ID: ${entryId})`);

          if (isDryRun) continue;

          try {
            if (entry.isArchived()) {
              await entry.unarchive();
              console.log(`   🔄 Unarchived`);
            }
            if (entry.isPublished()) {
              await entry.unpublish();
              console.log(`   🔄 Unpublished`);
            }
            await entry.delete();
            console.log(`   ✅ Deleted`);
          } catch (err) {
            console.error(`⚠️ Failed to delete entry ${entryId}: ${err.message}`);
          }
        }
      }
    }

    for (const ct of deletableTypes) {
      const id = ct.sys.id;
      console.log(`\n🛑 Deleting content type ${ct.name} (${id})`);

      if (isDryRun) continue;

      try {
        if (ct.isPublished()) {
          await ct.unpublish();
          console.log(`   🔄 Unpublished`);
        }
        await ct.delete();
        console.log(`   ✅ Deleted`);
      } catch (err) {
        console.error(`⚠️ Could not delete ${id}: ${err.message}`);
      }
    }

    console.log(
      `\n✅ ${
        isDryRun
          ? "Dry run complete. No changes were made."
          : "Finished deleting entries and content types."
      }`
    );
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
  }
}

deleteAllContentTypes();