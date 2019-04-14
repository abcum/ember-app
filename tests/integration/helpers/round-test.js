import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | round', function(hooks) {
	setupRenderingTest(hooks);
	test('It rounds down to the nearest value', async function(assert) {
		assert.expect(4);
		this.set('input', 0);
		await render(hbs`{{round input}}`);
		assert.equal(this.element.textContent.trim(), '0');
		this.set('input', 0.1);
		assert.equal(this.element.textContent.trim(), '0');
		this.set('input', 0.5);
		assert.equal(this.element.textContent.trim(), '1');
		this.set('input', 1);
		assert.equal(this.element.textContent.trim(), '1');
	});
});
