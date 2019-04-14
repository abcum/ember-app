import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | not', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if all values are truthy', async function(assert) {
		assert.expect(2);
		this.set('input', false);
		await render(hbs`{{not 0 null false input}}`);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', true);
		assert.equal(this.element.textContent.trim(), 'false');
	});
});
