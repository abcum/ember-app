import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | sqrt', function(hooks) {
	setupRenderingTest(hooks);
	test('It returns the square root of the given value', async function(assert) {
		assert.expect(3);
		this.set('input', 9);
		await render(hbs`{{sqrt input}}`);
		assert.equal(this.element.textContent.trim(), '3');
		this.set('input', 25);
		assert.equal(this.element.textContent.trim(), '5');
		this.set('input', 100);
		assert.equal(this.element.textContent.trim(), '10');
	});
});
