
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

import Master from './components/Master';
import CreateArticle from './components/CreateArticle';
import DisplayArticle from './components/DisplayArticle';
import EditArticle from './components/EditArticle';
import CreateUser from './components/CreateUser';

render(
	<BrowserRouter>
		<Master path="/">
			<Route path="/add-article" component={CreateArticle} />
			<Route path="/display-article" component={DisplayArticle} />
			<Route path="/edit/:id" component={EditArticle} />
			<Route path="/add-user" component={CreateUser} />
		</Master>	 
	</BrowserRouter>,
	document.getElementById('admin')
);
