<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function request($phone)
    {
        /**
         * 
         *  Set content type of page
         * 
         * */
        header('Content-type: application-json');

        /* 
         *
         * Check if user registered before
         * 
         * */
        $Check = Customer::where('phone', $phone)->count();

        /**
         * Create and store code for User
         */
        $STORED['status'] = 0;

        if (!$Check) {
            $STORED['status'] = $this->store($phone);
        } else {
            $STORED['status'] = $this->code($phone);
        }


        /**
         * Return the result in json format
         */
        return json_encode($STORED['status']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($phone)
    {
        $Customer = new Customer;

        $Customer->phone = $phone;
        $Customer->Code = '';
        $Customer->name = '';

        try {

            $Customer->save();

            /**
             * Create new Validation Code for new User
             */
            return $this->code($phone);
        } catch (\Throwable $th) {
            return redirect()->route('home');
        }
    }

    private function code($phone)
    {
        /**
         * Create 4 digit random code
         */
        $digits = 4;
        $THE_CODE = rand(pow(10, $digits - 1), pow(10, $digits) - 1);

        /**
         * Store Code in DataBase
         */
        try {
            Customer::where('phone', $phone)
                ->update(['Code' => $THE_CODE]);

            /**
             * 
             * Send Code with SMS
             * 
             */
            return $this->send_code($phone, $THE_CODE);
        } catch (\Throwable $th) {
            return redirect()->route('home');
        }
    }

    private function send_code($phone, $code)
    {
        //TODO : Send SMS In This function
        return 1;
    }

    /**
     * 
     * Get code from user to vaildate
     * 
     */
    public function validation($phone, $code)
    {
        /**
         * 
         *  Set content type of page
         * 
         * */
        header('Content-type: application-json');

        /* 
         * Check if user registered before
         * */
        $Check = Customer::where('phone', $phone)->get('Code')[0]->Code;

        if ($Check == $code) {
            return json_encode(1);
        } else {
            return json_encode(0);
        }
    }


    /**
     * 
     * Check if customers name exists or not
     * 
     */
    public function checkName($phone)
    {
        /**
         * 
         *  Set content type of page
         * 
         * */
        header('Content-type: application-json');


        $check = Customer::where('phone', $phone)->get('name')[0]->name;

        if ($check != '') {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * 
     * Store new customer name
     * 
     */
    public function storeName($phone, $name)
    {
        /**
         * 
         *  Set content type of page
         * 
         * */
        header('Content-type: application-json');

        try {
            Customer::where('phone', $phone)
                ->update(['name' => $name]);

            return 1;
        } catch (\Throwable $th) {
            return 0;
        }
    }
}
