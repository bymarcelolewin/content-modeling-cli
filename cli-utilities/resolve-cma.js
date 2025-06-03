//======================================
// file: resolve-cma.js
// version: 1.2
// last updated: 06-03-2025
//======================================

const fs = require("fs");
const path = require("path");
const loadProjectRoot = require("@loadProjectRoot");

// List of allowed CMA hosts (can be expanded as needed)
const VALID_CMA_HOSTS = ["api.contentful.com", "api.eu.contentful.com"];

/**
 * Resolves the CMA host from .cmcli.json or defaults to api.contentful.com
 * @returns {string} - CMA host URL
 */
function resolveCMAHost() {
  const projectRoot = loadProjectRoot();
  const cmcliPath = path.join(projectRoot, ".cmcli.json");

  let host = "api.contentful.com"; // Default

  try {
    const cmcliConfig = JSON.parse(fs.readFileSync(cmcliPath, "utf8"));

    if (cmcliConfig.cmaHost) {
      if (VALID_CMA_HOSTS.includes(cmcliConfig.cmaHost)) {
        host = cmcliConfig.cmaHost;
      } else {
        console.warn(`\n⚠️  No valid cmaHost set .cmcli.json (in your project). Using default: ${host}\n`);
      }
    } else {
      console.warn(`\n⚠️  cmaHost is missing or not set in .cmcli.json (in your project). Using default: ${host}\n`);
    }
  } catch (err) {
    // Silently fail and use default
  }

  return host;
}

module.exports = resolveCMAHost;