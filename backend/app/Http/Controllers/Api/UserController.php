<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attribution;
use App\Models\InscriptionEnseignant;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function index(){
        $enseignant= User::where('role','Enseignant')->get();
        $etudiant= User::where('role','Etudiant')->get();
        $admin= User::where('role','Admin')->get();

        return response()->json([
         'status'=>200,
         'enseignant'=>$enseignant,
         'etudiant'=>$etudiant,
         'admin'=>$admin,


        ]);
    }
    public function getuser($id){
        $user =  User::find($id);

        return response()->json([
         'status'=>200,
         'user'=>$user,

        ]);
    }


    public function  destroy($id){
        $user =  User::find($id);
        if($user){
            $user->delete();
            return response()->json([
                'status'=>200,
                'message'=>'user supprimé avec succès'
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>' Aucun user trouvé'
            ]);
        }


    }

    public function update (Request $request , $id ){
        $validator = Validator::make($request->all(),[
            'fisrtname' => 'string|required',
            'lastname' => 'string|required',
            'email' => 'string|required',
            'phone' => 'string|required',
            'role' => 'string|required',



          ]);
          if($validator->fails()){
            return response()->json([
               'validator_errors'=>$validator->messages(),
            ]);
       }

       else{
        $user =  user::find($id);
        if(  $user ){
            $user->fisrtname = $request->input('fisrtname');
            $user->lastname = $request->input('lastname');
            $user->phone = $request->input('phone');
            $user->email = $request->input('email');
            $user->role =  $request->input('role');

            if ($request->hasFile('file')){
                $path = $user->image;
                if(File::exists($path)){
                    File::delete($path);
                }
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = time().'.'.$extension;
                $file->move('uploads/profile/',$fileName);
                $user->image =$fileName;
             }

            $user->update();
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
    public function updatePassword(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'newPassword' => 'required|string|min:8', // Add any additional validation rules here
        ]);

        // Find the user by ID
        $user = User::findOrFail($id);

        // Hash the new password
        $hashedPassword = Hash::make($request->newPassword);

        // Update the user's password
        $user->password = $hashedPassword;
        $user->save();

        // Return a success response
        return response()->json(['status' => 200, 'message' => 'Password updated successfully']);
    }


}
