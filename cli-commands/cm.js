#!/usr/bin/env node

//======================================
// file: cm.js
// version: 1.12
// last updated: 06-18-2025
//======================================

require("module-alias/register");

const { Command } = require('commander');
const { spawn } = require('child_process');
const path = require('path');
const { pathToFileURL } = require('url');
const chalk = require('chalk');
const figlet = require('figlet'); // ✅ New
const pkg = require('../package.json');
const program = new Command();

// ✅ Show cool ASCII banner
console.log(
  chalk.green(
    figlet.textSync('CM', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  )
);

program
  .name('cm')
  .description(
    chalk.green('Content Modeling MCP Server and CLI') + ' for Contentful ⚠️  BETA\n' +
    '© Copyright 2025 - Red Pill Blue Pill Studios, LLC - All Rights Reserved.\n\n' +
    'Learn more at https://www.contentmodeling.io\n' +
    'For help contact marcelo@contentmodeling.io\n\n' +
    'Licensed for Contentful modeling only. See LICENSE.md in the project or NPM page for full terms.\n\n' +
    'Not associated with Contentful.\n' +
    'Use "as is". No warranty provided.\n\n' +
    '** Do not use in a production environment. **'
  )
  .version(pkg.version);

// ---------------------------------------------
// cm init --name <project name> [--git]
// ---------------------------------------------
program
  .command('init')
  .description('Initialize a new Content Modeling MCP Server and CLI project')
  .requiredOption('--name <project>', 'Name of the new project (e.g., "My Project")')
  .option('--git', 'Initialize Git in the root of the project with a default .gitignore')
  .action((options) => {
    const script = path.join(__dirname, 'init-project.js');
    const args = ['--name', options.name];
    if (options.git) args.push('--git');
    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm create-model --model <name> --template <template>
// ---------------------------------------------
program
  .command('create-model')
  .description('Creates a content model folder inside content-models/models using an existing template from templates folder.')
  .option('--model <name>', '[required with --template] The name of the new model folder')
  .option('--template <template>', '[required with --model] The template to use (e.g., "simple-blog")')
  .action((options) => {
    const script = path.join(__dirname, 'create-content-model.js');
    const usingModel = Boolean(options.model);
    const usingTemplate = Boolean(options.template);
    if (!(usingModel && usingTemplate)) {
      console.error('\n❌ You must provide both --model and --template together.\n');
      console.error('Usage:');
      console.error('  cm create-model --template <template> --model <name>\n');
      process.exit(1);
    }
    const args = ['--model', options.model, '--template', options.template];
    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm push-model --model <name> [--force]
// ---------------------------------------------
program
  .command('push-model')
  .description('Pushes an existing content model from the content-models/models folder to Contentful.')
  .requiredOption('--model <model>', 'Name of the content model folder')
  .option('--force', 'Actually push the model to Contentful (dry run by default)')
  .action((options) => {
    const script = path.join(__dirname, 'push-content-model.js');
    const args = ['--model', options.model];
    if (options.force) args.push('--force');
    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm add-content-type --model <name> --name <name>
// ---------------------------------------------
program
  .command('add-content-type')
  .description('Adds a new content type to an existing model folder.')
  .requiredOption('--model <model>', 'Name of the existing model folder')
  .requiredOption('--name <name>', 'Display name for the new content type (e.g., "Article - Blog")')
  .action((options) => {
    const script = path.join(__dirname, 'add-content-type.js');
    const args = ['--model', options.model, '--name', options.name];
    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm delete-model --model <name> [--force]
// ---------------------------------------------
program
  .command('delete-model')
  .description('Delete a content model in Contentful, including all content types and entries')
  .requiredOption('--model <model>', 'The model to delete')
  .option('--force', 'Actually delete content (dry run by default)')
  .action((options) => {
    const script = path.join(__dirname, 'delete-content-model.js');
    const args = ['--model', options.model];
    if (options.force) args.push('--force');
    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm list-templates
// ---------------------------------------------
program
  .command('list-templates')
  .description('List all available content model templates and their content types')
  .action((options) => {
    const script = path.join(__dirname, 'list-templates.js');
    spawn('node', [script], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm list-models
// ---------------------------------------------
program
  .command('list-models')
  .description('List all available content models in the content-models/models folder')
  .action((options) => {
    const script = path.join(__dirname, 'list-content-models.js');
    spawn('node', [script], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm dev [--validate-field-registry]
// ---------------------------------------------
program
  .command('dev')
  .description('Run developer-only utilities for validating and debugging field definitions')
  .option('--validate-field-registry', 'Validate field-registry.json file and functions')
  .action((options) => {
    const script = path.join(__dirname, 'dev.js');
    const args = [];
    if (options.validateFieldRegistry) args.push('--validate-field-registry');
    if (args.length === 0) args.push('--help');
    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm mcp-server [--project-path <path>]
// ---------------------------------------------
program
  .command('mcp-server')
  .description('Runs the MCP server over stdio for Claude or other MCP clients')
  .option('--project-path <path>', 'Set the project directory for the MCP server')
  .action(async (options) => {
    try {   
      const fileUrl = pathToFileURL(path.join(__dirname, '../mcp-server/index.mjs')).href;
      const { runMcpServer } = await import(fileUrl);
      
      // Pass the project-path option to the MCP server
      const serverOptions = {};
      if (options.projectPath) {
        serverOptions.projectPath = options.projectPath;
      }
      
      await runMcpServer(serverOptions);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

// Enhance help output: make command names green
program.configureHelp({
  subcommandTerm: (cmd) =>
    chalk.green(
      cmd.name() +
      (cmd._alias ? '|' + cmd._alias : '') +
      (cmd.usage() ? ' ' + cmd.usage() : '')
    ),
});

program.parse(process.argv);