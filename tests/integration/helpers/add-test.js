import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | add', function(hooks) {
	setupRenderingTest(hooks);
	test('It adds values', async function(assert) {
		assert.expect(2);
		this.set('input', 10);
		await render(hbs`{{add 10 5 5 input}}`);
		assert.equal(this.element.textContent.trim(), '30');
		this.set('input', 30);
		assert.equal(this.element.textContent.trim(), '50');
	});
});

