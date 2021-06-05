<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Carbon\Carbon;
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

        /**
         * Check for same day data
         */
        $CHECK = Size::where('phone', $request->phone)->whereDate('created_at', date('Y-m-d'))->count();

        // return $TODAY;
        if ($CHECK == 0) {
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
        } else {
            //2 means two times data in one day!
            return 2;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $DATA = Size::where('phone', $request->phone)->get();
        if($DATA->count() > 0){
            return $DATA;
        }else{
            return 0;
        }
    }
}
