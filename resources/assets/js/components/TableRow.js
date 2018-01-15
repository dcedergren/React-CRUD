import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableRow extends Component
{
	constructor(props)
	{
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e)
	{	
		e.preventDefault();
		let uri = `/articles/${this.props.obj.id}`;
		axios.delete(uri);
		this.context.router.push('/display-article');
	}

	render()
	{
		return(
			<tr>
				<td>
					{this.props.obj.id}
				</td>
				<td>
					{this.props.obj.title}
				</td>
				<td>
					{this.props.obj.updated_at}
				</td>
				<td>
					<Link to={"edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
				</td>
				<td>
					<button id={this.props.obj.id} className="btn btn-danger" onClick = {this.props.deleteHandler}>Delete</button>
				</td>
			</tr>
		);
	}
}
export default TableRow;