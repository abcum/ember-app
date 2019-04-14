import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | map-by', function(hooks) {
	setupRenderingTest(hooks);
	test('It ensures map-by works correctly', async function(assert) {

		assert.expect(4);

		this.set('input', undefined);
		await render(hbs`{{#each (map-by input) as |v|}}{{v}} {{/each}}`);
		assert.equal(this.element.textContent.trim(), '');

		this.set('input', ['one', 'two']);
		await render(hbs`{{#each (map-by '' input) as |v|}}{{v}} {{/each}}`);
		assert.equal(this.element.textContent.trim(), 'one two');

		this.set('input', [{name:'one'}, {name:'two'}]);
		await render(hbs`{{#each (map-by 'name' input) as |v|}}{{v}} {{/each}}`);
		assert.equal(this.element.textContent.trim(), 'one two');

		this.set('func', v => v.name);
		this.set('input', [{name:'one'}, {name:'two'}]);
		await render(hbs`{{#each (map-by func input) as |v|}}{{v}} {{/each}}`);
		assert.equal(this.element.textContent.trim(), 'one two');

	});
});
