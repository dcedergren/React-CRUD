<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
})->middleware('auth');

Route::get('/add-article', function () {
    return view('index');
})->middleware('auth');

Route::get('/display-article', function () {
    return view('index');
})->middleware('auth');

Route::get('/edit/{id}', function () {
    return view('index');
})->middleware('auth');

Route::resource('articles', 'ArticleController');

// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
Route::post('register', 'Auth\RegisterController@register');
Route::get('/add-user', function () {
    return view('index');
})->middleware('auth');

