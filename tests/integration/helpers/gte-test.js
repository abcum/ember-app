import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | gte', function(hooks) {
	setupRenderingTest(hooks);
	test('It returns whether values are greater than or equal to', async function(assert) {
		assert.expect(3);
		this.set('input', 100);
		await render(hbs`{{gte 10 input}}`);
		assert.equal(this.element.textContent.trim(), 'false');
		this.set('input', 10);
		assert.equal(this.element.textContent.trim(), 'true');
		this.set('input', 5);
		assert.equal(this.element.textContent.trim(), 'true');
	});
});
