import React, { Component } from 'react';
import RecapComponent from '../../components/Recap/RecapComponent'
import { Dropdown, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';


export default class RecapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        menuTitle: "Last 30 days",
        nbSongs: 0,
        listenedMin: 0,
        mostListenedName: "",
        mostListenedMin: 0
    }
  }

  getData() {
    fetch('/recap').then(res => res.json()).then(data => {
      this.setState({ nbSongs: data.unique_song, listenedMin: data.listened_min, mostListenedName: data.most_listened_name, mostListenedMin: data.most_listened_min})
    }).catch(console.log);
  }

  componentDidMount() {
    this.getData();
  }

  changeValue(e) {
    this.setState({menuTitle: e.currentTarget.textContent});
  }

  render() {
    const {nbSongs, listenedMin, mostListenedName, mostListenedMin} = this.state;
    console.log(nbSongs)
    return (
        <Container fluid>
            <Row mb={4}>
            <Col><h4>Global Statistics</h4></Col>
            <Col xs={6}></Col>
                <Col>
                        <DropdownButton variant="light"  className="mb-2 float-right shadow-sm bg-white rounded" title={this.state.menuTitle}>
                            <DropdownItem><div onClick={this.changeValue.bind(this)}>Last 30 days</div></DropdownItem>
                            <DropdownItem><div onClick={this.changeValue.bind(this)}>Last 6 months</div></DropdownItem>
                            <DropdownItem><div onClick={this.changeValue.bind(this)}>All time</div></DropdownItem>
                        </DropdownButton>
                </Col>
            </Row>
            <RecapComponent nbSongs={nbSongs} listenedMin={listenedMin} mostListenedName={mostListenedName} mostListenedMin={mostListenedMin}/>
        </Container>
    );
  }

}