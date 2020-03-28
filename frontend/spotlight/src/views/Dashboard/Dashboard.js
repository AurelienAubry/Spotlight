import React, { Component } from 'react';
import classes from "./Dashboard.module.css";

import NavBar from '../../components/NavBar/NavBar';
import LineChartContainer from '../../containers/LineChart/LineChartContainer';

export default class Dashboard extends Component {

	render() {
		return (
			<div className={classes.container_custom}>
		        <NavBar/>
				<div className="container-fluid">
          			<div className="row">
            			<div className="col-md-12">
							<div className="main chart-wrapper">
								<LineChartContainer title="Annual listening" label="minutes"/>
							</div>
						</div>
					</div>
				</div>
	      	</div>
		);
	}
}





