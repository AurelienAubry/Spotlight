import React, { Component, createRef } from 'react';
import Chart from "chart.js";
import 'chartjs-plugin-zoom'

export default class PolarAreaChartComponent extends Component {

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
				type: "polarArea",
				data: {
					labels: labels,
					datasets: [
						{
							label: label,
							data: data,
							borderColor: color,
							borderWidth: 1,
							hoverBorderColor: color,
							hoverBorderWidth: 2
						},
						{
							data: [],
							borderColor: 'rgba(200, 200, 200, 0.05)',
							borderWidth: 1,
							hoverBorderColor: 'rgba(200, 200, 200, 0.05)',
							hoverBorderWidth: 1,
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
					tooltips: {
						enabled: false,
					},
					hover: {
						animationDuration: 0
					},
					scale: {
						gridLines: {
							display: false
						},
						ticks: {
							min: 0,
							max: 1.3,
							display: false
						}
					},
					animation: {
						duration: 1,
						onComplete: function () {
							var chartInstance = this.chart;
							
							myChartRef.font = "15px Arial";
							myChartRef.textAlign = 'right';
							myChartRef.textBaseline = 'bottom';
							myChartRef.fillStyle = "#fff";

							// Find the maximum radius of the polar chart
							var maxRadius = 0;
							
							var meta = chartInstance.controller.getDatasetMeta(0);
							meta.data.forEach(function (bar) {
								if (parseFloat(bar._model.outerRadius) > maxRadius) {
									maxRadius = parseFloat(bar._model.outerRadius);
								}
							});

							// Display labels all around the chart
							var meta = chartInstance.controller.getDatasetMeta(0);
							meta.data.forEach(function (bar) {
								var myangl = ((bar._model.startAngle) + (bar._model.endAngle)) / 2;
								var xpoint = (maxRadius + 15) * (Math.cos(myangl)) + (bar._model.x);
								var ypoint = (maxRadius + 15) * (Math.sin(myangl)) + (bar._model.y) + 10;
								myChartRef.fillText(bar._model.label, xpoint, ypoint);
							});
						}
					}
				}
			});
	}

	componentDidUpdate() {
		const { labels, data, label, color } = this.props;

		const myChartRef = this.chartRef.current.getContext("2d");
		const { height: graphHeight, width: graphWidth } = myChartRef.canvas;

		// Update chart's data
		this.myChart.data.labels = labels;
		this.myChart.data.datasets[0].data = data;
		this.myChart.data.datasets[0].label = label;

		// Generate Color of the graph (gradient)
		let gradientRadial = myChartRef.createRadialGradient(graphWidth / 2, graphHeight / 2, 0, graphWidth / 2, graphHeight / 2, graphWidth / 4);
		const rgb = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)];
		const color1 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.75)`;
		const color2 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.0)`;
		gradientRadial.addColorStop(0, color1);
		gradientRadial.addColorStop(1, color2);

		this.myChart.data.datasets[0].backgroundColor = gradientRadial
		this.myChart.data.datasets[0].hoverBackgroundColor = gradientRadial
		
		// Background data
		var background_data = new Array(data.length).fill(1);
		this.myChart.data.datasets[1].data = background_data;

		// Update the graph
		this.myChart.update();
	}
}