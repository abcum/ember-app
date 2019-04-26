# DOM helpers

The dom helpers enable a variety of simple dom manipulation.

{{#-in-element (document-head)}}
	<meta name="author" content="Abcum">
{{/-in-element}}

## document-body

Selects the document `<body>` as a DOM element.

```handlebars
{{#-in-element (document-body)}}
	This will go into the body
{{/-in-element}}
```

## document-head

Selects the document `<head>` as a DOM element.

```handlebars
{{#-in-element (document-head)}}
	<meta name="author" content="Abcum">
{{/-in-element}}
```

## focus

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-helpers-dom-focus.hbs'}}
		{{input id="search" placeholder="Focus on me by pressing cmd+f"}}
		{{hot-key key="f" meta=true onPress=(focus "search")}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-helpers-dom-focus.hbs'}}
{{/docs-demo}}

## get-element-by-class

Selects the first element which matches the specified class.

```html
<div class="my-class"></div>
```

```handlebars
{{#-in-element (get-element-by-class "my-class")}}
	Display somewhere else
{{/-in-element}}
```

## get-element-by-id

Selects the element which matches the specified id.

```html
<div id="my-id"></div>
```

```handlebars
{{#-in-element (get-element-by-id "my-id")}}
	Display somewhere else
{{/-in-element}}
```

## get-element-by-tag

Selects the first element which matches the specified tag.

```html
<my-tag></my-tag>
```

```handlebars
{{#-in-element (get-element-by-tag "my-tag")}}
	Display somewhere else
{{/-in-element}}
```
