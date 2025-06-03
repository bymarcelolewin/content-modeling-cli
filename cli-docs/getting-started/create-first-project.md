# Create Your First Project
[<- Back](./cmcli-installation.md)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[Back to Documentation -->](../README.md)

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
      |- components <- Components
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
}
```

You can get the CMA token from Contentful.  Click on ⚙️ (gear) at the top right, then select CMA Tokens and create one.

By default, we'll use the api.contentful.com as the API host.  But if you need to change it, in your project folder, you'll find a `.cmcli.json` file.  In there, look for the `cmaHost` key if you need to change it, for example, for EU.  Make sure you save the file after you changed it.  This will be used for all your content models for that project.

```
{
  "projectName": "Your Project",
  "projectFolder": "your-project",
  "cmaHost": "https://api.contentful.com"
}
```

## Push Your First Model Into Contentful

>[!WARNING]
>Be careful with this, as it will make changes to your Contentful space.  We suggest you create a playground environment and push there first.  

>[!CAUTION]
>Don't perform the following in a production environment!

```cm push-model --model myblog```

Congratulations!  You did it.  You created your first project, created a model inside of it and pushed it to Contentful!

---
<br>

[<- Back](./cmcli-installation.md)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[Back to Documentation -->](../README.md)