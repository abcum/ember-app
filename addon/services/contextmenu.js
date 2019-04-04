import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { next } from '@ember/runloop';
import { A } from '@ember/array';
import Electron from 'electron';
import Spellcheck from '../mixins/spell';
import feature from '../utils/features';

export default Service.extend(Spellcheck, {

	route: computed(function() {
		return getOwner(this).lookup('route:application');
	}).readOnly(),

	items: computed(function() {
		return A();
	}),

	text: computed(function() {
		return [
			{ label: 'Undo', role: 'undo' },
			{ label: 'Redo', role: 'redo' },
			{ type: 'separator' },
			{ label: 'Cut', role: 'cut' },
			{ label: 'Copy', role: 'copy' },
			{ label: 'Paste', role: 'paste' },
			{ label: 'Select All', role: 'selectall' }
		];
	}),

	list: computed('items', function() {
		return this.get('items').map(item => {
			return {
				role: item.get('role'),
				type: item.get('type'),
				label: item.get('label'),
				enabled: !!item.get('enabled'),
				visible: !!item.get('visible'),
				checked: !!item.get('checked'),
				sublabel: item.get('sublabel'),
				accelerator: item.get('accelerator'),
				click: () => item.get('click')(),
			};
		});
	}),

	init() {

		this._super(...arguments);

		if (feature.addEventListener === false) return;

		document.addEventListener('mousedown', (e) => {
			if ( !e.target.matches('app-context-menu-item') ) {
				this.hide();
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.which == 27) this.hide();
		});

	},

	hide() {

		this.suggestions = [];

		this.get('route').disconnectOutlet({
			outlet: 'context-menu',
			parentView: 'application',
		});

	},

	show(e, name, model) {

		this.set('items', A());

		if (Electron) {
			return this._showDesktop(e, name, model);
		} else {
			return this._showBrowser(e, name, model);
		}

	},

	_render(e, name, model) {

		let cont = getOwner(this).lookup(`controller:${name}`);

		if (!cont) this.get('route').generateController(name);

		this.get('route').render(name, {
			model: model,
			controller: name,
			into: 'application',
			outlet: 'context-menu',
		});

	},

	_showBrowser(e, name, model) {

		if ( e.target.matches('input') ) return true;

		if ( e.target.matches('textarea') ) return true;

		if (e.target.isContentEditable) return true;

		this.setProperties({ x: e.clientX, y: e.clientY });

		this._render(e, name, model);

		e.stopPropagation();

		e.preventDefault();

		return false;

	},

	_showDesktop(e, name, model) {

		e.preventDefault();

		e.stopPropagation();

		if ( e.target.matches('input') || e.target.matches('textarea') ) {
			this._showDesktopText();
		} else if (e.target.isContentEditable) {
			this._showDesktopText();
		} else {
			this._render(e, name, model);
			this._showDesktopMenu();
		}

		return false;

	},

	_showDesktopMenu() {

		next( () => {

			let menu = this.get('list');

			const remote = Electron.remote;

			// Build the menu from the template.

			this.menu = remote.Menu.buildFromTemplate(menu);

			// Display the contextmenu in the window.

			this.menu.popup({ window: remote.getCurrentWindow() });

			// Clear up the contextmenu artifacts.

			this.hide();

		});

	},

	_showDesktopText() {

		let menu = this.get('text');

		const remote = Electron.remote;

		// Build the menu from the template.

		this.menu = remote.Menu.buildFromTemplate(menu);

		if (this.suggestions && this.suggestions.length > 0) {

			// Add a separator at the top of the menu.

			this.menu.insert(0, new remote.MenuItem({ type: 'separator' }));

			// Add each spelling suggesstion at the top.

			this.suggestions.forEach(s => {
				this.menu.insert(0, new remote.MenuItem({
					label: s,
					click() {
						remote.getCurrentWebContents().replaceMisspelling(s);
					},
				}));
			});

		}

		// Display the contextmenu in the window.

		this.menu.popup({ window: remote.getCurrentWindow() });

		// Clear up the contextmenu artifacts.

		this.hide();

	},

});
