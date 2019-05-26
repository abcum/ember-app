import Component from '@ember/component';
import { next } from '@ember/runloop';
import layout from '../templates/components/app-tooltip';

export default Component.extend({

	layout,

	side: 's',

	uniq: null,

	show: 'hover',

	hide: 'hover',

	enabled: false,

	visible: false,

	init() {

		this._super(...arguments);

		this.uniq = Math.random().toString(36).substr(2, 10);

		this.didClickHandler = this.onClick.bind(this);

		this.didEscapeHandler = this.onEscape.bind(this);

	},

	didInsertElement() {

		this._super(...arguments);

		let events = this.getTargetEvents();

		let target = this.getTargetElement();

		events.show.forEach(e => {
			switch (e) {
			case 'click':
				return this.initShowOnClick(target);
			case 'hover':
				return this.initShowOnHover(target);
			}
		});

		events.hide.forEach(e => {
			switch (e) {
			case 'click':
				return this.initHideOnClick(target);
			case 'hover':
				return this.initHideOnHover(target);
			case 'escape':
				return this.initHideOnEscape(target);
			}
		});

	},

	willDestroyElement() {

		document.removeEventListener('mousedown', this.didClickHandler);

		document.removeEventListener('keydown', this.didEscapeHandler);

		this._super(...arguments);

	},

	open() {

		this.set('enabled', true);

		next( () => {

			this.style();

			this.set('visible', true);

		});

	},

	close() {

		this.set('enabled', false);

		this.set('visible', false);

	},

	style() {

		let m = this.getTargetElement();

		let e = document.getElementById(this.uniq);

		let t = {
			t: m.getBoundingClientRect().top,
			l: m.getBoundingClientRect().left,
			w: m.offsetWidth,
			h: m.offsetHeight,
		};

		let p = {
			w: e.offsetWidth,
			h: e.offsetHeight,
		}

		this.position(t, p, e);

	},

	position(t, p, e) {

		let s = 10;

		let o = { t: 0, l: 0 };

		switch (this.get('side')) {
		case 'n':
			o = { t: t.t - p.h - s, l: t.l + (t.w / 2) - (p.w / 2) }; break;
		case 'ne':
			o = { t: t.t - p.h - s, l: t.l + (t.w / 2) - s - (s / 2) }; break;
		case 'e':
			o = { t: t.t + (t.h / 2) - (p.h / 2), l: t.l + t.w + s + (s / 2) }; break;
		case 'se':
			o = { t: t.t + t.h + s, l: t.l + (t.w / 2) - s - (s / 2) }; break;
		case 's':
			o = { t: t.t + t.h + s, l: t.l + (t.w / 2) - (p.w / 2) }; break;
		case 'sw':
			o = { t: t.t + t.h + s, l: t.l + (t.w / 2) - p.w + s + (s / 2) }; break;
		case 'w':
			o = { t: t.t + (t.h / 2) - (p.h / 2), l: t.l - p.w - s }; break;
		case 'nw':
			o = { t: t.t - p.h - s, l: t.l + (t.w / 2) - p.w + s + (s / 2) }; break;
		default:
			o = { t: t.t - p.h - s, l: t.l + (t.w / 2) - (p.w / 2) }; break;
		}

		e.style.top = `${o.t}px`; e.style.left = `${o.l}px`;

	},

	getTargetEvents() {

		let show = this.get('show').split(' ');

		let hide = this.get('hide').split(' ');

		return { show, hide };

	},

	getTargetElement() {

		let t = this.get('target');

		return t ? document.getElementById(t) : this.element.parentNode;

	},

	initShowOnClick(target) {

		target.addEventListener('click', () => {
			this.open();
		});

	},

	initShowOnHover(target) {

		target.addEventListener('mouseenter', () => {
			this.open();
		});

	},

	initHideOnHover(target) {

		target.addEventListener('mouseleave', () => {
			this.close();
		});

	},

	initHideOnClick() {

		document.addEventListener('mousedown', this.didClickHandler);

	},

	initHideOnEscape() {

		document.addEventListener('keydown', this.didEscapeHandler);

	},

	onClick(e) {

		let i = document.getElementById(this.uniq);

		if (i === null) return;

		if (i === e.target) return;

		if (i.contains(e.target)) return;

		this.close();

	},

	onEscape(e) {

		if (e.which !== 27) return;

		this.close();

	},

});
