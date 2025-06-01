# Create Your First Project
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

---
[<- Back to Documentation](./README.md)