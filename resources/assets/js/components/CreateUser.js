import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CreateUser extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {name: '', email: '', password: '', password_confirmation: ''};

		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleChange3 = this.handleChange3.bind(this);
		this.handleChange4 = this.handleChange4.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange1(e)
	{
		this.setState({name: e.target.value});
	}

	handleChange2(e)
	{
		this.setState({email: e.target.value});
	}

	handleChange3(e)
	{
		this.setState({password: e.target.value});
	}

	handleChange4(e)
	{
		this.setState({password_confirmation: e.target.value});
	}

	handleSubmit(e)
	{	
		e.preventDefault();

		var user = new FormData();
		user.append("name", this.state.name);
		user.append("email", this.state.email);
		user.append("password", this.state.password);
		user.append("password_confirmation", this.state.password_confirmation);
		
		let uri = '/register';
		axios.post(uri, user)
			.then((response) => {
				this.context.router.history.push('/');
			})
			.catch((error) => {
				alert("Error:\n" + error.response.data.errors.email + "\n" + error.response.data.errors.password);
			});
	}

	render()
	{
		return(
			<div>

				<h1>Skapa användare</h1>

				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Namn:</label>
								<input type="text" 
									className="form-control" 
									required  
									onChange={this.handleChange1} 
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>E-mail:</label>
								<input type="text" 
									className="form-control" 
									required 
									onChange={this.handleChange2} 
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Lösenord:</label>
								<input type="password" 
									className="form-control" 
									required  
									onChange={this.handleChange3} 
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Upprepa lösenord:</label>
								<input type="password" 
									className="form-control" 
									required  
									onChange={this.handleChange4} 
								/>
							</div>
						</div>
					</div><br />
					
					<div className="form-group">
						<button className="btn btn-primary">Spara</button>
					</div>
				</form>

			</div>
		);
	}
}
CreateUser.contextTypes = {
	router: PropTypes.object.isRequired
}

export default CreateUser;