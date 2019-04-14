import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | number', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the number correctly', async function(assert) {

		assert.expect(6);

		await render(hbs`{{number 33}}`);
		assert.equal(this.element.textContent.trim(), '33');
		await render(hbs`{{number 33 minimumFractionDigits=2}}`);
		assert.equal(this.element.textContent.trim(), '33.00');
		await render(hbs`{{number 33.01689 maximumFractionDigits=2}}`);
		assert.equal(this.element.textContent.trim(), '33.02');

		await render(hbs`{{number 369000}}`);
		assert.equal(this.element.textContent.trim(), '369,000');
		await render(hbs`{{number 369000 useGrouping=true}}`);
		assert.equal(this.element.textContent.trim(), '369,000');
		await render(hbs`{{number 369000 useGrouping=false}}`);
		assert.equal(this.element.textContent.trim(), '369000');

	});
});
