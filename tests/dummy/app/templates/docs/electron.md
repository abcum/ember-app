# Electron

## Development

To begin developing your Ember app as an Electron app, add an `electron/main.js` file with similar contents to the [example electron launch file](#example-electron-launch-file) below. Then run the following command in your Ember app directory to befin development.

```bash
ember electron:serve
```

## Deployment

When you are ready to deploy, ensure that you have correctly entered the necessary build information in your application's `package.json` file, using the [example build configuration](#example-build-configuration) file below. Then run the following command in your Ember app directory to begin the ember app build and deploy process.

```bash
ember electron:build
```

## Enabling spellcheck

To ensure that spellchecking works correctly in Electron, when editing the contents of `input` and `textarea` elements, ensure that the `spellchecker` package is installed and up-to-date.

```bash
npm install --save spellchecker
```

## Rebuild dependencies

Run the following command in your application's working directory, to ensure that all dependencies are rebuilt for the current platform.

```bash
electron-builder install-app-deps
```

Alternatively, run this command after every npm package install, by placing it in your `package.json` file.

{{docs-snippet name='docs-demo-electron-rebuild.json'}}

## Example electron launch file

<details>
	<summary>electron/main.js</summary>
	{{docs-snippet name='docs-demo-electron-main.js'}}
</details>

## Example build configuration

<details>
	<summary>package.json</summary>
	{{docs-snippet name='docs-demo-electron-package.json'}}
</details>
