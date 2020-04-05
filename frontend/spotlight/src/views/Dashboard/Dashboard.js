import React, { Component } from 'react';

import LineChartContainer from '../../containers/LineChart/LineChartContainer';
import BarChartContainer from '../../containers/BarChart/BarChartContainer';
import HorizontalBarChartContainer from '../../containers/BarChart/HorizontalBarChartContainer';
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
			periodText: "Last 30 days",
			period: 30,
			unit: "minutes"
		};
		this.recapContainerElement = React.createRef();
		this.dailyListeningGraph = React.createRef();
		this.topArtistGraph = React.createRef();
	}

	updatePeriod(e) {
		const period = this.getPeriod(e.currentTarget.textContent)
		this.setState({ periodText: e.currentTarget.textContent, period: period});
		this.recapContainerElement.current.fetchData(period);
		if (this.state.unit == "minutes") {
			this.dailyListeningGraph.current.fetchData(`/get/daily-listened-min?dayOffset=${period}`, "index", "data");
		} else {
			this.dailyListeningGraph.current.fetchData(`/get/daily-listened-tracks?dayOffset=${period}`, "index", "data");
		}
		this.topArtistGraph.current.fetchData(`/get/top-artists?dayOffset=${period}&count=10`, "index", "data");
	}

	updateUnit(val) {
		this.setState({ unit: val });
		const {period} = this.state
		if (val == "minutes") {
			this.dailyListeningGraph.current.fetchData(`/get/daily-listened-min?dayOffset=${period}`, "index", "data");
		} else {
			this.dailyListeningGraph.current.fetchData(`/get/daily-listened-tracks?dayOffset=${period}`, "index", "data");
		}
		
	}

	getPeriod(text) {
		switch (text) {
			case "Last 30 days":
				return 30
				break;
			
			case "Last 6 months":
				return 182
				break;
			
			case "Last 12 months":
				return 365
				break;
			default:
				return 0
				break;
		}
	}

	componentDidMount() {
		const {period} = this.state
		this.recapContainerElement.current.fetchData(period);
		this.dailyListeningGraph.current.fetchData(`/get/daily-listened-min?dayOffset=${period}`, "index", "data");
		this.topArtistGraph.current.fetchData(`/get/top-artists?dayOffset=${period}&count=10`, "index", "data");
	}

	render() {
		return (
			<div>
				<Container>
					<Row mb={4}>
						<Col><h4>Global Statistics</h4></Col>
						<Col xs={4}></Col>
						<Col>
							<DropdownButton variant="custom-btn" className="mb-3 float-right shadow rounded" title={this.state.periodText}>
								<DropdownItem><div onClick={this.updatePeriod.bind(this)}>Last 30 days</div></DropdownItem>
								<DropdownItem><div onClick={this.updatePeriod.bind(this)}>Last 6 months</div></DropdownItem>
								<DropdownItem><div onClick={this.updatePeriod.bind(this)}>Last 12 months</div></DropdownItem>
							</DropdownButton>
						</Col>
					</Row>
					<RecapContainer ref={this.recapContainerElement} period={this.state.period}/>
					<div class="mt-4" />
					<Row>
						<Col>
							<Card className="shadow rounded">
								<Card.Body>
									<Container fluid className="mb-2">
									<Row className="mb-2">
											<Col>
												<b>How much {this.state.unit} did you listen in the {this.state.periodText.toLowerCase()}?</b>
											</Col>
											<Col>
												<div className="float-right ">
													Statistics based on: &nbsp;
													<ToggleButtonGroup type="radio" name="options" defaultValue="minutes" className="shadow rounded" onChange={this.updateUnit.bind(this)}>
														<ToggleButton value="tracks" className="custom-btn">Tracks</ToggleButton>
														<ToggleButton value="minutes" className="custom-btn">Minutes</ToggleButton>
													</ToggleButtonGroup>
												</div>
											</Col>
										</Row>
										
									</Container>
									<BarChartContainer ref={this.dailyListeningGraph} label={this.state.unit} />
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
										<Row>
											<Col>
												<b>Top Artists over the {this.state.periodText.toLowerCase()}</b>
											</Col>
										</Row>
									</Container>
									<HorizontalBarChartContainer ref={this.topArtistGraph} label={this.state.unit} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}





