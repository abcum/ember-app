import Mixin from '@ember/object/mixin';
import Electron from 'electron';

export default Mixin.create({

	init() {

		const self = this;

		this._super(...arguments);

		if (Electron === null) return;

		const { remote, webFrame } = Electron;

		try {

			const spellchecker = remote.require('spellchecker');

			if (spellchecker) {

				let loc = remote.app.getLocale() || 'en-GB';

				webFrame.setSpellCheckProvider(loc, true, {
					spellCheck(text) {

						let incorrect = spellchecker.isMisspelled(text);
						let selection = window.getSelection().toString();

						if (incorrect && selection === text) {
							self.suggestions = spellchecker.getCorrectionsForMisspelling(text);
						}

						return !incorrect;

					}
				});

			}

		} catch(error) {
			// Ignore error
		}

	},

});
