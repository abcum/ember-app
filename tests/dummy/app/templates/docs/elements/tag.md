# Tag

The `app-tag` component enables adding badges, labels, and tags to an Ember application.

## Basic badge

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-tag.hbs'}}
		{{app-tag text="Badge label"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-tag.hbs'}}
{{/docs-demo}}

## Badge colours

All tags can be given a colour with the `type` attribute.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-tag-basic.hbs'}}
		{{app-tag type="green" text="Coloured tag"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-tag-basic.hbs'}}
{{/docs-demo}}

## Tagged badges

To give the badge a key specify the `key` attribute.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-tag-tagged.hbs'}}
		{{app-tag type="lime" key="status" text="Keyed tag"}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-tag-tagged.hbs'}}
{{/docs-demo}}

## Curved corners

To display the tag with curved borders, set the `curved` attribute to true.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-tag-tagged-curved.hbs'}}
		{{app-tag type="orange" key="status" text="Curved tag" curved=true}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-tag-tagged-curved.hbs'}}
{{/docs-demo}}

## Badge removal

To display a close button, in order to run a callback when a tag is remove, pass a `close` action.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-tag-tagged-closeable.hbs'}}
		{{app-tag type="red" text="Closeable tag" close=(console 'Closed')}}
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-tag-tagged-closeable.hbs'}}
{{/docs-demo}}

## Different colours

Tags are available in a number of different colours, each of which is visible below.

{{#docs-demo as |demo|}}
	{{#demo.example name='docs-demo-elements-tag-tagged-types.hbs'}}
		{{app-tag type="white" text="white"}} &nbsp;
		{{app-tag type="pale" text="pale"}} &nbsp;
		{{app-tag type="grey" text="grey"}} &nbsp;
		{{app-tag type="light" text="light"}} &nbsp;
		{{app-tag type="dark" text="dark"}} &nbsp;
		{{app-tag type="black" text="black"}} &nbsp;
		{{app-tag type="chartreuse" text="chartreuse"}} &nbsp;
		{{app-tag type="green" text="green"}} &nbsp;
		{{app-tag type="seafoam" text="seafoam"}} &nbsp;
		{{app-tag type="lime" text="lime"}} &nbsp;
		{{app-tag type="azure" text="azure"}} &nbsp;
		{{app-tag type="blue" text="blue"}} &nbsp;
		{{app-tag type="royal" text="royal"}} &nbsp;
		{{app-tag type="turquoise" text="turquoise"}} &nbsp;
		{{app-tag type="yellow" text="yellow"}} &nbsp;
		{{app-tag type="orange" text="orange"}} &nbsp;
		{{app-tag type="red" text="red"}} &nbsp;
		{{app-tag type="strawberry" text="strawberry"}} &nbsp;
		{{app-tag type="pink" text="pink"}} &nbsp;
		{{app-tag type="magenta" text="magenta"}} &nbsp;
		{{app-tag type="purple" text="purple"}} &nbsp;
	{{/demo.example}}
	{{demo.snippet 'docs-demo-elements-tag-tagged-types.hbs'}}
{{/docs-demo}}
