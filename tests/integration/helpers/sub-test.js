import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | sub', function(hooks) {
	setupRenderingTest(hooks);
	test('It subtracts values', async function(assert) {
		assert.expect(2);
		this.set('input', 10);
		await render(hbs`{{sub 10 5 5 input}}`);
		assert.equal(this.element.textContent.trim(), '-10');
		this.set('input', 30);
		assert.equal(this.element.textContent.trim(), '-30');
	});
});
