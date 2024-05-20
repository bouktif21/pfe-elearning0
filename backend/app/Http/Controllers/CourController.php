<?php

namespace App\Http\Controllers;

use App\Models\AnnéeScolaire;
use App\Models\Cour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class CourController extends Controller
{
    //

    public function getCourParFormationId ($id ){

        $Cour = Cour::where('formation_id',$id)->get();
        return response()->json([
            'status'=>200,
            'Cour'=> $Cour

        ]);
        }
        public function getCourParId ($id ){

        $Cour = Cour::where('id',$id)->get();
        return response()->json([
            'status'=>200,
            'Cour'=> $Cour

        ]);
        }

    public function store (Request $request ){
        $validator = Validator::make($request->all(),[
            'Name'=>'required',
            'description'=>'required|max:191',
            'FormationId' => 'required',
            'file' => 'required|mimes:pdf',
          ]);

          if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }

       else{
        $Cour = new Cour;
        $Cour->cour = $request->input('Name');
        $Cour->description = $request->input('description');
        $Cour->Formation_id = $request->input('FormationId');

        if ($request->hasFile('file')){

            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $fileName = time().'.'.$extension;
            $file->move('uploads/Cours/',$fileName);
            $Cour->file =$fileName;
        }else {
            return response()->json([
                'status' => 400,
                'message' => 'A file is required.'
            ]);
        }
        $Cour->save();
        return response()->json([
            'status'=>200,
            'message'=>'Ajouter Cour avec succès'

        ]);
    }
    }

    public function update (Request $request , $id ){
        $validator = Validator::make($request->all(),[
            'Name'=>'required',
            'description'=>'required|max:191',
            'FormationId' => 'required',
            'file' => 'required'
          ]);

          if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }


       else{
        $Cour =  Cour::find($id);
        if(  $Cour ){
            $Cour->cour = $request->input('Name');
            $Cour->description = $request->input('description');
            $Cour->Formation_id = $request->input('FormationId');
            if ($request->hasFile('file')){

                $file = $request->file('file');
                $destinationPath = 'D:\pfeyousef\frontend\src\pdf';
                $fileName = $file->getClientOriginalName();
                $file->move($destinationPath, $fileName);
                $Cour->file =$fileName;
            }else {
                return response()->json([
                    'status' => 400,
                    'message' => 'A file is required.'
                ]);
            }

        }
        else {
            return response()->json([
                'status'=>404,
                'message'=>"Cour n'exciste pas"

            ]);        }

    } }



    public function  destroy($id){
        $Cour =  Cour::find($id);

        if($Cour)
        {
            if($Cour->file)
                {
                $path ='uploads/cours/'.$Cour->file;
                if(File::exists ($path))
                {
                    File::delete('public/uploads/cours/'.$Cour->file);
                }
                $Cour->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Cour supprimé avec succès'
                ]);
                }

        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>' Aucun Cour trouvé'
            ]);
        }}
}
