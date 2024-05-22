<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormationController extends Controller
{
    //
    public function index()
    {
        $formations = Formation::with([
            'enseignant' => function ($query) {
                $query->select('id','fisrtname','lastname','email','image');
            }

        ])->get();
        return response()->json([
            'status'=>200,
            'formations' => $formations,

        ]);
    }
    public function getWitheEnseignant($id)
    {
        $formations = Formation::where('idEnseignant',$id)->get();
        return response()->json([
            'status'=>200,
            'formations' => $formations,

        ]);    }

    public function getparid($id)
    {
        $formations = Formation::Find($id);
        return response()->json([
            'status'=>200,
            'formations' => $formations,

        ]);    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'description' => 'required',
            'duree' => 'required',
            'price' => 'required',
            'enseignantId' => 'required',
            'file'=>'required',
          ]);

        if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }
       else{
           $formation  = new Formation;
           $formation->title =  $request->input('name');
           $formation->description =  $request->input('description');
           $formation->length =  $request->input('duree');
           $formation->price =  $request->input('price');
           $formation->idEnseignant =  $request->input('enseignantId');
           if ($request->hasFile('file')){

            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $fileName = time().'.'.$extension;
            $file->move('uploads/videos/',$fileName);
            $formation->file =$fileName;
            }else {
            return response()->json([
                'status' => 400,
                'message' => 'A file is required.'
            ]);
        }
           $formation->save();

           return response()->json([
               'status'=>200,
               'formation' => $formation,
               'message'=>'enregistré avec succès'

           ]);
       }

    }
    public function update(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'description' => 'required',
            'duree' => 'required',
            'price' => 'required',
            'enseignantId' => 'required',

          ]);

        if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }
       else{
        $formation  = Formation::find($id);
           if($formation){
            $formation->title =  $request->input('name');
            $formation->description =  $request->input('description');
            $formation->length =  $request->input('duree');
            $formation->price =  $request->input('price');
            $formation->idEnseignant =  $request->input('enseignantId');
            $formation->update();
            return response()->json([
                'status'=>200,
                'formation' => $formation,
                'message'=>'formation modifer avec succès'

            ]);

           } else {
            return response()->json([
                'status'=>404,
                'message'=>"Formation n'exciste pas"

            ]);        }



       }

    }
    public function destroy($id){
        $formation = Formation::find($id);
        if($formation){
            $formation->delete();
            return response()->json([
                'status'=>200,
                'message'=>'formation supprimé avec succès'
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>' Aucun formation trouvé'
            ]);
    }}
}
