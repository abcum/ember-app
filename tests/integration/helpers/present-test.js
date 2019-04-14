import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | present', function(hooks) {
	setupRenderingTest(hooks);
	test('It checks if all values are present', async function(assert) {
		assert.expect(2);
		this.set('input', true);
		await render(hbs`{{present true input}}`);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', "\n\t");
		assert.equal(this.element.textContent.trim(), 'false');
	});
});
