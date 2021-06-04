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
}
