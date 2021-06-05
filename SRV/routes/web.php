<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
})->name('home');

Route::prefix('/customer')->name('customer.')->group(function(){
    Route::get('login-request/{phone}', [\App\Http\Controllers\CustomerController::class, 'request']);

    Route::get('validate/{phone}/{code}', [\App\Http\Controllers\CustomerController::class, 'validation']);
});