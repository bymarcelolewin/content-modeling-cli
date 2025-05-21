#!/usr/bin/env node

require("module-alias/register");

const { Command } = require('commander');
const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');

const program = new Command();

program
    .name('cm')
    .description(
        chalk.green('CONTENTFUL CONTENT MODELING (ccm) CLI TOOL\n') + 'By Marcelo Lewin - IntelligentContentAcademy.com\nContact me at marcelo@intelligentcontentacademy.com'
    )
    .version('1.0.0');

// ---------------------------------------------
// cm create-model --model <name> --template <template> [--emojis]
// ---------------------------------------------
program
  .command('create-model')
  .description('Creates a content model folder inside content-models using an existing template from templates folder.')
  .option('--model <name>', '[required with --template] The name of the new model folder')
  .option('--template <template>', '[required with --model] The template to use (e.g., "generic")')
  .option('--emojis', 'Copy emojis.json from templates to content-models (fails if already exists)')
  .action((options, command) => {
  const script = path.join(__dirname, 'create-content-model.js');

  const usingModel = typeof options.model !== 'undefined';
  const usingTemplate = typeof options.template !== 'undefined';
  const usingList = options.list === true;
  const usingEmojis = options.emojis === true;

  const args = [];

  // ✅ Mode 1: --model and --template must be used together (optionally with --emojis)
  if (usingModel || usingTemplate) {
    if (!(usingModel && usingTemplate)) {
      console.error('\n❌ You must provide both --model and --template together.\n');
      process.exit(1);
    }
    args.push('--model', options.model, '--template', options.template);
    if (usingEmojis) args.push('--emojis');
  }

  // ✅ Mode 2: --emojis only
  else if (usingEmojis) {
    args.push('--emojis');
  }

  // ❌ Invalid usage
  else {
    console.error('\n❌ You must use one of the following:\n');
    console.error('  - Both --model and --template');
    console.error('  - --emojis');
    process.exit(1);
  }

  spawn('node', [script, ...args], { stdio: 'inherit' });
});

// ---------------------------------------------
// cm push-model --model <name>
// ---------------------------------------------
program
  .command('push-model')
  .description('Pushes an existing content model from the content-models folder to Contentful.')
  .requiredOption('--model <model>', 'Name of the content model folder that contains all your content types, located inside the content-models folder.')
  .action((options) => {
    const script = path.join(__dirname, 'push-content-model.js');
    const args = ['--model', options.model];
    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm add-content-type --model <name> --name <name>
// ---------------------------------------------
program
  .command('add-content-type')
  .description('Adds a new content type to an existing model folder.')
  .requiredOption('--model <model>', 'Name of the existing model folder (inside content-models)')
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
  .description('Delete a content model, including all content types and entries')
  .requiredOption('--model <model>', 'The model folder name to delete')
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
  .action(() => {
    const script = path.join(__dirname, 'list-templates.js');
    spawn('node', [script], { stdio: 'inherit' });
  });

// ---------------------------------------------
// cm list-models
// ---------------------------------------------
program
  .command('list-models')
  .description('List all available content models in the content-models folder')
  .action(() => {
    const script = path.join(__dirname, 'list-content-models.js');
    spawn('node', [script], { stdio: 'inherit' }); // ✅ args removed
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

    if (options.validateFieldRegistry) {
      args.push('--validate-field-registry');
    }

    // If no args passed to --dev, forward --help
    if (args.length === 0) {
      args.push('--help');
    }

    spawn('node', [script, ...args], { stdio: 'inherit' });
  });

// Enhance help output: make command names green
program.configureHelp({
    // Override subcommandTerm to color command names green
    subcommandTerm: (cmd) => chalk.green(cmd.name() + (cmd._alias ? '|' + cmd._alias : '') + (cmd.usage() ? ' ' + cmd.usage() : '')),
});

// Parse arguments
program.parse(process.argv);