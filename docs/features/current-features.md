# Current Features

[<- Back to Documentation](../README.md)

- **AI-Ready Content Models**  
  Content models are defined with clean, structured JSON—making them ideal for AI applications, including generative workflows, personalization engines, and retrieval-augmented generation (RAG).

- **Full MCP Server Support**  
  With its full MCP server implementation, the Content Modeling MCP Server and CLI exposes every command over JSON so any MCP-compatible client can access it—and allowing you to drive the CLI using natural language instead of traditional shell commands.

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
<br>

[<- Back to Documentation](../README.md)