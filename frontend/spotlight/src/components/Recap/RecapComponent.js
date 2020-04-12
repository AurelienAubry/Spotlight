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
                    <Card className="shadow-sm rounded-lg">
                        <Card.Body>
                            <center>
                                <MusicNoteList className="mb-4" size={30} color={blue2} />
                                <h4 className="font-weight-bold"> {nbSongs} </h4>
                                <p> Total Tracks </p>
                            </center>
                        </Card.Body>

                    </Card>
                </Col>
                <Col>
                    <Card className="shadow-sm rounded-lg">
                        <Card.Body>
                            <center>
                                <Clock className="mb-4" size={30} color={yellow2} />
                                <h4 className="font-weight-bold"> {nbMinutes} </h4>
                                <p> Total Minutes </p>
                            </center>
                        </Card.Body>

                    </Card>
                </Col>
                <Col>
                    <Card className="shadow-sm rounded-lg">
                        <Card.Body>
                            <center>
                                <ClockHistory className="mb-4" size={30} color={red2} />
                                <h4 className="font-weight-bold"> {avgMinutes} </h4>
                                <p> Minutes Average </p>
                            </center>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        );
    }

}