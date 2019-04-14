import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | camelize', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `camelize` format', async function(assert) {
		assert.expect(2);
		this.set('input', 'this Is some TEXT');
		await render(hbs`{{camelize input}}`);
		assert.equal(this.element.textContent.trim(), 'thisIsSomeTEXT');
		this.set('input', 'this Was some TEXT');
		assert.equal(this.element.textContent.trim(), 'thisWasSomeTEXT');
	});
});
