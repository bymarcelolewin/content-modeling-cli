![Content Modeling CLI for Contentful](cli-assets/cm-cli-logo.png)

© Copyright 2025 - Red Pill Blue Pill Studios, LLC - All Rights Reseved.

**NOT associated with Contentful** - Learn more at [Intelligent Content Academy](https://www.intelligentcontentacademy.com/)

A CLI tool for **content architects** and **content modelers** working in Contentful. Easily define content types, fields, and relationships using simple, structured JSON—no scripting or programming required. Create reusable components—field groups that can include predefined options and default values—and use them across multiple content models to ensure consistency and save time. Templatize entire models, and enhance clarity with emoji support through a centralized, easy-to-manage library. Because content models are just JSON files, you can version them using Git, GitHub, or any version control system—making your modeling process scalable, trackable, and team-friendly. Spend less time clicking around the UI and more time designing scalable content models.

## Key Features

- **No-Code Modeling**  
  Define content types, fields, and relationships using simple, structured JSON—no scripting or programming required.

- **Reusable Components**  
  Create reusable field groups (components) that can be shared across content types to reduce duplication and enforce consistency.

- **Default Values in Components**  
  Preconfigure components with predefined options and default values (e.g., a multi-select list with pre-selected defaults) for quick, consistent use in any model.

- **Model Templatization**  
  Clone and reuse complete content models using predefined templates to speed up setup and ensure governance and standards.

- **Version Control**  
  All content types are defined as simple JSON files and organized by model folder, making it easy to track changes, collaborate, and manage your content models with any version control system like Git or GitHub.

- **Emoji Support**  
  Add emojis to your content types and fields from a centralized emoji library to enhance the authoring experience.

- **Contentful Configuration per Model**  
  Each model includes its own Contentful configuration file, allowing easy switching between environments, spaces, or projects.

- **Command Line Simplicity**  
  Run all tasks from a single CLI command (`cm`), making content modeling repeatable, scalable, and versionable (if you, for example, check in your model using Git / GitHub).

- **Extensible Field Type Registry**  
  Your developers can add support for custom field types and embed business logic by extending our modular field registry—making the CLI adaptable to your company's unique modeling requirements.

## Getting Started

- Install Node.js if you don't already have it.
- git pull this repo.  It will create a Content-Modeling-CLI folder. 

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