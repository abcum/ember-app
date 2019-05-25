// BEGIN-SNIPPET docs-demo-elements-chart-circle.js
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

	circle: computed(function() {
		return {
			data: {
				labels: ["Red","Blue","Yellow","Green","Purple","Orange"],
				datasets: [{
					label: "# of Votes",
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						"rgba(255, 99, 132, 0.75)",
						"rgba(54, 162, 235, 0.75)",
						"rgba(255, 206, 86, 0.75)",
						"rgba(75, 192, 192, 0.75)",
						"rgba(153, 102, 255, 0.75)",
						"rgba(255, 159, 64, 0.75)",
					],
					borderColor: [
						"rgba(255,99,132,1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
				}]
			},
			opts: {
				legend: {
					display: true,
					position: 'right',
					labels: {
						fontColor: "rgb(120, 120, 120)",
					}
				},
			}
		};
	}),

});
// END-SNIPPET
