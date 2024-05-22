<?php

namespace App\Http\Controllers;

use App\Models\Reunion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReunionController extends Controller
{



    public function getReunionParFormationId($id)
    {
      $Reuions = Reunion::with([
          'formation' => function ($query) {
              $query->select('id','title');
          }

      ])->where('FormationId',$id)->get();
        return response()->json([
            'status'=>200,
            'Reuions'=>$Reuions

        ]);
      }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'url' => 'required',
            'FormationId' => 'required',
            'date' => 'required',

          ]);

        if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }
       else{
        $reunion = new Reunion();
        $reunion->url = $request->input('url');
        $reunion->FormationId = $request->input('FormationId');
        $reunion->date = $request->input('date');
        $reunion->save();

        return response()->json([
            'status'=>200,
            'message'=>'Réunion enregistré avec succès'

        ]);
    }
    }


    public function  destroy($id){
        $Réunion =  Reunion::find($id);
        if($Réunion){
            $Réunion->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Réunion supprimé avec succès'
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>' Aucun Réunion trouvé'
            ]);
        }


    }

    public function getParId($id)
    {

        return Reunion::findOrFail($id);
    }


    public function update (Request $request , $id ){
        $validator = Validator::make($request->all(),[
            'url' => 'required',
            'FormationId' => 'required',
            'date' => 'required',


          ]);
          if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }

       else{
        $reunion =  Reunion::find($id);
        if(  $reunion ){
            $reunion->url = $request->input('url');
            $reunion->FormationId = $request->input('FormationId');
            $reunion->date = $request->input('date');
            $reunion->update();

            return response()->json([
                'status'=>200,
                'message'=>'Réunion Modifier  avec succès'

            ]);

        }
        else {
            return response()->json([
                'status'=>404,
                'message'=>"Réunion n'exciste pas"

            ]);        }

    } }
}
