import React, { Component } from 'react';
import { blue2} from "../colors";
import LineChartComponent from '../components/Charts/LineChartComponent';

export default class ChartContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      chartData: [],
      chartLabels: [],
      label: "",
      Component: LineChartComponent
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
    const { title, label, component } = this.props;
    this.setState({ title: title, label: label, Component: component });
  }

  render() {
    const { title, chartData, chartLabels, label, Component } = this.state;
    return (

      <Component data={chartData} labels={chartLabels} label={label} color={blue2} />

    );
  }

}