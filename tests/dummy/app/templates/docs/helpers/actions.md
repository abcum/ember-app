# Action helpers

The action helpers enable a variety of advanced actions.

## alert

Displays a `window.alert` message as a result of an action on a component.

```handlebars
{{#my-component onsave=(alert "The blog post" blog.title "has been saved.")}}
	Save
{{/my-component}}
```

## call

Allows a method on the route to be called from a component.

```handlebars
{{#some-button clicked=(call "log" "Website")}}
	Log this error
{{/some-button}}
```

## chain

Enables chaining of a sequence of actions together to form a larger action, passing the result of each action to the next action.

```handlebars
{{#my-component onclick=(action (chain (action "addBasket") (action "goToPayment")) model)}}
	Add to basket and pay
{{/my-component}}
```

If any action in the chain returns a promise, then the chain will wait for the promise to return, and the return value will be piped into the next action. If the Promise rejects, the rest of the chain will be aborted.

## check

Checks if a value (as a result of an action) is truthy before running the defined action.

Useful when chaining actions together to prevent an action from running if the previous action returned false.

```handlebars
{{#my-component onclick=(action (chain (confirm "Are you sure?") (check (action "delete" model))))}}
	Delete this item
{{/my-component}}
```

## confirm

Displays a `window.confirm` message as a result of an action on a component.

```handlebars
{{#my-component onclick=(confirm "Are you sure you want to delete the blog post" blog.title "?")}}
	Delete
{{/my-component}}
```

## console

Enables logging any passed or curried paramaters to the `console`, as a result of an action on a component.

```handlebars
{{#my-component onclick=(console "clicked")}}
	Add to basket and pay
{{/my-component}}
```

Or you can specify which `console` logging type should be used to display the message. The different possible types are `trace`, `debug`, `info`, `log`, `warn`, `error`.

```handlebars
{{#my-component onclick=(console "clicked" type="warn")}}
	Add to basket and pay
{{/my-component}}
```

## debounce

Ensures an action is triggered only once during the specified time.

```handlebars
{{#my-component onclick=(debounce (action "increment") 1000)}}
	+1
{{/my-component}}
```

## define

Defines the given property on the given object.

```handlebars
{{define this "reversed" (reverse users)}}
```

## modify

Modifies the current selection of the given array with the curried item object.

```handlebars
{{#my-component onselect=(modify this model)}}
	Select
{{/my-component}}
```

```javascript
export default Ember.Component.extend({
	click() {
		this.sendAction("onselect", item);
	}
});
```

Or toggle a selected item by passing the selected object and a `toggle` option.

```javascript
export default Ember.Component.extend({
	click() {
		this.sendAction("onselect", item, { toggle:true, retain: true });
	}
});
```

Or select a range of items by passing the selected object and a `range` option.

```javascript
export default Ember.Component.extend({
	click() {
		this.sendAction("onselect", item, { range:true, retain: true });
	}
});
```

Or to use a specific key on the controller within which the selection will be stored.

```handlebars
{{#my-component onselect=(modify this model key="selected")}}
	Select
{{/my-component}}
```

## notify

Displays a notification as a result of an action on a component.

```handlebars
{{#my-component onsave=(notify "Thanks" "The blog post data has been saved.")}}
	Save
{{/my-component}}
```

## prompt

Displays a `window.prompt` message as a result of an action on a component.

```handlebars
{{my-component ask-name=(prompt "What is your name?")}}
```

## queue

Enables queuing of a sequence of actions together to form a larger action, passing the original arguments to each action.

```handlebars
{{#my-component onclick=(action (queue (action "addBasket") (action "goToPayment")) model)}}
	Add to basket and pay
{{/my-component}}
```

If any action in the queue returns a promise, then the queue will wait for the promise to return, before moving onto the next action. If the Promise rejects, the rest of the queue will be aborted.

## run

Allows an action to be called with specified arguments.

```handlebars
{{#my-component onclick=(run (transition-to "posts.post" post))}}
	View all posts
{{/my-component}}
```

Or you can specify that any additional curried arguments will be ignored.

```handlebars
{{#my-component onclick=(run (transition-to "posts.post" post) curry=false)}}
	View all posts
{{/my-component}}
```

## toggle

Toggles the primary argument as a boolean value.

```handlebars
{{#my-component onclick=(toggle this "isEnabled")}}
	{{#if isEnabled}}Disable{{else}}Enable{{/if}}
{{/my-component}}
```

Or you can toggle between specific values the primary argument as a boolean value.

```handlebars
{{#my-component onclick=(toggle this "view" "landscape" "portrait")}}
	{{#if (eq view "landscape")}}Switch to portrait{{else}}Switch to landscape{{/if}}
{{/my-component}}
```

## throttle

Waits for the specified time before running an action, discarding all events in the meantime.

```handlebars
{{#my-component onclick=(throttle (action "increment") 1000)}}
	+1
{{/my-component}}
```

## uncurry

Allows an action to be called with specified arguments, whilst ignoring any curried arguments.

```handlebars
{{#my-component onclick=(uncurry (transition-to "posts.post" post))}}
	View all posts
{{/my-component}}
```
