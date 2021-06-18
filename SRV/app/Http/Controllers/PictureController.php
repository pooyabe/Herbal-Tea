<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    public function upload(Request $req)
    {
        /**
         * 
         *  Set content type of page
         * 
         * */
        header('Content-type: application/json');

        /**
         * Check for period data request
         */

        $CHECK = Picture::where('phone', $req->phone)->count();

        /**
         * If there was just one pic today, so there is no problem! (i think!!!)
         */
        $NUMBER_OF_TODAY_PICS = Picture::where('phone', $req->phone)->where('created_at', '>=', date('Y-m-d') . ' 00:00:00')->count();
        if ($NUMBER_OF_TODAY_PICS == 1) {
            $CHECK = 0;
        }

        if ($CHECK > 0) {
            $TODAY = date('Y-m-d H:m:s');
            $TOMMOROW = date('Y-m-d', strtotime($TODAY . ' +1 days'));

            $GetlastRecordDate = Picture::where('phone', $req->phone)->orderBy('created_at', 'desc')->get('created_at')->take(1);
            $lastRecordDate = $GetlastRecordDate[0]['created_at'];

            $diff = abs(strtotime($TOMMOROW) - strtotime($lastRecordDate));
            $calc_remain = intval(20 - ($diff / 86400));
        } else {
            $calc_remain = 0;
        }

        $OUT['status'] = 0;

        if ($calc_remain <= 0) {

            $req->validate([
                'file' => 'required|image|max:12000'
            ]);

            $fileModel = new Picture;


            if ($req->file()) {
                $fileName = time() . '_' . $req->file->getClientOriginalName();
                $filePath = $req->file->move(public_path('images'), $fileName);

                $fileModel->phone = $req->phone;
                $fileModel->status = 0;
                $fileModel->name = time() . '_' . $req->file->getClientOriginalName();
                $fileModel->file_path = '/public/images/' . $filePath;
                $fileModel->save();

                $out['status'] = 1;
            }
        } else {
            //2 means two times data in one period!
            $OUT['status'] = 2;
            $OUT['remain'] = intval($calc_remain);
        }

        return json_encode($OUT);
    }
}
