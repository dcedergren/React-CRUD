import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class EditItem extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {title: '', img: '', text: '', newImage: false};
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount()
	{
		axios.get(`/articles/${this.props.match.params.id}/edit`).then(response => {
			this.setState({ title: response.data.title, img: response.data.img});
			$('#summernote').summernote('code', response.data.text);
		})
		.catch(function(error) {
			console.log(error);
		})	
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
		this.setState({newImage: true});
		this.setState({img: e.target.files[0]});

		var reader = new FileReader();
		var preview = document.querySelector('img');
		var file = e.target.files[0];
		
		reader.addEventListener("load", function() {
			preview.src = reader.result;
		}, false);

		if(file)
		{
			reader.readAsDataURL(file);
		}
	}

	handleSubmit(e)
	{
		e.preventDefault();
		var text = $('#summernote').summernote('code');
		var article = new FormData();
		article.append("title", this.state.title);
		article.append("img", this.state.img);
		article.append("text", text);
		article.append('_method', 'PATCH');

		let uri = '/articles/' + this.props.match.params.id;
		axios.post(uri, article).then((response) => {
			this.context.router.history.push('/display-article');
		});
	}

	render()
	{
		if(!this.state.title)
		{
			return <h1>loading...</h1>;
		}

		return(
			<div>
				<h1>Uppdatera artikel</h1>

				<div className="row">
					<div className="col-md-12"></div>
					<div className="col-md-2">
						<Link to="/display-article" className="btn btn-success">Tillbaka</Link>
					</div>
				</div><br />

				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Titel:</label>
								<input type="text"
						 			className="form-control" 
						 			value={this.state.title}
						 			onChange={this.handleChange1}
						 			required
			 			 		/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Ny bild:</label>
								<input type="file" 
									className="form-control"
									onChange={this.handleChange2}
									accept="image/*"
								/>
							</div>
						</div>
					</div>

					<div className="row image">
						<div className="col-md-8">
							<label>Nuvarande bild:</label><br />
							<img src={this.state.img} height="100" width="150" />
						</div>
					</div><br />

					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<div id="summernote"></div>
							</div>
						</div>
					</div><br />

					<div className="form-group">
						<button className="btn btn-primary">Spara ändringar</button>
					</div>

				</form>
			</div>
		);
	}
}

EditItem.contextTypes = {
	router: PropTypes.object.isRequired
}

export default EditItem;