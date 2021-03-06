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
    return view('Front/index');
})->name('home');

/**
 * Customers funtions
 */
Route::prefix('/customer')->name('customer.')->group(function () {

    /**
     * User Registration, validation and login.
     */

    Route::get('login-request/{phone}', [\App\Http\Controllers\CustomerController::class, 'request']);

    Route::get('validate/{phone}/{code}', [\App\Http\Controllers\CustomerController::class, 'validation']);
    
    Route::get('namecheck/{phone}', [\App\Http\Controllers\CustomerController::class, 'checkName']);

    Route::get('store-name/{phone}/{code}', [\App\Http\Controllers\CustomerController::class, 'storeName']);

    /**
     * Customer data management
     */
    Route::prefix('/data')->name('data.')->group(function () {
        Route::get('sizes/{phone}/{shekam}/{kamar}/{bazoo}/{ran}', [\App\Http\Controllers\SizeController::class, 'store']);
        
        Route::get('show-sizes/{phone}', [\App\Http\Controllers\SizeController::class, 'show']);

        Route::post('/upload-file', [\App\Http\Controllers\PictureController::class, 'upload']);
    });
});




/**
 * Admin Panel
 */
Route::prefix('/admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\AdminController::class, 'index'])->name('index');
});
