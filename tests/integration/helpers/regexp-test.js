import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | regexp', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the input text with `regexp` regular expresison', async function(assert) {
		assert.expect(2);
		this.set('input', 'Hello');
		await render(hbs`{{replace "Hello everyone. Hello world." (regexp input "gi") "Goodbye"}}`);
		assert.equal(this.element.textContent.trim(), 'Goodbye everyone. Goodbye world.');
		this.set('input', 'H([a-z]*)o');
		assert.equal(this.element.textContent.trim(), 'Goodbye everyone. Goodbye world.');
	});
});
