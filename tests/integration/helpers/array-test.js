import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | array', function(hooks) {
	setupRenderingTest(hooks);
	test('It returns whether values are equal', async function(assert) {
		assert.expect(2);
		this.set('input', 5);
		await render(hbs`
			{{~#each (array 1 2 3 4 input) as |i|~}}
				{{i}}
			{{~/each~}}
		`);
		assert.equal(this.element.textContent.trim(), '12345');
		this.set('input', 0);
		assert.equal(this.element.textContent.trim(), '12340');
	});
});
