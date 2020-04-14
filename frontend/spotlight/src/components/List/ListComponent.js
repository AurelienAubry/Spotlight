import React, { Component, createRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default class ListComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { listData, listLabels, col1Label, col2Label } = this.props;
        console.log(listData)
        return (
            <Container>
                <Row mb={4}>
                    <Col xs={8}><b>{col1Label}</b></Col>
                    <Col xs={4}><b class="float-right">{col2Label}</b></Col>
                </Row>
                {listLabels.map((item, i) => (
                    <Row key={i} mb={4}>
                        <Col xs={8}><b>{i + 1}. {item}</b></Col>
                        <Col xs={4}><div class="float-right">{listData[i]}</div></Col>
                    </Row>
                ))}
            </Container>
        );
    }

}