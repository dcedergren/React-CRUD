import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TableRow from './TableRow';

class DisplayItem extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {articles: ''};
		this.deleteHandler = this.deleteHandler.bind(this);
	}

	componentDidMount()
	{
		axios.get('/articles').then(response => {
			this.setState({articles: response.data });
		})
		.catch(function(error) {
			console.log(error);
		})
	}

	tabRow()
	{
		if(this.state.articles instanceof Array)
		{
			return this.state.articles.map((object, i) => {
				return <TableRow obj = {object} key = {i} deleteHandler = {this.deleteHandler} />;
			})
		}
	}

	deleteHandler(e)
	{
		e.preventDefault();
		let articles = this.state.articles;

		for(var i = 0; i < articles.length; i++)
		{
			if(articles[i].id == e.target.id)
			{
				articles.splice(i, 1);
			}
		}

		let uri = '/articles/' + e.target.id;
		axios.delete(uri);
		this.setState({articles: articles});
	}

	render()
	{
		if(!this.state.articles)
		{
			return <h1>loading...</h1>;
		}

		return(
			<div>
				<h1>Artiklar</h1>

				<div className="row">
					<div className=" col-md-12"></div>
					<div className="col-md-2">
						<Link to="/add-article" className="btn btn-success">Skapa artikel</Link>
					</div>
				</div><br />

				<table className="table table-hover">
					<thead>
						<tr>
							<td><b>ID</b></td>
							<td><b>Titel</b></td>
							<td><b>Bild</b></td>
							<td><b>Text</b></td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{this.tabRow()}
					</tbody>
				</table>
			</div>
		);
	}
}
export default DisplayItem;