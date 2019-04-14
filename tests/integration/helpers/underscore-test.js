import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | underscore', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `underscore` format', async function(assert) {
		assert.expect(2);
		this.set('input', 'this Is some TEXT');
		await render(hbs`{{underscore input}}`);
		assert.equal(this.element.textContent.trim(), 'this_is_some_text');
		this.set('input', 'this Was some TEXT');
		assert.equal(this.element.textContent.trim(), 'this_was_some_text');
	});
});
