import React, { Component } from 'react';
import RecapComponent from '../../components/Recap/RecapComponent'

export default class RecapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nbSongs: 0,
      listenedMin: 0,
      mostListenedName: "",
      mostListenedMin: 0
    }
  }

  getData() {
    fetch('/recap').then(res => res.json()).then(data => {
      this.setState({ nbSongs: data.unique_song, listenedMin: data.listened_min, mostListenedName: data.most_listened_name, mostListenedMin: data.most_listened_min })
    }).catch(console.log);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { nbSongs, listenedMin, mostListenedName, mostListenedMin } = this.state;
    console.log(nbSongs)
    return (
      <RecapComponent nbSongs={nbSongs} listenedMin={listenedMin} mostListenedName={mostListenedName} mostListenedMin={mostListenedMin} />

    );
  }

}