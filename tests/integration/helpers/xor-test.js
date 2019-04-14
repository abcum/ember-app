import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | xor', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if a single value is truthy', async function(assert) {
		assert.expect(3);
		this.set('check', true);
		this.set('input', true);
		await render(hbs`{{xor check input}}`);
		assert.equal(this.element.textContent.trim(), 'false');
		this.set('check', false);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', false);
		assert.equal(this.element.textContent.trim(), 'false');
	});
});
