import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | ne', function(hooks) {
	setupRenderingTest(hooks);
	test('It returns whether values are not equal', async function(assert) {
		assert.expect(2);
		this.set('input', 'test');
		await render(hbs`{{ne 'test' input}}`);
		assert.equal(this.element.textContent.trim(), 'false');
		this.set('input', 'none');
		assert.equal(this.element.textContent.trim(), 'true');
	});
});
