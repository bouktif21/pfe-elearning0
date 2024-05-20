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

    public function store(Request $request)
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
           $formation  = new Formation;
           $formation->title =  $request->input('name');
           $formation->description =  $request->input('description');
           $formation->length =  $request->input('duree');
           $formation->price =  $request->input('price');
           $formation->idEnseignant =  $request->input('enseignantId');

           $formation->save();

           return response()->json([
               'status'=>200,
               'formation' => $formation,
               'message'=>'enregistré avec succès'

           ]);
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
