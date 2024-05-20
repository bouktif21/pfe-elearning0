<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'question' => 'required',
            'QcmId' => 'required',
            'answerOptions' => 'required',
            'correctAnswer' => 'required',

          ]);

        if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }
       else{
        $Question = new Question();
        $Question->question = $request->input('question');
        $Question->Qcm_id = $request->input('QcmId');
        $Question->answer_options = $request->input('answerOptions');
        $Question->correct_answer = $request->input('correctAnswer');
        $Question->save();

        return response()->json([
            'status'=>200,
            'message'=>'enregistré avec succès'

        ]);
    }
    }


    public function get($id)
    {
      $questions = Question::with([
          'Quiz' => function ($query) {
              $query->select('id','title');
          }

      ])->where('Qcm_id',$id)->get();
        return response()->json([
            'status'=>200,
            'questions'=>$questions

        ]);
      }
      public function getQuestion($id)
      {
        $question = Question::find($id);

          return response()->json([
              'status'=>200,
              'question'=>$question

          ]);
        }


      public function  destroy($id){
        $Question =  Question::find($id);
        if($Question){
            $Question->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Question supprimé avec succès'
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
            'question' => 'required',
            'QcmId' => 'required',
            'answerOptions' => 'required',
            'correctAnswer' => 'required',

          ]);
          if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }

       else{
        $question =  Question::find($id);
        if(  $question ){
            $question->question = $request->input('question');
            $question->Qcm_id = $request->input('QcmId');
            $question->answer_options = $request->input('answerOptions');
            $question->correct_answer = $request->input('correctAnswer');

            $question->update();
            return response()->json([
                'status'=>200,
                'message'=>'Question Modifier  avec succès'

            ]);

        }
        else {
            return response()->json([
                'status'=>404,
                'message'=>"utilisateur n'exciste pas"

            ]);        }

    } }


}
