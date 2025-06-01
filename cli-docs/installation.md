## Installing from NPM (Recommended)

The easiest way to install the CLI is via NPM:

```bash
npm install -g content-modeling-cli@beta
```

If you get a permissions error, try:

```bash
sudo npm install -g content-modeling-cli@beta
```

## Installing from Source

This option is for developers who want to work directly with the source code.

1. Clone the repo:

    ```bash
    git clone https://github.com/bymarcelolewin/Content-Modeling-CLI.git
    ```

2. Navigate into the folder:

    ```bash
    cd Content-Modeling-CLI
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

    You may see deprecation warnings — they can be safely ignored.

4. Link the CLI globally:

    ```bash
    npm link
    ```

    If you get a permission error, run:

    ```bash
    sudo npm link
    ```

---

## Test the Install

To confirm everything is working, run:

```bash
cm --help
```

You should see the CLI help menu. The `cm` command is now available globally from any terminal window. You can also use `contentmodel` if you prefer.

---
[<- Back to Documentation](./README.md)