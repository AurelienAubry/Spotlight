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
							backgroundColor: color,
							borderColor: "#FFFFFF",
							borderWidth: 2,
							hoverBackgroundColor: color,
							hoverBorderColor: "#FFFFFF",
							hoverBorderWidth: 2,
						},
						{
							data: [],
							borderColor: "#FFFFFF",
							borderWidth: 2,
							hoverBorderColor: "#FFFFFF",
							hoverBorderWidth: 2,
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
							myChartRef.fillStyle = "#000";
							
							var maxRadius = 0;
		
								var meta = chartInstance.controller.getDatasetMeta(0);
								meta.data.forEach(function (bar) {
									if (parseFloat(bar._model.outerRadius) > maxRadius){
										maxRadius = parseFloat(bar._model.outerRadius);
									}
								});
							

					
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
		const { height: graphHeight } = myChartRef.canvas;

		let gradientLine = myChartRef.createLinearGradient(0, 0, 0, graphHeight);

		const rgb = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)];
		const color1 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.25)`;
		const color2 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.0)`;

		gradientLine.addColorStop(0, color1);
		gradientLine.addColorStop(1, color2);


		this.myChart.data.labels = labels;
		this.myChart.data.datasets[0].data = data;
		this.myChart.data.datasets[0].label = label;

		var background_data = new Array(data.length).fill(1);
		this.myChart.data.datasets[1].data = background_data;

		this.myChart.update();
	}
}