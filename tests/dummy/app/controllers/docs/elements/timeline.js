import Controller from '@ember/controller';
import vis from 'vis.js';

export default Controller.extend({

	one: vis.moment().subtract(4, 'months').format(),

	two: vis.moment().subtract(3, 'months').format(),

	opts: Object.freeze({
		start: vis.moment().subtract(12, 'months').format(),
		end: vis.moment().add(6, 'week').format(),
		width: '100%',
		height: '100%',
		align: 'left',
		orientation: 'top',
		showCurrentTime: true,
		autoResize: true,
		selectable: false,
		editable: false,
		zoomMin: 3600000,
		zoomMax: 31560000000,
	})

})
