import React, { Component } from 'react';
import ListComponent from '../components/List/ListComponent';

export default class ListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      listLabels: [],
      col1Label: "",
      col2Label: ""
    }
  }

  fetchData(url, chartLabelsName, chartDataName) {
    fetch(url).then(res => res.json()).then(data => {
      const parsedData = JSON.parse(data);
      const listLabels = parsedData[chartLabelsName]
      const listData = parsedData[chartDataName]
      this.setState({ listLabels: listLabels, listData: listData });
    });
  }

  componentDidMount() {
    const { col1Label, col2Label } = this.props;
    this.setState({ col1Label: col1Label, col2Label: col2Label });
  }

  render() {
    const { listData, listLabels, col1Label, col2Label } = this.state;
    return (
      <ListComponent listData={listData} listLabels={listLabels} col1Label={col1Label} col2Label={col2Label} />
    );
  }

}