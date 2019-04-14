import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | begs-with', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if a string begins with a value', async function(assert) {
		assert.expect(2);
		this.set('check', "hello");
		this.set('input', "h");
		await render(hbs`{{begs-with check input}}`);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', "a");
		assert.equal(this.element.textContent.trim(), 'false');
	});
});
