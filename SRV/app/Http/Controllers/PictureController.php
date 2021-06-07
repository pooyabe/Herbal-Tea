<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('file-upload');
    }

    public function upload(Request $req)
    {
        /**
         * 
         *  Set content type of page
         * 
         * */
        header('Content-type: application/json');

        $req->validate([
            'file' => 'required|image|max:12000'
        ]);

        $fileModel = new Picture;
        $out['status'] = 0;

        if ($req->file()) {
            $fileName = time() . '_' . $req->file->getClientOriginalName();
            $filePath = $req->file->move(public_path('images'), $fileName);

            $fileModel->phone = '09184004491';
            $fileModel->name = time() . '_' . $req->file->getClientOriginalName();
            $fileModel->file_path = '/storage/' . $filePath;
            $fileModel->save();

            $out['status'] = 1;
        }

        return json_encode($out);
    }

    public function csrf()
    {
        header("Content-type: application/json");

        return json_encode(csrf_token());
    }
}
