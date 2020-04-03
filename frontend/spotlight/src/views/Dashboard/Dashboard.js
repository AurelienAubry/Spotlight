import React, { Component } from 'react';

import LineChartContainer from '../../containers/LineChart/LineChartContainer';
import BarChartContainer from '../../containers/BarChart/BarChartContainer';
import RecapContainer from '../../containers/Recap/RecapContainer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import DropdownItem from 'react-bootstrap/DropdownItem';

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			period: "Last 30 days",
			unit: "minutes"
		}
	}

	changeValue(e) {
		this.setState({ period: e.currentTarget.textContent });
	}

	handleChange(val) {
		this.setState({ unit: val });
	}

	render() {
		return (
			<div>
				<Container>
					<Row mb={4}>
						<Col><h4>Global Statistics</h4></Col>
						<Col xs={4}></Col>
						<Col>
							<DropdownButton variant="custom-btn" className="mb-3 float-right shadow rounded" title={this.state.period}>
								<DropdownItem><div onClick={this.changeValue.bind(this)}>Last 30 days</div></DropdownItem>
								<DropdownItem><div onClick={this.changeValue.bind(this)}>Last 6 months</div></DropdownItem>
								<DropdownItem><div onClick={this.changeValue.bind(this)}>Last 12 months</div></DropdownItem>
							</DropdownButton>
						</Col>
					</Row>
					<RecapContainer />
					<div class="mt-4" />

					<Row>
						<Col>
							<Card className="shadow rounded">
								<Card.Body>
									<h4>Annual listening</h4>
									<LineChartContainer label="minutes" />
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<div class="mt-4" />
					<Row>
						<Col>
							<Card className="shadow rounded">
								<Card.Body>
									<Container fluid className="mb-2">
									<Row className="mb-2">
											<Col>
												<b>How much {this.state.unit} did you listen in the last {this.state.period.toLowerCase()}?</b>
											</Col>
											<Col>
												<div className="float-right ">
													Statistics based on: &nbsp;
													<ToggleButtonGroup type="radio" name="options" defaultValue="minutes" className="shadow rounded" onChange={this.handleChange.bind(this)}>
														<ToggleButton value="tracks" className="custom-btn">Tracks</ToggleButton>
														<ToggleButton value="minutes" className="custom-btn">Minutes</ToggleButton>
													</ToggleButtonGroup>
												</div>
											</Col>
										</Row>
										
									</Container>
									<BarChartContainer label="minutes" />
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<div class="mt-4" />
				</Container>
			</div>
		);
	}
}





