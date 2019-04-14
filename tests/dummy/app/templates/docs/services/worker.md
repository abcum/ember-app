# Worker

The `worker` service adds functionality for checking whether there are any application updates to the single-page Ember application.

It does this by creating and publishing a `sw.js` service worker file at the base of the domain, which enables progressive web app caching and versioning. If the contents of this file have changed while the application is running, then an `updatefound` event will be triggered.

It is also possible to set the service to trigger an application update automatically, when a new version is found. It does this by reloading all assets in the cache, and forcing the service worker to update on all pages.

> Only one of the `worker` or `version` services can be {{#link-to "docs.config"}}enabled{{/link-to}} at the same time.

## Update available?

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-worker-show.hbs'}}
		{{worker.updatefound}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-worker-show.hbs'}}
{{/docs-demo}}

## Check for an update

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-worker-check.hbs'}}
		<button onclick={{action (worker-check)}}>
			Check for an update
		</button>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-worker-check.hbs'}}
{{/docs-demo}}

## Update the application

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-worker-reset.hbs'}}
		<button onclick={{action (worker-reset)}}>
			Install the update
		</button>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-worker-reset.hbs'}}
{{/docs-demo}}

## Using from a controller

Listening to the `worker` service to detect when an update is available.

{{docs-snippet name='docs-demo-services-worker-controller.js'}}

