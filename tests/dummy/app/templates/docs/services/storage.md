# Storage

The `storage` service adds functionality for retrieving and manipulating localStorage key-value items from routes, controllers, templates, and components, enabling bound values and computed properties, whilst persisting data across page reloads.

The service will attempt to use `localStorage` if it is supported in the browser, and if the browser feature has not been disabled. If it fails, it will fall back to using an in-memory object to store any data. This makes it safe to use across all environments.

The service is automatically injected inside all routes, controllers, and components.

The service binds itself to all changes to the `localStorage` data. This results in data bindings working across browser tabs.

## Setting a key

Set the value for the `localStorage['name']` key.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-storage-set.hbs'}}
		Name: {{input value=storage.name placeholder="World"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-storage-set.hbs'}}
{{/docs-demo}}

## Getting a key

Get the value for the `localStorage['name']` key.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-storage-get.hbs'}}
		Hello {{storage.name}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-storage-get.hbs'}}
{{/docs-demo}}

## Using from a controller

Using the `storage` service to get `localStorage['email']` inside a controller.

{{docs-snippet name='docs-demo-services-storage-controller.js'}}
