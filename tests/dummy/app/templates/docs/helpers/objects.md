# Object helpers

The object helpers enable advanced object logic and manipulation.

## match-by

Returns true if the given properties contain the given value.

```handlebars
{{input type="text" value=search}}
```

```handlebars
{{#if (match-by "firstname" "lastname" search person)}}
	{{!-- The firstname or lastname field contains search --}}
{{/if}}
```

You can also use an array containing the properties to search.

```handlebars
{{input type="text" value=search}}
```

```handlebars
{{input-select value=fields options=(array "firstname" "lastname")}}
```

```handlebars
{{#if (match-by fields search person)}}
	{{!-- The firstname or lastname field contains search --}}
{{/if}}
```

## object-key

Extracts the property from the given object.

```handlebars
{{object-key "name" person}}
```
