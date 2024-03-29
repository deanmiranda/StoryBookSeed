Apt & Nimble LLC Storybook Seed Repo
====================

<br>

This is a small front-end software development kit that aims to provide the following benefits:

- Faster component development turnaround times.
- Increased code stability and flexibility.
- Improved code quality via [ESLint](https://eslint.org).
- Automatic image optimization via [Webpack](https://webpack.js.org).
- Better-organized deliverables, which are easier to port over to Razor templates.
- Hosts the UI components on a shared / centralized location via [Chromatic](https://www.chromatic.com/docs/setup).

<br><br>

## Table of Contents
- [System Requirements](#system-requirements)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Directories](#directories)

<br>

---

<br>

## System Requirements
- **Node.js** 14.16.x
- **Yarn** 1.22.x


<br>

---

<br>

## Getting Started

**If you are a Sitecore developer** that needs to port the component over to Razor file(s):

```bash
# install the dependencies
$ yarn

# generate the deliverables
$ yarn build

# start a Storybook server at localhost:6006
$ yarn storybook

# inside Storybook you can view the docs for the component you are porting over
# special instructions, if any, will be located there
```

<br>

**If you are a front-end developer** that needs to build new components:

```bash
# install the dependencies
$ yarn

# start a Storybook server at localhost:6006
$ yarn storybook

# create a new component
$ yarn component

# test your changes
$ yarn lint && yarn test

# generate the deliverables
$ yarn build

# deploy to Chromatic 
$ yarn deploy-storybook

```

... Remember to update the `.mdx` file for your component, with instructions for porting it over to Razor files.

<br>

---

<br>

## Available Commands
The following `yarn` commands are available:

Command | Description
:-----: | :-----:
`build` | This will generate the static site assets in the `/dist` folder.
`build-storybook` | This will build the Storybook files in the `/storybook-static` folder.
`component` | This runs the CLI prompt for scaffolding out new components.
`deploy-storybook` | This will deploy the Storybook files in the `/storybook-static` folder to [Chromatic](https://chromatic.com).
`lint` | This runs the [ESLint](https://eslint.org) linter.
`storybook` | This will start up a local [Storybook](https://storybook.js.org) server for previewing your components.
`test` | This runs the unit tests, using the [Jest](https://jestjs.io) testing library.

<br>

---

<br>

## Directories
The following directories serve a specific purpose in the context of a Nuxt application:

### `assets`

The assets directory contains the global uncompiled assets such as Sass files and JavaScript utility functions.

<br>

### `components`

The components directory contains your components. Each component folder has a `.html` file containing the markup, a `.scss` file for component-specific styles, and a `.stories.js` file for rendering the component in [Storybook](https://storybook.js.org).

<br>

### `scripts`

The scripts directory contains the bash scripts for each `yarn` command. For example, if you look at the `scripts` property in `package.json` you'll see the following:

```
  "scripts": {
    "build": "scripty",
    "component": "scripty",
    "lint": "scripty",
    "storybook": "scripty",
    "test": "scripty"
}
```

... Running `yarn build` would then execute the commands listed inside the bash script located at `scripts/build`. Have these commands stored in separate files helps keep the `package.json` file decluttered and clean.

<br>

### `scripts-win`

This directory serves the same purpose as the `scripts` directory, except it contains the Window-specific versions of each shell script.

<br>

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

For example, `/fonts/ExampleBasis-Regular.woff` would map to `/static/fonts/ExampleBasis-Regular.woff`.


<br>

### `tools`

This directory contains tooling related to CLI commands and build processes. For example, this is where you'll find the CLI script that powers `yarn component`, amongst others.
