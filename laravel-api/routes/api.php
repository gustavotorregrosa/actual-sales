<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/uploadfile', 'FileController@store');

Route::get('/cleandatabase', 'MaintenanceController@cleanDataBase');

Route::get('/clients', 'ReportsController@clients');
Route::get('/clientswithbets', 'ReportsController@clientsWithBets');

Route::get('/client/{id}', 'ReportsController@client');
Route::get('/deal/{id}', 'ReportsController@deal');

Route::get('/bets', 'ReportsController@bets');

Route::get('/deals', 'ReportsController@deals');


Route::post('/user/register', 'Auth\RegisterController@registerUser');
Route::post('/user/login', 'Auth\LoginController@loginWithPassword');

