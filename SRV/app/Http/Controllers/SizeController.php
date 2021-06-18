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
         * Check for period data request
         */

        $CHECK = Size::where('phone', $request->phone)->count();
        if ($CHECK > 0){
            $TODAY = date('Y-m-d H:m:s');
            $TOMMOROW = date('Y-m-d', strtotime($TODAY . ' +1 days'));
    
            $GetlastRecordDate = Size::where('phone', $request->phone)->orderBy('created_at', 'desc')->get('created_at')->take(1);
            $lastRecordDate = $GetlastRecordDate[0]['created_at'];
    
            $diff = abs(strtotime($TOMMOROW) - strtotime($lastRecordDate));
            $calc_remain = intval(7 - ($diff / 86400));
        }else{
            $calc_remain = 0;
        }



        $OUT['status'] = 0;

        if ($calc_remain <= 0) {
            $NEW_DATA = new Size;

            // SET DATA RECEIVED
            $NEW_DATA->phone = $request->phone;
            $NEW_DATA->Shekam = $request->shekam;
            $NEW_DATA->Bazoo = $request->bazoo;
            $NEW_DATA->Kamar = $request->kamar;
            $NEW_DATA->Ran = $request->ran;
            $NEW_DATA->status = 0;


            try {
                $NEW_DATA->save();
                $OUT['status'] = 1;
                return json_encode($OUT);
            } catch (\Throwable $th) {
                // return json_encode($OUT);
            }
        } else {
            //2 means two times data in one period!
             $OUT['status'] = 2;
             $OUT['remain'] = intval($calc_remain);
        }
        return json_encode($OUT);
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

        if ($DATA->count() > 0) {
            $Shekam = [];
            $Kamar = [];
            $Bazoo = [];
            $Ran = [];
            $i = 0;

            foreach ($DATA as $value) {
                $Shekam[$i] = $value['Shekam'];
                $Kamar[$i] = $value['Kamar'];
                $Bazoo[$i] = $value['Bazoo'];
                $Ran[$i] = $value['Ran'];


                $i++;
            }

            $OUT = [
                'Shekam' => $Shekam,
                'Kamar' => $Kamar,
                'Ran' => $Ran,
                'Bazoo' => $Bazoo
            ];

            return json_encode($OUT);
        } else {
            return 0;
        }
    }
}
