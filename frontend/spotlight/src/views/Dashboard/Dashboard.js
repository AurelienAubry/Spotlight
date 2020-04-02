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
			menuTitle: "Last 30 days",
			value: 1
		}
	}

	changeValue(e) {
		this.setState({ menuTitle: e.currentTarget.textContent });
	}

	handleChange(val) {
		this.setState({ value: val });
	}

	render() {
		return (
			<div>
				<Container>
					<Row mb={4}>
						<Col><h4>Global Statistics</h4></Col>
						<Col xs={4}></Col>
						<Col>
							<DropdownButton variant="custom-btn" className="mb-3 float-right shadow rounded" title={this.state.menuTitle}>
								<DropdownItem><div onClick={this.changeValue.bind(this)}>Last 30 days</div></DropdownItem>
								<DropdownItem><div onClick={this.changeValue.bind(this)}>Last 6 months</div></DropdownItem>
								<DropdownItem><div onClick={this.changeValue.bind(this)}>All time</div></DropdownItem>
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
									<Container fluid>
										<Row>
											<Col>
												<h4>title</h4>
											</Col>
											<Col>
												<ToggleButtonGroup type="radio" name="options" defaultValue={1} className="mb-3 float-right shadow rounded">
													<ToggleButton value={1} className="custom-btn">Option 1</ToggleButton>
													<ToggleButton value={2} className="custom-btn">Option 2</ToggleButton>
												</ToggleButtonGroup>
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





