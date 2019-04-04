// BEGIN-SNIPPET docs-demo-elements-chart-bubble.js
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

	bubble: computed(function() {
		return {
			data: {
				labels: ["Red","Blue","Yellow","Green"],
				datasets: [{
					label: "# of Votes",
					data: [
						{ x:13, y:16, r:20 },
						{ x:22, y:7, r:10 },
						{ x:7, y:9, r:5 },
						{ x:8, y:18, r:5 },
					],
					backgroundColor: [
						"rgba(255, 99, 132, 0.75)",
						"rgba(54, 162, 235, 0.75)",
						"rgba(255, 206, 86, 0.75)",
						"rgba(75, 192, 192, 0.75)",
					],
					borderColor: [
						"rgba(255,99,132,1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
					]
				}]
			},
			opts: {
				legend: {
					display: true,
					labels: {
						fontColor: "rgb(120, 120, 120)",
					}
				},
			}
		};
	}),

});
// END-SNIPPET
