import React, { Component } from 'react';
import LineChartComponent from '../../components/LineChart/LineChartComponent'
import { managerData, nationalAverageData, yearLabels, managerQuarterData, nationalAverageQuarterData, quarterLabels } from "../../mockData";

export default class LineChartContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    }
  }

  componentDidMount() {
  	window.setInterval(() => {
	    fetch('/data').then(res => res.json()).then(data => {
	      	this.setState({ chartData: data })
	    }).catch(console.log);
	}, 1000)
  }

  render() {
    const { chartData } = this.state;
    return (
        <LineChartComponent data={chartData} labels={yearLabels}/ >
    );
  }

}