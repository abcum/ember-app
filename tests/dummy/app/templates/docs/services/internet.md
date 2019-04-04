# Internet

The `internet` service enables responding to changes to the browser's internet connection status.

The full connection status object is made available inside all routes, controllers, and components. 

## Get the status

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-internet-check.hbs'}}
		{{internet.status}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-internet-check.hbs'}}
{{/docs-demo}}

## Check if online

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-internet-online.hbs'}}
		{{if internet.online "We are online" "We are offline"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-internet-online.hbs'}}
{{/docs-demo}}

## Check if offline

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-internet-offline.hbs'}}
		{{if internet.offline "We are offline" "We are online"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-internet-offline.hbs'}}
{{/docs-demo}}

## Using from a controller

Using the `internet` service to get the internet status inside a controller.

{{docs-snippet name='docs-demo-services-internet-controller.js'}}
