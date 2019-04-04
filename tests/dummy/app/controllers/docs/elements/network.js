import Controller from '@ember/controller';

export default Controller.extend({

	opts: Object.freeze({
		autoResize: true,
		width: '100%',
		height: '100%',
		interaction: {
			zoomView: false,
		},
		nodes: {
			shape: 'box',
			scaling: {
				min: 10,
				max: 30
			},
			font: {
				size: 12,
				face: 'Helvetica'
			},
		},
		edges: {
			scaling: {
				min: 5,
				max: 15,
			},
			font: {
				size: 10,
				face: 'Helvetica',
			},
		},
		physics: {
			stabilization: true,
			solver: 'repulsion',
			barnesHut: {
				damping: 0.5,
				avoidOverlap: 1,
			}
		},
	})

})
