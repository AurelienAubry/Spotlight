import React, { Component, createRef } from 'react';
import Chart from "chart.js";
import 'chartjs-plugin-zoom'

export default class HorizontalBarChartComponent extends Component {

	constructor(props) {
		super(props);
		this.chartRef = createRef();
	}

	render() {
		return (
			<div>
				<canvas id="myChart" ref={this.chartRef} />
			</div>
		);
	}

	componentDidMount() {

		const { labels, data, label, color } = this.props;
		const myChartRef = this.chartRef.current.getContext("2d");
		this.myChart = new Chart(myChartRef,
			{
				type: "horizontalBar",
				data: {
					labels: labels,
					datasets: [
						{
							label: label,
							data: data,
							borderWidth: 1.5,
							hoverBorderWidth: 2.75,
							borderColor: color,
							hoverBorderColor: color,
						}
					],
				},

				options: {
					responsive: true,
					maintainAspectRatio: false,
					aspectRatio: 1,
					legend: {
						display: false
					},
					pan: {
						enabled: true,
						mode: 'x'
					},
					zoom: {
						enabled: true,
						mode: 'x'
					}

				}
			});
	}

	componentDidUpdate() {
		const { data, labels, label, color } = this.props;

		const myChartRef = this.chartRef.current.getContext("2d");
		const { height: graphHeight } = myChartRef.canvas;

		// Update chart's data
		this.myChart.data.labels = labels;
		this.myChart.data.datasets[0].data = data;
		this.myChart.data.datasets[0].label = label;

		// Generate Color of the graph (gradient)
		let gradientLine = myChartRef.createLinearGradient(0, 0, 0, graphHeight);
		const rgb = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)];
		const color1 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.75)`;
		const color2 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.50)`;
		gradientLine.addColorStop(0, color1);
		gradientLine.addColorStop(1, color2);
		
		this.myChart.data.datasets[0].backgroundColor = gradientLine;
		
		// Reset view and update the graph
		this.myChart.resetZoom()
		this.myChart.update();
	}
}