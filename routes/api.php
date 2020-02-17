<?php

use Illuminate\Http\Request;

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
   
// });


Route::group([
    
    'middleware' => 'api',  
], function ($router) {
    
    Route::post('/contentful', 'ContentfulController@index');
    Route::post('/getcontent', 'ContentfulController@getContent');
    Route::post('/getEntries', 'ContentfulController@getEntries');
    Route::post('/getEntriesInfo', 'ContentfulController@getEntriesInfo');
});