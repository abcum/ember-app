import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | uppercase', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `uppercase` format', async function(assert) {
		assert.expect(2);
		this.set('input', 'this Is some TEXT');
		await render(hbs`{{uppercase input}}`);
		assert.equal(this.element.textContent.trim(), 'THIS IS SOME TEXT');
		this.set('input', 'this Was some TEXT');
		assert.equal(this.element.textContent.trim(), 'THIS WAS SOME TEXT');
	});
});
