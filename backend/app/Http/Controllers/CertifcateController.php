<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class CertifcateController extends Controller
{
    //
    public function getparEtudiant($id){
        $certificate= Certificate::where('student_id',$id)->get();


        return response()->json([

         'status'=>200,
         'certificate'=>$certificate,

        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'file' => 'required',
            'description' => 'required',
            'id' => 'required',
          ]);

        if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }
       else{
        $certife = new Certificate();
        $certife->description = $request->input('description');
        $certife->student_id = $request->input('id');

            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $fileName = time().'.'.$extension;
            $file->move('uploads/certifes/',$fileName);
            $certife->certificate =$fileName;

        $certife->save();

        return response()->json([
            'status'=>200,
            'message'=>'enregistré avec succès'

        ]);
    }
    }

}
