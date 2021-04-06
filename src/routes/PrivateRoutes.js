import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { rolesConfig } from '../config/roles';
import * as Routes from './index';
import axios from 'axios';
import Navigation from '../components/Navigation';
import NotFound from '../components/NotFound';

class PrivateRoutes extends Component {
	state = { allowedRoutes: [] };

	componentDidMount() {
	
		const token = JSON.parse(localStorage.getItem('token'));
		//adding headers on all requests to backend for verification
		axios.interceptors.request.use(function (config) {
			config.headers.['Authorization'] = 'Bearer ' +token;
			config.headers.['Accept'] = 'application/json';
			config.headers.['Content-Type'] = 'application/json';

			return config;
		})
		let allowedRoutes=null
							
				let roles = ["admin"];				
				if (roles) {
					roles = [...roles];
					 allowedRoutes = roles.reduce((acc, role) => {
						return [...acc, ...rolesConfig[role].routes];
					}, []);
				} else {
					this.props.history.push('/');
				}
		
		this.setState({ allowedRoutes });

	}

	render() {
		return (
			<Fragment>
				<Navigation
					routes={this.state.allowedRoutes}
					path={this.props.match.path}
				/>
				<Switch>
					{this.state.allowedRoutes.map((route) => (
						<Route
							exact
							key={route.url}
							component={Routes[route.component]}
							path={`${this.props.match.path}${route.url}`}
						/>
					))}
					<Route component={NotFound} />
				</Switch>
			</Fragment>
		);
	}
}

export default PrivateRoutes;
