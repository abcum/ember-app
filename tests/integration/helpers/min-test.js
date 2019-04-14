import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | min', function(hooks) {
	setupRenderingTest(hooks);
	test('It returns the minimum value', async function(assert) {
		assert.expect(2);
		this.set('input', 1000);
		await render(hbs`{{min 100 250 500 input}}`);
		assert.equal(this.element.textContent.trim(), '100');
		this.set('input', 50);
		assert.equal(this.element.textContent.trim(), '50');
	});
});
