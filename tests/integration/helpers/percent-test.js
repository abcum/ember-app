import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | percent', function(hooks) {
	setupRenderingTest(hooks);
	test('It formats the percentage correctly', async function(assert) {

		assert.expect(6);

		await render(hbs`{{percent 0.33}}`);
		assert.equal(this.element.textContent.trim(), '33%');
		await render(hbs`{{percent 0.33 minimumFractionDigits=2}}`);
		assert.equal(this.element.textContent.trim(), '33.00%');
		await render(hbs`{{percent 0.3301689 maximumFractionDigits=2}}`);
		assert.equal(this.element.textContent.trim(), '33.02%');

		await render(hbs`{{percent 363}}`);
		assert.equal(this.element.textContent.trim(), '36,300%');
		await render(hbs`{{percent 363 useGrouping=true}}`);
		assert.equal(this.element.textContent.trim(), '36,300%');
		await render(hbs`{{percent 363 useGrouping=false}}`);
		assert.equal(this.element.textContent.trim(), '36300%');

	});
});
