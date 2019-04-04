# Promise helpers

The promise helpers enable working with models and promises.

## await

Waits for a promise to resolve, and passes the promise contents to the helper.

If the `author` exists, but the promise has not yet been loaded, then the template will render anyway.

```handlebars
{{#if (await post.author)}}
	{{get (await post.author) "fullname"}}
{{else}}
	This post has no author.
{{/if}}
```

## is-fulfilled

Returns true when the promise is fulfilled.

```handlebars
{{#if (is-fulfilled post.author)}}
	The relationship promise has been fulfilled.
{{/if}}
```

## is-loaded

Returns true if the `ember-data` model is currently loading.

```handlebars
{{#if (is-loaded posts)}}
	The route model has loaded.
{{/if}}
```

## is-pending

Returns true if the promise is pending.

```handlebars
{{#if (is-pending post.author)}}
	The relationship promise is still pending.
{{/if}}
```

## is-rejected

Returns true when the promise is rejected.

```handlebars
{{#if (is-rejected post.author)}}
	The relationship promise has been rejected.
{{/if}}
```

## is-updating

Returns true if the `ember-data` model is currently updating.

```handlebars
{{#if (is-updating posts)}}
	The route model is currently updating.
{{/if}}
```

## rsvp-all

Returns a new promise which is fulfilled when all the given promises have been fulfilled, or rejected if any of them become rejected. The returned value is an array of fulfillment values for the passed in promises.

```handlebars
{{#if (is-pending (rsvp-all model.tags model.comments))}}
	Tags and comments are loading...
{{/if}}
```

## rsvp-hash

Returns a new promise which is fulfilled when all the given promises have been fulfilled, or rejected if any of them become rejected. The returned promise is fulfilled with a hash that has the same key names as the promises object argument.

```handlebars
{{#with (await (rsvp-hash tags=model.tags comments=model.comments)) as |data|}}
	There are {{data.tags.length}} tags and {{data.comments.length}} comments.
{{/with}}
```

## rsvp-race

Returns a new promise which is fulfilled when the first promise to be fulfilled is resolved. The returned value is the value of the first fulfilled promise.

```handlebars
{{#with (await (rsvp-race model.tags model.comments)) as |data|}}
	We are displaying the data which resolved fastest.
{{/with}}
```
