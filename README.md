![Content Modeling CLI for Contentful](cli-assets/cmcli-logo.png)

© Copyright 2025 - Red Pill Blue Pill Studios, LLC - All Rights Reseved.

**NOT associated with Contentful** - Learn more at [Intelligent Content Academy](https://www.intelligentcontentacademy.com/)

[![License: Custom](https://img.shields.io/badge/license-Custom-lightgrey)](./LICENSE.md)
![Version: 1.0.0-beta.1](https://img.shields.io/badge/version-1.0.0--beta.1-blue)
[![npm version](https://img.shields.io/npm/v/content-modeling-cli.svg)](https://www.npmjs.com/package/content-modeling-cli)

⚠️ BETA – A CLI tool for content modeling in Contentful, purpose-built for content modeling architects and teams working in Contentful.

Define content types, fields, and relationships using clean, structured JSON—no scripting or programming required. Create reusable components with predefined options and default values, and apply them across models for consistency and speed.

Templatize entire content models, enhance clarity with emoji support via a centralized library, and organize your work using a project-based structure. 

With built-in Git support, you can version, track, and collaborate on your models just like code—making your modeling process scalable, maintainable, and team-friendly.

Spend less time clicking through the UI and more time designing scalable, reusable content models—fast.

## Key Features

- **No-Code Content Modeling**  
  Define content types, fields, and relationships using clean, structured JSON—no scripting or programming required.

- **Reusable Components with Defaults**  
  Create reusable field groups (components) that include predefined options and default values (e.g., a multi-select field with default selections) for fast, consistent reuse across content models.

- **Model Templatization**  
  Clone and reuse complete content models from predefined templates to accelerate setup and ensure governance, consistency, and scalability.

- **Project-Based Organization**  
  Use `cm init` to scaffold distinct Content Modeling projects—each containing multiple content models, templates, and localized configurations. Ideal for managing multiple clients, sites, or environments.

- **Built-in Git Version Control**  
  All content models are stored as structured JSON files and organized by project, making them easy to version and manage with Git or GitHub. With built-in Git initialization support (via ```cm init --git```), you can start tracking your models from day one—ideal for collaboration, auditing, and CI/CD integration.

- **Contentful Configuration per Model**  
  Each model includes its own simple Contentful configuration file, allowing seamless switching between spaces, environments, and teams without changing global settings.

- **Emoji Support**  
  Enhance clarity and usability by adding emojis to content types and fields from a centralized emoji library—improving the authoring experience in Contentful.

- **Custom Field Types**  
  >**(Framework implemented, full functionality coming soon!)** Developers can extend the CLI with support for custom field types with business logic (local to your project) via a modular, pluggable field registry—adapting the tool to your team’s specific modeling needs.

- **Command Line Simplicity**  
  Perform all modeling tasks using a single command (`cm`)—making your process fast, consistent, and easily scriptable for automation or CI/CD integration.

## Getting Started

- Install Node.js if you don't already have it.
- If you want to use the built-in version control, you need to install git if you don't already have it.
- git clone this repo using ```git clone https://github.com/bymarcelolewin/Content-Modeling-CLI.git```

## CLI Setup
- Switch to "Content-Modeling-CLI" folder.
- In your terminal run: ```npm install```.  You will get npm warnings that some packages are deprecated.  You can ignore those.
- Run ```npm link``` or if you get a permission error, run ```sudo npm link```.
- Test the CLI by typing in ```cm --help``` from anywhere.  ```cm``` should be globally available in your terminal now.

## Create Your First Project
All models and templates are stored in a project, so you need a project before you can create any models.   Projects also come with sample templates you can use to create your first model.

Let's first create the project. Projects can be stored anywhere you want in the same machine that you installed the CLI.

Let's create our first project.  You have to be in the terminal.  Perform the following command:

```cm init --name "My First Project"``` 

If you want to track your project changes using git, use the following command:

```cm init --name "My First Project" --git``` 

Once you do that, you will see a folder named ```my-first-project```.  In there, you will find the following:

```
|- my-first-project
   |- .cmcli.json
   |- content-models
      |- ok-to-delete.txt <- You can delete this file
   |- content-model-templates
      |- components <- Local Components
      |- templates <- Content Model Templates including Content Types
      |- emojis.json <- Emojis Library
```

If you create the project with --git, you will see your .git and .gitignore as well.

Now that you created your project, you can create as many models as you want.  Models can be created manually or you can use the CLI.  We recommend using the CLI, since it a much faster process.  You can easily create a new model based on a template.  Let's do that.

Make sure you are inside the ```my-first-project``` (or whatever you called the project).  You have to be at the root level of the project, as the CLI uses the .cmcli.json file to know it's a CM CLI project.

Now type:

```cm create-model --model myblog --template simple-blog ``` 

You will get the following:
```
✅ Model "myblog" created from template "simple-blog"
✅ Copied .contentfulrc.json to model folder
✅ Copied emojis.json
✅ Copied components: seoMetadata.json
```
A new model (folder) called ```myblog``` has been created inside the ```content-models/models/```

Inside the ```myblog``` folder you'll find the contentfulrc.json file.  You'll need to fill out some information so that you can connect to your Contentful environment.

Specifically, you'll need:

```
{
  "managementToken": "your-cma-token-here",
  "activeSpaceId": "your-contentful-space-here",
  "activeEnvironmentId": "your-contentful-environment-here",
  "host": "api.contentful.com"
}
```

You can get the CMA token from Contentful.  Click on ⚙️ (gear) at the top right, then select CMA Tokens and create one.

## Push Your First Model Into Contentful

>[!WARNING]
>Be careful with this, as it will make changes to your Contentful space.  We suggest you create a playground environment and push there first.  

>[!CAUTION]
>Don't perform the following in a production environment!

```cm push-model --model myblog```

Congratulations!  You did it.  You created your first project, created a model inside of it and pushed it to Contentful!

## Currently Supported CLI Commands (Version 1.0.0)
| Command               | Description                                                                                          | Flags                                                                                                                                                 |
|:---------------------|:-----------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cm init`            | Initializes a new CLI project with a standard folder structure and config file.                      | `--name`: Display name of the new project. Will be normalized into a safe folder name.<br>`--git`: Initializes Git at the project root and adds a `.gitignore` to exclude `.contentfulrc.json`. If Git is not installed, you'll be prompted to continue without version control. |
| `cm create-model`    | Creates a new content model using a specified template. Will also include the global components and emojis library. | `--model`: Name of the new model folder to create.<br>`--template`: Name of the template to use.                                                     |
| `cm push-model`      | Pushes all content types from the specified model folder to Contentful. Without `--force`, it performs a dry run and does not create anything. | `--model`: Name of the existing model folder.<br>`--force`: Actually pushes the model to Contentful. Without it, the command runs in dry run mode and shows what would be created. | `cm add-content-type`| Adds a new content type to an existing model.                                                        | `--model`: Name of the existing model folder.<br>`--name`: Display name of the new content type (e.g., "Article - Blog").                           |
| `cm delete-model`    | Deletes an entire content model in Contentful, including its content types and entries. If --force is not included, it will only be a dry run. This will not delete the model folder locally. | `--model`: Name of the model folder to delete.<br>`--force`: Actually deletes the content; otherwise, it performs a dry run.                         |
| `cm list-templates`  | Lists all available content model templates and their content types.                                 | —                                                                                                                                                    |
| `cm list-models`     | Lists all the content models you created so far.                                                     | —                                                                                                                                                    |

## Further Information
- Learn more at [Intelligent Content Academy](https://www.intelligentcontentacademy.com/)
- Need help, contact [Marcelo Lewin](https://www.intelligentcontentacademy.com/contact)
- Use as is.  No warranty provided.  
- Do not use it in a production environment.
- **Not affiliated with Contentful.**

## License

This project is **not open source**. It is source-available and licensed for the exclusive purpose of modeling content in Contentful.

You may integrate it into CI/CD pipelines or internal workflows, but redistribution, republishing, or commercial use are prohibited.

See [LICENSE.md](./LICENSE.md) for full terms.