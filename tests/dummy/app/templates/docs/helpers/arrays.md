# Array helpers

The array helpers enable advanced array logic and manipulation.

## any-by

Checks whether the given property is `true` on any item in a given array.

```handlebars
{{#if (any-by "isAdult" people)}}
	{{!-- At least one of people has isAdult === true --}}
{{/if}}
```

Or if given property is equal to the given value on any item in a given array.

```handlebars
{{#if (any-by "isChild" false people)}}
	{{!-- At least one of people has isChild === false --}}
{{/if}}
```

## append

Appends each given array to the previous given arrays, resulting in a single flat array.

```handlebars
{{#each (append user users) as |person|}}
	{{!-- Flat array of user and users --}}
{{/each}}
```

## array

Lets you create arrays directly in the template.

```handlebars
{{#each (array 1 2 3 4 5) as |step|}}
	- Step {{step}} is ...
{{/each}}
```

## compact

Removes empty values from the given array.

```handlebars
{{#each (compact people) as |person|}}
	{{!-- All with no null or undefined items --}}
{{/each}}
```

## empty

Checks to see if an array is empty.

```handlebars
{{#if (empty people)}}
	No people exists...
{{/if}}
```

## every-by

Checks whether the given property is `true` on every item in a given array.

```handlebars
{{#if (every-by "isAdult" people)}}
	{{!-- All people have isAdult === true --}}
{{/if}}
```

Or if given property is equal to the given value on every item in a given array.

```handlebars
{{#if (every-by "isChild" false people)}}
	{{!-- All people have isChild === false --}}
{{/if}}
```

## filter

Returns the given array filtered by a callback.

```handlebars
{{#each (filter (action "checkAdult") people) as |adult|}}
	{{!-- All where checkAdult action is truthy --}}
{{/each}}
```

## filter-by

Returns the given array filtered by a property.

```handlebars
{{#each (filter-by "isAdult" people) as |adult|}}
	{{!-- All where isAdult is truthy --}}
{{/each}}
```

Returns the given array filtered by a property.

```handlebars
{{#each (filter-by "isChild" false people) as |adult|}}
	{{!-- All where isChild is false --}}
{{/each}}
```

You can also pass an action as second argument.

```handlebars
{{#each (filter-by (gt 18 (object-key "age")) people) as |adult|}}
	{{!-- All where age is greater than 18 --}}
{{/each}}
```

## find

Returns the first entry matching the given callback from the given array.

```handlebars
{{#with (find (action "checkAdult") people) as |adult|}}
	{{!-- The first item where isAdult is truthy. --}}
{{/with}}
```

## find-by

Returns the first entry matching the given value from the given array.

```handlebars
{{#with (find-by "isAdult" people) as |adult|}}
	{{!-- The first item where isAdult is truthy. --}}
{{/with}}
```

Returns the first entry matching the given value from the given array.

```handlebars
{{#with (find-by "isChild" false people) as |adult|}}
	{{!-- The first item where isChild is false. --}}
{{/with}}
```

You can also pass an action as second argument.

```handlebars
{{#with (find-by (gt 18 (object-key "age")) people) as |adult|}}
	{{!-- The first item where age is greater than 18 --}}
{{/with}}
```

## first

Returns the first object of the given array.

```handlebars
{{#with (first people) as |person|}}
	{{!-- The first person --}}
{{/with}}
```

## flatten

Returns a flattened array from the given array.

```js
let array = [ [1], [2], [3] ];
```

```handlebars
{{#each (flatten array) as |step|}}
	- Step {{step}} is ...
{{/each}}
```

## group-by

Groups items in a given array by the given path.

```handlebars
{{#each-in (group-by "category" products) as |category products|}}
	- {{category}}
	{{#each products as |product|}}
		{{!-- Products grouped by category--}}
	{{/each}}
{{/each-in}}
```

## includes

Checks to see if an array includes an object.

```handlebars
{{#if (includes selectedPerson people)}}
	selectedPerson exists within people...
{{/if}}
```

Or if an array includes an array of objects.

```handlebars
{{#if (includes selectedPeople people)}}
	selectedPeople exist within people...
{{/if}}
```

## invoke

Calls a method on an object.

```handlebars
{{#each users as |user|}}
	<button {{action (invoke "save" user)}}>Save</button>
{{/each}}
```

Or on each item in an array.

```handlebars
<button {{action (invoke "save" users)}}>Save</button>
```

## intersect

Returns an array of unique items which are present in all given arrays.

```handlebars
{{#each (intersect users admins) as |testers|}}
	{{!-- All who are in both users and admins --}}
{{/each}}
```

## join

Concatenates the given array with an optional separator.

```handlebars
{{join (array "tag1" "tag2" "tag3")}} {{!-- "tag1 tag2 tag3" --}}
```

You can use an optional separator.

```handlebars
{{join ", " (array "tag1" "tag2" "tag3")}} {{!-- "tag1, tag2, tag3" --}}
```

## last

Returns the last object of the given array.

```handlebars
{{#with (last people) as |person|}}
	{{!-- The last person --}}
{{/with}}
```

## map

Returns the given array mapped to the given callback.

```handlebars
{{#each (map (action "getName") users) as |name|}}
	{{name}}
{{/each}}
```

## map-by

Returns the given array mapped to the given property.

```handlebars
{{#each (map-by "name" users) as |name|}}
	{{name}}
{{/each}}
```

## object-at

Returns the object at the given `index` of an array.

```handlebars
{{#with (object-at 1 people) as |person|}}
	{{!-- The 1st person --}}
{{/with}}
```

## objects-at

Returns the object at the given `indexes` of an array.

```handlebars
{{#each (objects-at 1 3 5 people) as |person|}}
	{{!-- The 1st, 3rd, 5th people --}}
{{/each}}
```

## omit

Returns the given array with the first `count` items omitted.

```handlebars
{{#each (omit 3 people) as |person|}}
	{{!-- All except the first 3 people --}}
{{/each}}
```

## prepend

Prepends each given array to the previous given arrays, resulting in a single flat array.

```handlebars
{{#each (prepend user users) as |person|}}
	{{!-- Flat array of users and user --}}
{{/each}}
```

## range

Creates an array whose contents is a range of numbers between min and max.

```handlebars
{{#each (range 10 20) as |step|}}
	...
{{/each}}
```

## reject

Returns the given array filtered by a callback.

```handlebars
{{#each (reject (action "checkAdult") people) as |child|}}
	{{!-- All except where checkAdult action is truthy --}}
{{/each}}
```

## reject-by

Returns the given array omitting those matching the property.

```handlebars
{{#each (reject-by "isAdult" people) as |child|}}
	{{!-- All except where isAdult is truthy --}}
{{/each}}
```

Returns the given array omitting those matching the property.

```handlebars
{{#each (reject-by "isChild" false people) as |child|}}
	{{!-- All except where isChild is false --}}
{{/each}}
```

You can also pass an action as second argument.

```handlebars
{{#each (reject-by (gt 18 (object-key "age")) people) as |child|}}
	{{!-- All except where age is greater than 18 --}}
{{/each}}
```

## reverse

Rearranges the array in reverse order.

```handlebars
{{#each (reverse users) as |user|}}
	{{!-- All in reverse order --}}
{{/each}}
```

## slice

Returns a slice of the given array.

```handlebars
{{#each (slice 0 5 people) as |person|}}
	{{!-- Only the first 5 people --}}
{{/each}}
```

## search-by

Returns the given array where the given properties contain the given value.

```handlebars
{{input type="text" value=search}}
```

```handlebars
{{#each (search-by "firstname" "lastname" search people) as |person|}}
	{{!-- All where firstname or lastname contains search --}}
{{/each}}
```

You can also use an array containing the properties to search.

```handlebars
{{input type="text" value=search}}
```

```handlebars
{{input-select value=fields options=(array "firstname" "lastname")}}
```

```handlebars
{{#each (search-by fields search people) as |person|}}
	{{!-- All where firstname or lastname contains search --}}
{{/each}}
```

## sort-by

Returns the given array sorted by the defined properties.

```handlebars
{{#each (sort-by "age:asc" people) as |person|}}
	{{!-- All people sorted by age ascending --}}
{{/each}}
```

You can also pass an action as second argument.

```handlebars
{{#each (sort-by (action "mySortAction") people) as |person|}}
	{{!-- All people sorted by the custom sorting action --}}
{{/each}}
```

## sort-locale-by

Returns the given array sorted by the defined properties.

```handlebars
{{#each (sort-locale-by "name:asc" people) as |person|}}
	{{!-- All people sorted by name ascending --}}
{{/each}}
```

You can also pass `asc` or `desc` suffixes to specify sort ordering.

```handlebars
{{#each (sort-locale-by "name:desc" people) as |person|}}
	{{!-- All people sorted by name descending --}}
{{/each}}
```

Or you can specify that numeric collation should be used when sorting.

```handlebars
{{#each (sort-locale-by "age" people numeric=true) as |person|}}
	{{!-- All people sorted by age with numbers sorting correctly --}}
{{/each}}
```

Or you can specify that punctuation should be ignored when sorting.

```handlebars
{{#each (sort-locale-by "name" people ignorePunctuation=false) as |person|}}
	{{!-- All people sorted by name with punctuation ignored --}}
{{/each}}
```

Or you can specify which case should sort first. 
Possible values are `lower`, `upper`, or `false` (default).

```handlebars
{{#each (sort-locale-by "name" people caseFirst="upper") as |person|}}
	{{!-- All people sorted by name with upper case ordered first --}}
{{/each}}
```

Or you can specify the sensitivity of the locale sort algorithm. 
Possible values are `case`, `accent`, `variant`, or `base` (default).

```handlebars
{{#each (sort-locale-by "name" people sensitivity="case") as |person|}}
	{{!-- All people sorted by name with specifc sensitivity case ordering --}}
{{/each}}
```

## split

Splits a string/strings on a character and returns an array.

```handlebars
{{#each (split "/" "app/styles/sub/main.js") as |directory|}}
	{{!-- Array of directories without / character --}}
{{/each}}
```

## take

Returns the given array with the first `count` items only.

```handlebars
{{#each (take 3 people) as |person|}}
	{{!-- Only the first 3 people --}}
{{/each}}
```

## union

Returns an array of unique items from all of the given arrays.

```handlebars
{{#each (union users admins) as |person|}}
	{{!-- Unique users and admins --}}
{{/each}}
```

## uniq

Returns an array of unique items from all of the given arrays.

```handlebars
{{#each (uniq users admins) as |person|}}
	{{!-- Unique users and admins --}}
{{/each}}
```

## uniq-by

Returns an array of unique items, compared using the given property, from the given array.

```handlebars
{{#each (uniq-by "email" users) as |person|}}
	{{!-- Unique users by email --}}
{{/each}}
```

## w

Splits a string/strings on whitespace or turns multiple words into an array.

```handlebars
{{#each (w "First Second" "Third") as |step|}}
	- Step {{step}} is ...
{{/each}}
```

## without

Returns the given array without the given item or items.

```handlebars
{{#each (without selectedusers users) as |user|}}
	{{!-- All users who are not in selectedusers --}}
{{/each}}
```
