<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::all();
        return response()->json([
            'status'=>200,
            'quizzes'=>$quizzes

        ]);
      }
      public function getQuiszz($EnseignantId)
      {
        $quizzes = Quiz::with([
            'formation' => function ($query) {
                $query->select('id','title');
            }

        ])->where('enseignant_id',$EnseignantId)->get();
          return response()->json([
              'status'=>200,
              'quizzes'=>$quizzes

          ]);
        }

        public function getParFormationId($id)
        {
          $quizzes = Quiz::with([
              'formation' => function ($query) {
                  $query->select('id','title');
              }

          ])->where('formation_id',$id)->get();
            return response()->json([
                'status'=>200,
                'qcm'=>$quizzes

            ]);
          }
    // Show - Retrieve a single quiz by ID
    public function show($id)
    {
        $quiz = Quiz::findOrFail($id);

        return response()->json([
            'status'=>200,
            'message'=>'enregistré avec succès'

        ]);    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'FormationId' => 'required',
            'name' => 'required',
            'dateExpiration' => 'required',
            'enseignant_id' => 'required',

          ]);

        if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }
       else{
        $quiz = new Quiz();
        $quiz->title = $request->input('name');
        $quiz->enseignant_id = $request->input('enseignant_id');
        $quiz->formation_id = $request->input('FormationId');
        $quiz->expirationDate = $request->input('dateExpiration');
        $quiz->save();

        return response()->json([
            'status'=>200,
            'message'=>'enregistré avec succès'

        ]);
    }
    }

    public function  destroy($id){
        $Quiz =  Quiz::find($id);
        if($Quiz){
            $Quiz->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Quiz supprimé avec succès'
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>' Aucun Quiz trouvé'
            ]);
        }


    }

    public function update (Request $request , $id ){
        $validator = Validator::make($request->all(),[
            'FormationId' => 'required',
            'name' => 'required',
            'dateExpiration' => 'required',
            'enseignant_id' => 'required',



          ]);
          if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }

       else{
        $Quiz =  Quiz::find($id);
        if(  $Quiz ){
            $Quiz->title = $request->input('name');
            $Quiz->enseignant_id = $request->input('enseignant_id');
            $Quiz->formation_id = $request->input('FormationId');
            $Quiz->expirationDate = $request->input('dateExpiration');

            $Quiz->update();
            return response()->json([
                'status'=>200,
                'message'=>'Profile Modifier  avec succès'

            ]);

        }
        else {
            return response()->json([
                'status'=>404,
                'message'=>"utilisateur n'exciste pas"

            ]);        }

    } }
}
