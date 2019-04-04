# Select

The `app-select` component adds functionality for adding html5 select inputs, by building the menu options instead of passing in data objects.

## Basic menu

Create a basic select menu. Use the special `.option` component, which takes a `value` and `label` properties, to define menu items.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-select-basic.hbs'}}
		Author type:
		{{#app-select value=type select=(action (mut type)) as |select|}}
			{{select.option label="Not known"}}
			{{select.option value="author" label="Author"}}
			{{select.option value="reviewer" label="Reviewer"}}
			{{select.option value="collaborator" label="Collaborator"}}
		{{/app-select}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-select-basic.hbs'}}
{{/docs-demo}}

## Grouped menu

Create a more advanced select menu with grouped options. Each group is defined using the special `.group` component, which takes a `label` property.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-select-grouped.hbs'}}
		User permissions:
		{{#app-select value=perm select=(action (mut perm)) as |select|}}
		    {{select.option label="No permissions"}}
		    {{#select.group label="Reading"}}
		        {{select.option value="view" label="Can view posts"}}
		        {{select.option value="comment" label="Can view and comment on posts"}}
		    {{/select.group}}
		    {{#select.group label="Writing"}}
		        {{select.option value="write" label="Can write posts"}}
		        {{select.option value="alter" label="Can write and alter other's posts"}}
		        {{select.option value="full" label="Can write, alter, and delete posts"}}
		    {{/select.group}}
		{{/app-select}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-select-grouped.hbs'}}
{{/docs-demo}}

## Multiple options

To enable a multi-select select menu, set the `multiple` attribute to `true`.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-select-multiple.hbs'}}
		{{#app-select value=perms multiple=true select=(action (mut perms)) as |select|}}
		    {{select.option label="No permissions"}}
		    {{#select.group label="Reading"}}
		        {{select.option value="view" label="Can view posts"}}
		        {{select.option value="comment" label="Can view and comment on posts"}}
		    {{/select.group}}
		    {{#select.group label="Writing"}}
		        {{select.option value="write" label="Can write posts"}}
		        {{select.option value="alter" label="Can write and alter other's posts"}}
		        {{select.option value="full" label="Can write, alter, and delete posts"}}
		    {{/select.group}}
		{{/app-select}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-select-multiple.hbs'}}
{{/docs-demo}}
