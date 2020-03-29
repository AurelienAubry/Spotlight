import React, { Component } from 'react';
import LineChartComponent from '../../components/LineChart/LineChartComponent'
import { blue2, yellow2, red2 } from "../../colors";
import { Card } from 'react-bootstrap';

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
        <Card>
          <Card.Body>
            <h4>{title}</h4>
            <LineChartComponent data={chartData} labels={chartLabels} label={label} color={blue2}/>
            </Card.Body>
        </Card>
    );
  }

}