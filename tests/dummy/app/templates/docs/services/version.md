# Version

The `version` service adds functionality for checking whether there are any application updates to the single-page Ember application.

It does this by creating and publishing a `vertion.txt` file at the base of the domain, which contains the application build time. If the contents of this file have changed while the application is running, then an `updatefound` event will be triggered.

It is also possible to set the service to trigger an application update automatically, when a new version is found. It does this by reloading the page.

> Only one of the `worker` or `version` services can be {{#link-to "docs.config"}}enabled{{/link-to}} at the same time.

## Update available?

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-version-show.hbs'}}
		{{version.updatefound}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-version-show.hbs'}}
{{/docs-demo}}

## Check for an update

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-version-check.hbs'}}
		<button onclick={{action (version-check)}}>
			Check for an update
		</button>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-version-check.hbs'}}
{{/docs-demo}}

## Update the application

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-version-reset.hbs'}}
		<button onclick={{action (version-reset)}}>
			Install the update
		</button>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-version-reset.hbs'}}
{{/docs-demo}}

## Using from a controller

Listening to the `version` service to detect when an update is available.

{{docs-snippet name='docs-demo-services-version-controller.js'}}

