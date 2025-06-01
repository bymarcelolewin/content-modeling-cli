## Current Features

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

- **Command Line Simplicity**  
  Perform all modeling tasks using a single command (`cm`)—making your process fast, consistent, and easily scriptable for automation or CI/CD integration.
  
  ---
  [<- Back to Documentation](./README.md)