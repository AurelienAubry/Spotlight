import React, { Component, createRef } from 'react';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { MusicNoteList, Clock, ClockHistory } from 'react-bootstrap-icons';

import { blue2, yellow2, red2 } from "../../colors";

export default class RecapComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { nbSongs, nbMinutes, avgMinutes } = this.props;
        return (
            <Row mb={4}>
                <Col>
                    <Card className="gradient-1 shadow-sm rounded-lg">
                        <Card.Body>
                            <center>
                                <b> Total Tracks </b>
                                <h4 className="font-weight-bold"> {nbSongs} </h4>
                            </center>
                        </Card.Body>

                    </Card>
                </Col>
                <Col>
                    <Card className="gradient-2 shadow-sm rounded-lg">
                        <Card.Body>
                            <center>
                                <b> Total Minutes </b>
                                <h4 className="font-weight-bold"> {nbMinutes} </h4>
                            </center>
                        </Card.Body>

                    </Card>
                </Col>
                <Col>
                    <Card className="gradient-3 shadow-sm rounded-lg">
                        <Card.Body>
                            <center>
                                <b> Minutes Average </b>
                                <h4 className="font-weight-bold"> {avgMinutes} </h4>

                            </center>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        );
    }

}