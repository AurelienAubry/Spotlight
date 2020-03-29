import React, { Component } from 'react';
import classes from "./Dashboard.module.css";

import NavBar from '../../components/NavBar/NavBar';
import LineChartContainer from '../../containers/LineChart/LineChartContainer';
import RecapContainer from '../../containers/Recap/RecapContainer';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default class Dashboard extends Component {

	render() {
		return (
			<div>
		        
				<RecapContainer/>
				<div class="mt-3"/>
				<Container fluid>
					<Row>
						<Col>
							<Card>
							<LineChartContainer title="Annual listening" label="minutes"/>
							</Card>
						</Col>
					</Row>
				</Container>
	      	</div>
		);
	}
}





