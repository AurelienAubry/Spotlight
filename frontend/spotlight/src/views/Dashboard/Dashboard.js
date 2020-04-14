import React, { Component } from 'react';

import ChartContainer from '../../containers/ChartContainer';
import RecapContainer from '../../containers/RecapContainer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import DropdownItem from 'react-bootstrap/DropdownItem';
import { Typeahead } from 'react-bootstrap-typeahead';
import LineChartComponent from '../../components/Charts/LineChartComponent';
import HorizontalBarChartComponent from '../../components/Charts/HorizontalBarChartComponent';
import PolarAreaChartComponent from '../../components/Charts/PolarAreaChartComponent';
import ListContainer from '../../containers/ListContainer';
import BarChartComponent from '../../components/Charts/BarChartComponent';

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			periodText: "Last 30 days",
			period: 30,
			unit: "min",
			selectedArtist: "None",
			artistsList: []
		};
		this.recapContainerElement = React.createRef();
		this.dailyListeningGraph = React.createRef();
		this.topArtistList = React.createRef();
		this.artistListeningGraph = React.createRef();
		this.hoursGraph = React.createRef();
	}

	updatePeriod(e) {
		const period = this.getPeriod(e.currentTarget.textContent);
		this.setState({ periodText: e.currentTarget.textContent, period: period });

		const { unit, selectedArtist } = this.state;

		// Update graphs with the new period
		this.recapContainerElement.current.fetchData(period);
		this.dailyListeningGraph.current.fetchData(`/get/daily-listened-${unit}?dayOffset=${period}`, "index", "data");
		this.topArtistList.current.fetchData(`/get/top-artists?dayOffset=${period}&count=10`, "index", "data");
		this.hoursGraph.current.fetchData(`/get/day-hours?dayOffset=${period}`, "index", "data");
		//this.artistListeningGraph.current.fetchData(`/get/artist-${unit}-listened?dayOffset=${period}&artist=${selectedArtist}`, "index", "data");
	}

	updateUnit(unit) {
		this.setState({ unit: unit });
		const { period, selectedArtist } = this.state

		// Update graphs with the new unit
		this.dailyListeningGraph.current.fetchData(`/get/daily-listened-${unit}?dayOffset=${period}`, "index", "data");
		//this.artistListeningGraph.current.fetchData(`/get/artist-${unit}-listened?dayOffset=${period}&artist=${selectedArtist}`, "index", "data");
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

	/*getArtistsList() {
		fetch("/get/artists?dayOffset=365").then(res => res.json()).then(data => {
			this.setState({ artistsList: data.artists, selectedArtist: data.artists[0] });
		});
	}*/

	componentDidMount() {
		const { period, unit, selectedArtist } = this.state
		//this.getArtistsList()

		// Init graphs
		this.recapContainerElement.current.fetchData(period);
		this.dailyListeningGraph.current.fetchData(`/get/daily-listened-min?dayOffset=${period}`, "index", "data");
		this.topArtistList.current.fetchData(`/get/top-artists?dayOffset=${period}&count=10`, "index", "data");
		this.hoursGraph.current.fetchData(`/get/day-hours?dayOffset=${period}`, "index", "data");
		//this.artistListeningGraph.current.fetchData(`/get/artist-${unit}-listened?dayOffset=${period}&artist=${selectedArtist}`, "index", "data");
	}

	render() {
		return (
			<div>
				<Container>
					<Row mb={4}>
						<Col><h4 className="white-title">Spotify Statistics</h4></Col>
						<Col xs={4}></Col>
						<Col>
							<DropdownButton variant="btn btn-custom" className="btn-custom mb-3 float-right  shadow-sm" title={this.state.periodText}>
								<DropdownItem className="btn btn-custom"><div onClick={this.updatePeriod.bind(this)}>Last 30 days</div></DropdownItem>
								<DropdownItem className="btn btn-custom"><div onClick={this.updatePeriod.bind(this)}>Last 6 months</div></DropdownItem>
								<DropdownItem className="btn btn-custom"><div onClick={this.updatePeriod.bind(this)}>Last 12 months</div></DropdownItem>
							</DropdownButton>
						</Col>
					</Row>
					<RecapContainer ref={this.recapContainerElement} period={this.state.period} />
					<div class="mt-4" />
					<Row>
						<Col>
							<Card className="shadow-sm rounded-lg">
								<Card.Body>
									<Container fluid className="mb-2">
										<Row className="mb-2">
											<Col>
												<b>How many {this.state.unit} did you listen in the {this.state.periodText.toLowerCase()}?</b>
												<hr />
											</Col>
											<Col>
												<div className="float-right ">
													Statistics based on: &nbsp;
													<ToggleButtonGroup type="radio" name="options" defaultValue="min" onChange={this.updateUnit.bind(this)}>
														<ToggleButton value="tracks" className="btn-custom border">Tracks</ToggleButton>
														<ToggleButton value="min" className="btn-custom border">Minutes</ToggleButton>
													</ToggleButtonGroup>
												</div>
											</Col>
										</Row>

									</Container>
									<ChartContainer component={BarChartComponent} ref={this.dailyListeningGraph} label={this.state.unit} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<div class="mt-4" />
					<Row >
						<Col>
							<Card className="shadow-sm h-100 rounded-lg">
								<Card.Body>
									<Container fluid className="mb-2">
										<Row>
											<Col>
												<b>Top Artists over the {this.state.periodText.toLowerCase()}</b>
												<hr />
											</Col>
										</Row>
									</Container>
									<ListContainer ref={this.topArtistList} col1Label="Artist" col2Label="min. played" />
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card className="shadow-sm h-100 rounded-lg">
								<Card.Body>
									<Container fluid className="mb-2">
										<Row>
											<Col>
												<b>Listening Hours</b>
												<hr />
											</Col>
										</Row>
									</Container>
									<ChartContainer component={PolarAreaChartComponent} ref={this.hoursGraph} label={this.state.unit} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<div class="mt-4" />
					{/*<Row>
						<Col>
							<Card className="shadow rounded">
								<Card.Body>
									<Container fluid className="mb-2">
										<Row>
											<Col>
												<b>Listening of {this.state.selectedArtist}</b>
											</Col>
											<Typeahead
												onChange={(selected) => {
													this.setState({selectedArtist : selected})
													const {unit, period} = this.state;
													this.artistListeningGraph.current.fetchData(`/get/artist-${unit}-listened?dayOffset=${period}&artist=${selected}`, "index", "data");
												}}
												options={this.state.artistsList}
												placeholder="Choose an artist..."
												/>
										</Row>
									</Container>
									<BarChartContainer ref={this.artistListeningGraph} label={this.state.unit} />
								</Card.Body>
							</Card>
						</Col>
					</Row> */}
				</Container>
			</div>
		);
	}
}





