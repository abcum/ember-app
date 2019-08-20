# Scrolling helpers

The scroll helpers enable advanced document and block scroll positioning.

## scroll-block

Specify a scrollable area, and remember the scroll position across routes with named keys.

```handlebars
{{#scroll-block key=(concat "post-comments-" model.id)}}
	Scrollable Area
{{/scroll-block}}
```

## scroll-into-view

Scrolls a particular element into the visible area of the window.

```handlebars
{{run (scroll-into-view element=(get-element-by-id "my-id"))}}
```

And specify whether the scrolling should be smooth.

```handlebars
{{run (scroll-into-view element=(get-element-by-id "my-id") smooth=true)}}
```

Or define the vertical alignment position.

```handlebars
{{run (scroll-into-view element=(get-element-by-id "my-id") block='center')}}
```

Or define the horizontal alignment position.

```handlebars
{{run (scroll-into-view element=(get-element-by-id "my-id") inline='nearest')}}
```

## scroll-to

Scrolls to a particular set of coordinates on the page.

```handlebars
{{run (scroll-to top=520)}}
```

And scroll horizontally aswell as vertically.

```handlebars
{{run (scroll-to top=520 left=100)}}
```

And specify whether the scrolling should be smooth.

```handlebars
{{run (scroll-to top=520 left=100 smooth=true)}}
```
