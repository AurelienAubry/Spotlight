import React, { Component } from 'react';
import RecapComponent from '../../components/Recap/RecapComponent'

export default class RecapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nbSongs: 0,
      nbMinutes: 0,
      avgMinutes: 0
    }
  }

  fetchData(period) {
    fetch(`/get/tracks-listened?dayOffset=${period}`).then(res => res.json()).then(data => {
      this.setState({ nbSongs: data.tracks_listened})
    });

    fetch(`/get/min-listened?dayOffset=${period}`).then(res => res.json()).then(data => {
      this.setState({ nbMinutes: data.min_listened})
    });

    fetch(`/get/avg-min-listened?dayOffset=${period}`).then(res => res.json()).then(data => {
      this.setState({ avgMinutes: data.avg_min_listened})
    });
  }

  componentDidMount() {
    const {period} = this.props;
    this.fetchData(period);
  }

  render() {
    const { nbSongs, nbMinutes, avgMinutes} = this.state;
    return (
      <RecapComponent nbSongs={nbSongs} nbMinutes={nbMinutes} avgMinutes={avgMinutes}/>

    );
  }

}