# Electron

The `electron` service adds functionality for checking whether there are any application updates to the Electron application.

It does this by checking for any new version releases which are greater than the currently running version. If there is a newer distributed application bundle available, then an `updatefound` event will be triggered.

It is also possible to set the service to trigger an application update automatically, when a new version is found. It does this by downloading the new release, quitting the application, and re-opening it again once installed.

## Using Electron?

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-electron.hbs'}}
		{{if (is-electron) "Running in electron" "Runing in browser"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-electron.hbs'}}
{{/docs-demo}}

## Update available?

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-electron-show.hbs'}}
		{{electron.updatefound}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-electron-show.hbs'}}
{{/docs-demo}}

## Check for an update

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-electron-check.hbs'}}
		<button onclick={{action (electron-check)}}>
			Check for an update
		</button>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-electron-check.hbs'}}
{{/docs-demo}}

## Update the application

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-electron-reset.hbs'}}
		<button onclick={{action (electron-reset)}}>
			Install the update
		</button>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-electron-reset.hbs'}}
{{/docs-demo}}

## Using from a controller

Listening to the `electron` service to detect when an update is available.

{{docs-snippet name='docs-demo-services-electron-controller.js'}}

