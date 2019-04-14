import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | mod', function(hooks) {
	setupRenderingTest(hooks);
	test('It returns the modulus of the given values', async function(assert) {
		assert.expect(4);
		this.set('input', 2);
		await render(hbs`{{mod 100 input}}`);
		assert.equal(this.element.textContent.trim(), '0');
		this.set('input', 3);
		assert.equal(this.element.textContent.trim(), '1');
		this.set('input', 4);
		assert.equal(this.element.textContent.trim(), '0');
		this.set('input', 5);
		assert.equal(this.element.textContent.trim(), '0');
	});
});
