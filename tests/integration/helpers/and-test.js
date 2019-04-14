import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | and', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if all values are truthy', async function(assert) {
		assert.expect(2);
		this.set('input', true);
		await render(hbs`{{and 1 2 3 true input}}`);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', false);
		assert.equal(this.element.textContent.trim(), 'false');
	});
});
