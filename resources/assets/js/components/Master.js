import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router-dom';

class Master extends Component
{
	constructor(props)
	{
		super(props);
		this.logOut = this.logOut.bind(this);
	}

	logOut(e)
	{
		e.preventDefault();
		document.getElementById('logout-form').submit();
	}

	render() 
	{
        return (
        	<div className="container">
        		<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<Link className="navbar-brand" to="/">Admin</Link>
						</div>
						<ul className="nav navbar-nav">
							<li><Link to="/add-article">Skapa artikel</Link></li>
							<li><Link to="/display-article">Visa artiklar</Link></li>
							<li><Link to="/add-user">Skapa användare</Link></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li><Link to="/logout"  onClick={this.logOut}>Logga ut</Link></li>
						</ul>
					</div>
				</nav>

				<div>
					{this.props.children}
				</div>
			</div>
        );
    }
}
export default Master;