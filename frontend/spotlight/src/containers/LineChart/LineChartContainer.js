import React, { Component } from 'react';
import LineChartComponent from '../../components/LineChart/LineChartComponent'
import { managerData, nationalAverageData, yearLabels, managerQuarterData, nationalAverageQuarterData, quarterLabels } from "../../mockData";

export default class LineChartContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      chartData: [],
      chartLabels: [],
      label: ""
    }
  }

  getData() {
    fetch('/data').then(res => res.json()).then(data => {
      this.setState({ chartData: data.data, chartLabels: data.labels })
    }).catch(console.log);
  }

  componentDidMount() {
    const {title, label} = this.props;
    this.setState({ title: title, label: label })
    this.getData()
  	/*window.setInterval(() => {
	    this.getData()
	  }, 10000)*/
  }

  render() {
    const {title, chartData, chartLabels, label } = this.state;
    return (
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{title}</h4>
          </div>
          <div className="card-body">
            <LineChartComponent data={chartData} labels={chartLabels} label={label}/ >
          </div>
        </div>
    );
  }

}