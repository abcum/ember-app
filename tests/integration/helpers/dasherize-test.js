import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | dasherize', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `dasherize` format', async function(assert) {
		assert.expect(2);
		this.set('input', 'this Is some TEXT');
		await render(hbs`{{dasherize input}}`);
		assert.equal(this.element.textContent.trim(), 'this-is-some-text');
		this.set('input', 'this Was some TEXT');
		assert.equal(this.element.textContent.trim(), 'this-was-some-text');
	});
});
