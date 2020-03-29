import React, {Component, createRef} from 'react';
import Chart from "chart.js";
import 'chartjs-plugin-zoom'

//import classes from "./LineChartComponent.module.css";

export default class LineChartComponent extends Component {

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

		const {labels, data, label, color} = this.props;
		const myChartRef = this.chartRef.current.getContext("2d");
		this.myChart = new Chart(myChartRef,
		{
			type: "line",
			data: {
				labels: labels,
				datasets: [
					{
						label: label,
						data: data,
						pointHoverBorderWidth: 2,
      					pointRadius: 1.5,
						pointBorderWidth: 1,
						borderColor: color,
		                pointBackgroundColor: color,
		                pointBorderColor: color,
		                pointHoverBackgroundColor: color,
		                pointHoverBorderColor: color,
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
				scales: {
					xAxes: [{
					  type: 'time'
					}]
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
		const {labels, data, label, color} = this.props;
		
		const myChartRef = this.chartRef.current.getContext("2d");
		const {height: graphHeight} = myChartRef.canvas;

		let gradientLine = myChartRef.createLinearGradient(0, 0, 0, graphHeight);
		
		const rgb = [color.substring(1,3), color.substring(3,5), color.substring(5,7)];
		const color1 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.75)`;
		const color2 = `rgba(${rgb.map(c => (parseInt(c, 16))).join()}, 0.0)`;

		gradientLine.addColorStop(0, color1);
		gradientLine.addColorStop(1, color2);
		
		this.myChart.data.datasets[0].backgroundColor = gradientLine;
		this.myChart.data.labels = labels;
		this.myChart.data.datasets[0].data = data;
		this.myChart.data.datasets[0].label = label;
		
		this.myChart.update();
	}
}