import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';
import features from '../utils/features';

export default Mixin.create({

	intersection: inject(),

	init() {

		this._super(...arguments);

		this.didEnterViewportHandler = (e => {
			this.didEnterViewport(e);
		}).bind(this);

		this.didLeaveViewportHandler = (e => {
			this.didLeaveViewport(e);
		}).bind(this);

	},

	didEnterViewport() {},

	didLeaveViewport() {},

	didInsertElement() {

		this._super(...arguments);

		if (features.intersectionObserver()) {

			this.get('intersection').observe(
				this.element,
				this.didEnterViewportHandler,
				this.didLeaveViewportHandler,
			);

		} else {

			this.didEnterViewport();

		}

	},

	willDestroyElement() {

		if (features.intersectionObserver()) {

			this.get('intersection').unobserve(
				this.element,
			);

		}

		this._super(...arguments);

	},

});
