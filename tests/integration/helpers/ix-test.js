import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | ix', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if all values are false', async function(assert) {
		assert.expect(2);
		this.set('input', true);
		await render(hbs`{{ix false input}}`);
		assert.equal(this.element.textContent.trim(), 'false');
		this.set('input', false);
		assert.equal(this.element.textContent.trim(), 'true');
	});
});
