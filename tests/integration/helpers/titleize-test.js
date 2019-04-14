import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | titleize', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `titleize` format', async function(assert) {
		assert.expect(2);
		this.set('input', 'this Is some TEXT');
		await render(hbs`{{titleize input}}`);
		assert.equal(this.element.textContent.trim(), 'This Is Some Text');
		this.set('input', 'this Was some TEXT');
		assert.equal(this.element.textContent.trim(), 'This Was Some Text');
	});
});
