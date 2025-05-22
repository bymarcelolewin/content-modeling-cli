![Content Modeling CLI for Contentful](cli-assets/cm-cli-logo.png)

© Copyright 2025 - Red Pill Blue Pill Studios, LLC - All Rights Reseved.

**NOT associated with Contentful** - Learn more at [Intelligent Content Academy](https://www.intelligentcontentacademy.com/)

A CLI tool for content modeling in Contentful, built specifically for content architects and content modelers. Define content types, fields, and relationships using simple, structured JSON—no scripting or programming required. Create reusable components with predefined options and default values, and apply them across models for consistency and speed. Templatize entire content models, enhance clarity with emoji support via a centralized library, and organize your work using a project-based structure. With built-in Git support, you can version, track, and collaborate on your models just like code—making your modeling process scalable, maintainable, and team-friendly. Spend less time clicking around the UI and more time designing intelligent, reusable content architectures.

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
  All content models are stored as structured JSON files and organized by project, making them easy to version and manage with Git or GitHub. With built-in Git initialization support, you can start tracking your models from day one—ideal for collaboration, auditing, and CI/CD integration.

- **Contentful Configuration per Model**  
  Each model includes its own simple Contentful configuration file, allowing seamless switching between spaces, environments, and teams without changing global settings.

- **Emoji Support**  
  Enhance clarity and usability by adding emojis to content types and fields from a centralized emoji library—improving the authoring experience in Contentful.

- **Extensible Field Type Registry**  
  Developers can extend the CLI with support for custom field types and business logic via a modular, pluggable field registry—adapting the tool to your team’s specific modeling needs.

- **Command Line Simplicity**  
  Perform all modeling tasks using a single command (`cm`)—making your process fast, consistent, and easily scriptable for automation or CI/CD integration.

## Getting Started

- Install Node.js if you don't already have it.
- git clone this repo.  It will create a Content-Modeling-CLI folder. 

## CLI Setup
- Switch to "Content-Modeling-CLI" folder.
- In your terminal run: ```npm install```
- Then run ```npm link``` or if you get a permission error, run ```sudo npm link```.
- Test the CLI by typing in ```cm --help``` from anywhere.  ```cm``` should be globally available in your terminal now.

## Create Your First Model
Clone the provided sample content model template using: 

```cm create-model --model [your-model-name] --template simple-blog ``` 

Once your model is created, switch to the ```Content-Modeling-CLI/content-models/models/[your-model-name]/content-types``` folder and configure the .contentfulrc.json file

```
{
  "managementToken": "your-cma-token-here",
  "activeSpaceId": "your-contentful-space-here",
  "activeEnvironmentId": "your-contentful-environment-here",
  "host": "api.contentful.com"
}
```

You can get the CMA token from Contentful, under the cogwheel -> CMA Tokens.

## Push Your First Model Into Contentful
Be careful with this, as it will make changes to your Contentful space.  We suggest you create a playground environment and push there first.

```cm push-model --model [your-model-name]```

## Currently Supported CLI Commands (Version 1.0.0)

| Command              | Flags                              | Description                                                                                 | Flag Descriptions                                                                                                                                     |
|:---------------------|:------------------------------------|:--------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cm init`           | `--name <name>`                    | Initializes a new CLI project with a standard folder structure and config file.             | `--name`: Display name of the new project. Will be normalized into a safe folder name.                                                              |
| `cm create-model`   | `--model <name>`<br>`--template <template>` | Creates a new content model folder using a specified template. Brings over emoji.json and components folder.                             | `--model`: Name of the new model folder to create.<br>`--template`: Name of the template to use. |
| `cm push-model`     | `--model <name>`                    | Pushes all content types from the specified model folder to Contentful.                     | `--model`: Name of the existing model folder in.                                                                                    |
| `cm add-content-type` | `--model <name>`<br>`--name <name>` | Adds a new content type to an existing model folder.                                        | `--model`: Name of the existing model folder.<br>`--name`: Display name of the new content type (e.g., "Article - Blog").                           |
| `cm delete-model`   | `--model <name>`<br>`--force`       | Deletes an entire content model in Contentful, including its Content Types and entries (dry run by default).      | `--model`: Name of the model folder to delete.<br>`--force`: Actually deletes the content; otherwise, it performs a dry run.                         |
| `cm list-templates` | _(none)_                            | Lists all available content model templates and their content types.                        | —                                                                                                                                                    |
| `cm list-models`    | _(none)_                            | Lists all content model folders currently available in `content-models/`.                   | —                                                                                                                                                    |

## Further Information
- Learn more at [Intelligent Content Academy](https://www.intelligentcontentacademy.com/)
- Need help, contact [Marcelo Lewin](https://www.intelligentcontentacademy.com/contact)
- Use as is.  No warranty provided.  Do not use it in a production environment.
- **Not affiliated with Contentful.**
  
## More documentation coming soon!