<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /**
         * Set header type to json
         */
        header('Content-type: application-json');

        $NEW_DATA = new Size;

        // SET DATA RECEIVED
        $NEW_DATA->phone = $request->phone;
        $NEW_DATA->Shekam = $request->shekam;
        $NEW_DATA->Bazoo = $request->bazoo;
        $NEW_DATA->Kamar = $request->kamar;
        $NEW_DATA->Ran = $request->ran;

        try {
            $NEW_DATA->save();
            return 1;
        } catch (\Throwable $th) {
            return 0;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function show(Size $size)
    {
        //
    }

}
