# CLI Commands
[<- Back to Documentation](../README.md)

| Command               | Description                                                                                          | Flags                                                                                                                                                 |
|:----------------------|:-----------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cm init`             | Initializes a new CLI project with a standard folder structure and config file.                      | `--name`: Display name of the new project (normalized into a safe folder name).<br>`--git`: Initializes Git at the project root and adds a `.gitignore` to exclude `.contentfulrc.json`. If Git isn’t installed, you’ll be prompted to continue without version control. |
| `cm create-model`     | Creates a new content model using a specified template. Includes components and emojis library.      | `--model`: Name of the new model folder to create.<br>`--template`: Name of the template to use.                                                     |
| `cm push-model`       | Pushes all content types from the specified model folder to Contentful. Without `--force`, performs a dry run and shows what would be created. | `--model`: Name of the existing model folder.<br>`--force`: Actually pushes the model to Contentful; without it, runs in dry-run mode.               |
| `cm add-content-type` | Adds a new content type to an existing model.                                                        | `--model`: Name of the existing model folder.<br>`--name`: Display name of the new content type (e.g., “Article – Blog”).                           |
| `cm delete-model`     | Deletes an entire content model in Contentful, including its content types and entries. Without `--force`, performs a dry run. Does not delete the model folder locally. | `--model`: Name of the model folder to delete.<br>`--force`: Actually deletes the content; otherwise, runs in dry-run mode.                         |
| `cm list-templates`   | Lists all available content model templates and their content types.                                 | (none)                                                                                                                                                |
| `cm list-models`      | Lists all the content models you created so far.                                                     | (none)                                                                                                                                                |

---
<br>

[<- Back to Documentation](../README.md)
