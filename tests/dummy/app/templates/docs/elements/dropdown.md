# Dropdown

The `app-dropdown` component adds functionality for adding custom dropdown menus, by building the menu options instead of passing in data objects. Menus can support custom styling, multi-select, and custom inner html.

## Basic menu

Create a basic dropdown menu. Use the special `.option` component, which takes a `value` and `label` properties, to define menu items.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-dropdown-basic.hbs'}}
		Author type:
		{{#app-dropdown value=type select=(action (mut type)) as |dropdown|}}
			{{dropdown.option label="Not known"}}
			{{dropdown.option value="author" label="Author"}}
			{{dropdown.option value="reviewer" label="Reviewer"}}
			{{dropdown.option value="collaborator" label="Collaborator"}}
		{{/app-dropdown}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-dropdown-basic.hbs'}}
{{/docs-demo}}

## Grouped menu

Create a more advanced dropdown menu with grouped options. Each group is defined using the special `.group` component, which takes a `label` property.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-dropdown-grouped.hbs'}}
		User permissions:
		{{#app-dropdown value=perm select=(action (mut perm)) as |dropdown|}}
			{{dropdown.option label="No permissions"}}
			{{#dropdown.group label="Reading"}}
				{{dropdown.option value="view" label="Can view posts"}}
				{{dropdown.option value="comment" label="Can view and comment on posts"}}
			{{/dropdown.group}}
			{{#dropdown.group label="Writing"}}
				{{dropdown.option value="write" label="Can write posts"}}
				{{dropdown.option value="alter" label="Can write and alter other's posts"}}
				{{dropdown.option value="full" label="Can write, alter, and delete posts"}}
			{{/dropdown.group}}
		{{/app-dropdown}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-dropdown-grouped.hbs'}}
{{/docs-demo}}

## Multiple options

To enable a multi-select dropdown menu, set the `multiple` attribute to `true`, and set the default text for the menu, using the `default` attribute.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-dropdown-multiple.hbs'}}
		User permissions:
		{{#app-dropdown value=perms multiple=true default='Specify permissions' select=(action (mut perms)) as |dropdown|}}
			{{dropdown.option label="No permissions"}}
			{{#dropdown.group label="Reading"}}
				{{dropdown.option value="view" label="Can view posts"}}
				{{dropdown.option value="comment" label="Can comment on posts"}}
			{{/dropdown.group}}
			{{#dropdown.group label="Writing"}}
				{{dropdown.option value="write" label="Can write posts"}}
				{{dropdown.option value="alter" label="Can alter posts"}}
				{{dropdown.option value="full" label="Can delete posts"}}
			{{/dropdown.group}}
		{{/app-dropdown}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-dropdown-multiple.hbs'}}
{{/docs-demo}}

## Custom styled options

To use custom html or styling for a specific input option, use a block helper.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-dropdown-custom.hbs'}}
		User permissions:
		{{#app-dropdown value=perm select=(action (mut perm)) as |dropdown|}}
			{{dropdown.option label="No permissions"}}
			{{#dropdown.group label="Reading"}}
				{{dropdown.option value="view" label="Can view posts"}}
				{{dropdown.option value="comment" label="Can view and comment on posts"}}
			{{/dropdown.group}}
			{{#dropdown.group label="Writing"}}
				{{dropdown.option value="write" label="Can write posts"}}
				{{dropdown.option value="alter" label="Can write and alter other's posts"}}
				{{#dropdown.option value="full"}}
					<span style="color:red;">Can write, alter, and delete posts</span>
				{{/dropdown.option}}
			{{/dropdown.group}}
		{{/app-dropdown}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-dropdown-custom.hbs'}}
{{/docs-demo}}







To style the modal background and the modal window itself, follow the css styling code below.

```scss
input-popup > label {
	// Styles for the display text
}
input-popup > input-popup-front {
	// Styles for the popup menu
}
input-popup > input-popup-front input-popup-option {
	// Styles for a popup menu option
}
input-popup > input-popup-front input-popup-group > label {
	// Styles for a popup menu group
}
```
