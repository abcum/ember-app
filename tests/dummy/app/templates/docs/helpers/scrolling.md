# Scrolling helpers

The scroll helpers enable advanced document and block scroll positioning.

## remember-scroll

Stores and sets the page scroll position of the page.

```handlebars
{{remember-scroll}}
```

Or remember the scroll position of individual pages with named keys.

```handlebars
{{remember-scroll key=(concat "posts-" model.id)}}
```

## scroll-block

Specify a scrollable area, and remember the scroll position across routes with named keys.

```handlebars
{{#scroll-block key=(concat "post-comments-" model.id)}}
	Scrollable Area
{{/scroll-block}}
```
