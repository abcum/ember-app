import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | swapcase', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `swapcase` format', async function(assert) {
		assert.expect(2);
		this.set('input', 'this Is some TEXT');
		await render(hbs`{{swapcase input}}`);
		assert.equal(this.element.textContent.trim(), 'THIS iS SOME text');
		this.set('input', 'this Was some TEXT');
		assert.equal(this.element.textContent.trim(), 'THIS wAS SOME text');
	});
});
