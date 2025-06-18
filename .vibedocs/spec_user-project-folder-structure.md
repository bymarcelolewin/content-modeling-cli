## Content Modeling MCP Server and CLI User Project Folder Structure
This project folder is created when the user initiates a project in the CLI or MCP server.

```
project-root/
├── .cmcli.json                           # Project validation file
├── .cm-mcp-context.json                  # Context File for MCP Server
├── .git/                                 # Git Version Control (optional, depending on how the project was initialized)
├── content-models/                       # Content Models Top Level
│   ├── emois.json                          # Emoji Library for all content models to use. 
│   ├── components/                         # Global Components for all content models to use.
│   │   ├── componentA.json                   # Single Component
│   │   ├── componentB.json
│   │   └── ...
│   ├── models/                             # Actual Models
│   │   ├── Model A/                          # Single Model
│   │   │   ├── .contentfulrc.json              # Contentful Configuration File
│   │   │   ├── content-types/                  # Model Content Types
│   │   │   │   ├── contentTypeA.json             # Single Content Type
│   │   │   │   ├── contentTypeB.json
│   │   │   │   └── ...
│   │   ├── Model B/                          # Single Model
│   │   │   ├── .contentfulrc.json              # Contentful Configuration File
│   │   │   ├── content-types/                  # Model Content Types
│   │   │   │   ├── contentTypeA.json             # Single Content Type
│   │   │   │   ├── contentTypeB.json
│   │   │   │   └── ...
│   └── └── └── ...
├── content-model-templates/                # Templates Top Level     
│   ├── emois.json                            # Emoji Library for all content models to use. 
│   ├── components/                           # Global Components for all content models to use.
│   │   ├── componentA.json                     # Single Component
│   │   ├── componentB.json
│   │   └── ...
│   ├── templates/                            # Actual Templates
│   │   ├── Model A/                            # Single Model Template
│   │   │   ├── .contentfulrc.json                # Contentful Configuration File
│   │   │   ├── content-types/                      # Model Content Types
│   │   │   │   ├── contentTypeA.json                 # Single Content Type
│   │   │   │   ├── contentTypeB.json
│   │   │   │   └── ...
│   │   ├── Model B/                            # Single Model Template
│   │   │   ├── .contentfulrc.json                # Contentful Configuration File
│   │   │   ├── content-types/                      # Model Content Types
│   │   │   │   ├── contentTypeA.json                 # Single Content Type
│   │   │   │   ├── contentTypeB.json
│   │   │   │   └── ...
```