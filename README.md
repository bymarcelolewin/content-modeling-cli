# Contentful Content Modeling CLI (`ccm`)

The **Contentful Content Modeling CLI** (`ccm`) tool allows you to easily create and manage content models for your company inside of contentful using simple JSON files. It abstracts the Contentful CLI and let's you add business logic to your content types and fields, for easier content modeling.

---

## Requirements

- Install Node.js if you don't already have it.

## Cloning Repo
- Select a folder where you want to clone this repo into.
- Clone this repo using any of your preferred ways.

## CLI Setup
- Switch to "Contentful-Content-Modeling-CLI" folder.
- In your terminal run: ```npm install```
- Then run ```npm link``` or if you get a permission error, run ```sudo npm link```.
- Test the CLI by typing in ```ccm --help``` from anywhere.  CCM should be globally available in your terminal now.

## Create Your First Model
- Clone the provided sample content model template using ```ccm clone-model --model [your-model-name] --template blog --emojis```
- Once your model is created, swich to the ```Contentful-Content-Modeling-CLI/content-models/[your-model-name]/content-types``` folder and configure the .contentfulrc.json file

```
{
  "managementToken": "your-cma-token-here",
  "activeSpaceId": "your-contentful-space-here",
  "activeEnvironmentId": "your-contentful-environment-here",
  "host": "api.contentful.com"
}
```
You can get the CMA token from Contentful, under the cogwheel -> CMA Tokens.

## More documentation coming soon!