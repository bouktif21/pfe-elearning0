<?php

namespace App\Http\Controllers;

use App\Models\AnnéeScolaire;
use App\Models\Attribution;
use App\Models\Classe;
use App\Models\level;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttributionController extends Controller
{

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'status' => 'required',
            'formation_id' => 'required|exists:formations,id',
        ]);

        // Create a new Attribution instance
        $attribution = new Attribution;
        $attribution->student_id = $request->input('student_id');
        $attribution->status = $request->input('status');
        $attribution->formation_id = $request->input('formation_id');
        $attribution->save();

        // Return a response
        return response()->json([
            'status'=>200,
            'message'=>'Inscription passée avec succès'
        ]);
     }

     public function updateStatus(Request $request, $id)
     {
         $request->validate([
             'status' => 'required', // Assuming status can only be 0 or 1
         ]);

         $student = Attribution::find($id);

         if (!$student) {
             return response()->json(['status' => 404, 'message' => 'Student not found'], 404);
         }

         // Update the status
         $student->status = $request->input('status');
         $student->save();

         return response()->json(['status' => 200, 'message' => 'Student status updated successfully'], 200);
     }


public function  getInscription($id){
    $formations = Attribution::with([ 'formation' => function ($query) {
        $query->select('id', 'title',);
    }])->where('student_id', $id)->where('status', '1')->get();
        return response()->json([
            'status'=>200,
            'formations'=>$formations
        ]);



}
public function  getInscriptionParId($id){
    $attribution = Attribution::with([ 'student' => function ($query) {
        $query->select('id', 'fisrtname','lastname','email');
    }])->where('formation_id', $id)->get();
        return response()->json([
            'status'=>200,
            'Inscription'=>$attribution
        ]);}

public function update (Request $request , $id ){
    $user = User::where('identifiant_user',$request->input('identifiant'))->first();

    $validator = Validator::make($request->all(),[
        'identifiant' => 'string|required',
        'Classe' => 'integer|required',
      ]);
      if($validator->fails()){
        return response()->json([
           'validator_errors'=>$validator->messages(),
        ]);
   }

   else{
    $Attribution =  Attribution::find($id);
    if(  $Attribution ){
        $Attribution->student_id = $user->id;
        $Attribution->classe_id =  $request->input('Classe');

        $Attribution->update();
        return response()->json([
            'status'=>200,
            'message'=>'Modifier Attribution avec succès'

        ]);

    }
    else {
        return response()->json([
            'status'=>404,
            'message'=>"Attribution n'exciste pas"

        ]);        }

} }
}

