# Sorting helpers

The sort helpers enable advanced sorting logic to extend the `sort-by` helper.

## natural-sort

Sorts the given array using a natural sort order with the current locale.

```handlebars
{{#each (sort-by (natural-sort "name") people) as |person|}}
	{{!-- All people sorted by name ascending --}}
{{/each}}
```

You can also pass `asc` or `desc` suffixes to specify sort ordering.

```handlebars
{{#each (sort-by (natural-sort "name:desc") people) as |person|}}
	{{!-- All people sorted by name descending --}}
{{/each}}
```

Or you can specify that numeric collation should be used when sorting.

```handlebars
{{#each (sort-by (natural-sort "name" numeric=true) people) as |person|}}
	{{!-- All people sorted by name with numbers sorting correctly --}}
{{/each}}
```

Or you can specify that punctuation should be ignored when sorting.

```handlebars
{{#each (sort-by (natural-sort "name" ignorePunctuation=false) people) as |person|}}
	{{!-- All people sorted by name with punctuation ignored --}}
{{/each}}
```

Or you can specify which case should sort first. 
Possible values are `lower`, `upper`, or `false` (default).

```handlebars
{{#each (sort-by (natural-sort "name" caseFirst="upper") people) as |person|}}
	{{!-- All people sorted by name with upper case ordered first --}}
{{/each}}
```

Or you can specify the sensitivity of the locale sort algorithm. 
Possible values are `case`, `accent`, `variant`, or `base` (default).

```handlebars
{{#each (sort-by (natural-sort "name" sensitivity="case") people) as |person|}}
	{{!-- All people sorted by name with specifc sensitivity case ordering --}}
{{/each}}
```
