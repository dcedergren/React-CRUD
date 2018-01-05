import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {summernote} from 'summernote';
import 'summernote/dist/summernote.css';
import PropTypes from 'prop-types';

class CreateItem extends Component 
{
	constructor(props)
	{
		super(props);
		this.state = {title: '', img: '', text: ''};

		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount()
	{
		$('#summernote').summernote();
	}

	componentWillUnmount()
	{
		$('#summernote').summernote('destroy');
	}

	handleChange1(e)
	{
		this.setState({ title: e.target.value});
	}

	handleChange2(e)
	{
		this.setState({img: e.target.files[0]});
	}

	handleSubmit(e)
	{
		e.preventDefault();
		var text = $('#summernote').summernote('code');
			
		var article = new FormData();
		article.append("title", this.state.title);
		article.append("img", this.state.img);
		article.append("text", text);

		let uri = '/articles';
		axios.post(uri, article).then((response) => {
			this.context.router.history.push('/display-article');
		});		
	}

	render()
	{
		return (
			<div>
				<h1>Skapa artikel</h1>

				<div className="row">
					<div className="col-md-12"></div>
					<div className="col-md-2">
						<Link to="/display-article" className="btn btn-success">Visa artiklar</Link>
					</div>
				</div><br />

				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Titel:</label>
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
								<label>Bild:</label>
								<input type="file" 
									className="form-control" 
									required 
									accept="image/*" 
									onChange={this.handleChange2} 
								/>
							</div>
						</div>
					</div><br />
					<div className="row">
						<div className="col-md-8">
							<div id="summernote"></div>
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

CreateItem.contextTypes = {
	router: PropTypes.object.isRequired
}

export default CreateItem;