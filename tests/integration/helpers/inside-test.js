import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | inside', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if a string contains a value', async function(assert) {
		assert.expect(2);
		this.set('input', "some");
		await render(hbs`{{inside "this is some text" input}}`);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', "none");
		assert.equal(this.element.textContent.trim(), 'false');
	});
});
