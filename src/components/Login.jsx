import React, { useState } from 'react';
import history from '../util/history';
import axios from 'axios';
import { Button, Form, Container, Jumbotron, Alert } from 'react-bootstrap';
import apiRoot from '../ApiPath';


function Login(props) {

	const [validated, setValidated] = useState(true);
	const [userName, setuserName] = useState('spicebluetest2@gmail.com');
	const [password, setpassword] = useState('12345678');
	const [error, seterror] = useState('');


	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;


		if (form.checkValidity() === false) {
			event.preventDefault();
			setValidated(true)
			console.log('asdas')
		}
		else {
			if (validated) {
		

				loginUser();
			}
		}
	}

	const loginUser = () => {

		const params = {
			email:userName,
			password :password
		}
		axios.post(`${apiRoot.url}/login`, params,{
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			}
		  }	)
			.then(response => response.data)
			.then(
				result => {
					localStorage.setItem('token', JSON.stringify(result.results.token));
					history.push('/app/task');
				},
				err => {
					seterror('Please enter vaild username and password')

				}
			);
			axios.get(`${apiRoot.url}/user`,{
				headers: {
				'Authorization': 'Bearer ' +JSON.parse(localStorage.getItem('token')),
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				}
			  }	)
				.then(response => response.data)
				.then(
					result => {
					console.log(result)
					},
					err => {
						seterror('Please enter vaild username and password')
	
					}
				);
	}


	return (
		<div>
			<Container bsPrefaix="nc" >

				<Jumbotron className="mt-5">
					<h4 className="d-flex justify-content-center">  LOGIN</h4>
					<Form noValidate validated={validated} onSubmit={handleSubmit} >
						<Form.Group controlId="formBasicEmail">
							<Form.Label>User Name</Form.Label>
							<Form.Control type="text" required disabled placeholder="User Name" name="userName" value={userName} 
							/>

						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" required disabled placeholder="Password" name="password" value={password}  />
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							className="mb-4"
						>
							Login
				</Button>
						

					</Form>
				
				</Jumbotron>
			</Container>
		</div>
	)

}

export default Login;