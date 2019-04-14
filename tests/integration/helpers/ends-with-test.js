import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | ends-with', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if a string ends with a value', async function(assert) {
		assert.expect(2);
		this.set('check', "hello");
		this.set('input', "o");
		await render(hbs`{{ends-with check input}}`);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', "z");
		assert.equal(this.element.textContent.trim(), 'false');
	});
});
