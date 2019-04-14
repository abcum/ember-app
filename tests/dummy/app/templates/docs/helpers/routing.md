# Routing helpers

The route helpers enable a selection of router methods.

## is-active

Detects whether a specific route is active or not.

```handlebars
{{#if (is-active "basket")}}
	My Basket
{{/if}}
```

## history-back

Calls `window.history.back()` to reverse one position in the browser history.

```handlebars
{{my-component onkeypress=(history-back)}}
```

## history-forward

Calls `window.history.forward()` to advance one position in the browser history.

```handlebars
{{my-component onkeypress=(history-forward)}}
```

## open

Calls `window.open()` enabling opening a new browser tab or window from an action on a component.

```handlebars
{{my-component onkeypress=(open "https://github.com/" "abcum/ember-helpers" width=1200 height=600 center=true)}}
```

## reload

Calls `window.location.reload()` enabling reloading the page, or changing the url from an action on a component.

```handlebars
{{my-component onkeypress=(reload)}}
```

## root-url

Enables relative URLs in an Ember.js application, relative to the application's rootURL.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helper-root-url.hbs'}}
		<img src={{root-url "/img/logo.png"}}>
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helper-root-url.hbs'}}
{{/docs-demo}}

## route-name

Retrieves the name of the current route name.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helper-route-name.hbs'}}
		{{route-name}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helper-route-name.hbs'}}
{{/docs-demo}}

## route-path

Retrieves the path of the current route.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helper-route-path.hbs'}}
		{{route-path}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helper-route-path.hbs'}}
{{/docs-demo}}

## route-query

Retrieves the params of the current route as an object.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helper-route-query.hbs'}}
		{{get (route-query) "test"}}
		{{#link-to (query-params test="testing")}}Change query params{{/link-to}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helper-route-query.hbs'}}
{{/docs-demo}}

## route-vars

Retrieves the params of the current route.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helper-route-vars.hbs'}}
		{{route-vars}}
		{{#link-to (query-params test="testing")}}Change query params{{/link-to}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helper-route-vars.hbs'}}
{{/docs-demo}}

## route-url

Retrieves the url of the current route.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helper-route-url.hbs'}}
		{{route-url}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helper-route-url.hbs'}}
{{/docs-demo}}

## transition-to

Allows the route to be changed from an action on a component, similar to `link-to`.

```handlebars
{{#my-component onclick=(transition-to "basket" sort=true)}}
	Go to basket
{{/my-component}}
```
