import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../util/history';

class Navigation extends Component {
	handleLogout = () => {
		localStorage.removeItem('token');
		history.push('/');
	};

	render() {
		return (
			<Navbar bg="secondary" variant="light">
				<Navbar.Brand>
					<div  style={{ color: '#fff', textDecoration:'none' }}>
						Spice Blue
					</div>
				</Navbar.Brand>
				<Nav className="mr-auto">
					{this.props.routes.map((route) => (
						<Link
							key={route.url}
							className="nav-link"
							to={`${this.props.path}${route.url}`}
							style={{ color: '#fff', textDecoration:'none' }}
						>
							Home
						</Link>
					))}
				</Nav>
				<Button onClick={this.handleLogout}>Logout</Button>
			</Navbar>
		);
	}
}
export default Navigation;
