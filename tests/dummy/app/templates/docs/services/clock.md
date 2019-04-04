# Clock

The `clock` service adds functionality for displaying the current time according to the system clock, and can be used in computed properties to update time sensitive properties.

## Date properties

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-clock-date.hbs'}}
		{{clock.year}}y {{clock.month}}m {{clock.day}}d
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-clock-date.hbs'}}
{{/docs-demo}}

## Time properties

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-services-clock-time.hbs'}}
		{{clock.hour}}h {{clock.minute}}m {{clock.second}}s
	{{/demo.example}}
	{{demo.snippet 'docs-demo-services-clock-time.hbs'}}
{{/docs-demo}}

## Using from a controller

Listening to the `clock` service to update computed properties.

{{docs-snippet name='docs-demo-services-clock-controller.js'}}

