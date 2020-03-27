import React, {Component, createRef} from 'react';
import Chart from "chart.js";

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

		const myChartRef = this.chartRef.current.getContext("2d");
		const {labels, data} = this.props;

	    const {height: graphHeight} = myChartRef.canvas;

	    let gradientLine = myChartRef.createLinearGradient(0, 0, 0, graphHeight);
		gradientLine.addColorStop(0, 'rgba(40,175,250,.25)');
		gradientLine.addColorStop(1, 'rgba(40,175,250,0)');

		this.myChart = new Chart(myChartRef,
		{
			type: "line",
			data: {
				labels: labels,
				datasets: [
					{
						label: "Sales",
						data: data,
						backgroundColor: gradientLine,
						borderColor: "#28AFFA",
		                pointBackgroundColor: "#19283F",
		                pointBorderColor: "#28AFFA",
		                pointHoverBackgroundColor: "#19283F",
		                pointHoverBorderColor: "#28AFFA",
					}
				],
			},
			options: {
				responsive: true,
  				maintainAspectRatio: false,
			}
		});
	}

	componentDidUpdate() {
	  this.myChart.data.labels = this.props.labels;
	  this.myChart.data.datasets[0].data = this.props.data;
	  this.myChart.update();
	}
}