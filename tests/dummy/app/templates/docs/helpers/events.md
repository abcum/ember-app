# Event helpers

The event helpers enable manipulation of browser events.

## drag-get

Gets metadata from the browser event dataTransfer object.

```handlebars
{{#my-component ondrop=(drag-get "plain/text")}}
	Droppable Area
{{/my-component}}
```

Or you can use the `application/json` mime-type to get the data as an object.

```handlebars
{{#my-component ondrop=(drag-get "application/json")}}
	Droppable Area
{{/my-component}}
```

Or use the `chain` helper to chain multiple actions together to complete the drag-and-drop functionality.

```handlebars
{{#my-component ondrop=(chain (prevent-default) (drag-get "plain/text") (action "droppedItem"))}}
	Droppable Area
{{/my-component}}
```

## drag-set

Set custom metadata on the browser event dataTransfer object.

```handlebars
{{#my-component draggable="true" ondragstart=(drag-set "plain/text" "text data")}}
	Draggable Item
{{/my-component}}
```

Or you can use the `application/json` mime-type to set the data as an object.

```handlebars
{{#my-component draggable="true" ondragstart=(drag-set "application/json" (hash id=1 type="card"))}}
	Draggable Item
{{/my-component}}
```

Or use the `chain` helper to chain multiple actions together to complete the drag-and-drop functionality.

```handlebars
{{#my-component draggable="true" ondragstart=(chain (drop-effect "move") (effect-allowed "move") (drag-set "plain/text" "text data"))}}
	Draggable Item
{{/my-component}}
```

## drop-effect

Specifies the `dropEffect` property on the event dataTransfer object.

```handlebars
{{#my-component draggable="true" ondragstart=(drop-effect "move")}}
	Draggable Item
{{/my-component}}
```

## effect-allowed

Specifies the `effectAllowed` property on the event dataTransfer object.

```handlebars
{{#my-component draggable="true" ondragstart=(effect-allowed "move")}}
	Draggable Item
{{/my-component}}
```

## prevent-default

Runs the `preventDefault` method on the event handler object.

```handlebars
{{#my-component draggable="true" ondragstart=(prevent-default)}}
	Draggable Item
{{/my-component}}
```

## stop-propagation

Runs the `stopPropagation` method on the event handler object.

```handlebars
{{#my-component draggable="true" ondragstart=(stop-propagation)}}
	Draggable Item
{{/my-component}}
```
