import React, { Component } from 'react';
import BarChartComponent from '../../components/BarChart/BarChartComponent'
import { blue2, yellow2, red2 } from "../../colors";
import { Card } from 'react-bootstrap';

export default class BarChartContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      chartData: [10, 5, 20, 36, 12, 45, 68, 25, 10, 12],
      chartLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      label: ""
    }
  }

  fetchData(url, chartLabelsName, chartDataName) {
    fetch(url).then(res => res.json()).then(data => {
      const parsedData = JSON.parse(data);
      const chartLabels = parsedData[chartLabelsName]
      const chartData = parsedData[chartDataName]
      this.setState({ chartLabels: chartLabels, chartData: chartData});
    });
  }

  componentDidMount() {
    const { title, label } = this.props;
    this.setState({ title: title, label: label });
    /*this.getData()
  	window.setInterval(() => {
	    this.getData()
	  }, 10000)*/
  }

  render() {
    const { title, chartData, chartLabels, label } = this.state;
    console.log(chartData)
    return (

      <BarChartComponent data={chartData} labels={chartLabels} label={label} color={blue2} />

    );
  }

}