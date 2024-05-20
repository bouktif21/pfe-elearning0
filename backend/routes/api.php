<?php

use App\Http\Controllers\AbsanceController;
use App\Http\Controllers\AnnéeScolaireController;
use App\Http\Controllers\AttributionController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\CourController;
use App\Http\Controllers\EmploiDuTempsClasseController;
use App\Http\Controllers\EmploiDuTempsEnseignantController;
use App\Http\Controllers\EnseignantRéunionController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\ExerciceController;
use App\Http\Controllers\InscriptionEnseignantController;
use App\Http\Controllers\LevelsController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PublicCourController;
use App\Http\Controllers\QuestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CertifcateController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\QuizController;
use Laravel\Sanctum\Sanctum;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);
Route::get('homeTeams',[UserController::class, 'index']);

Route::middleware(['auth:sanctum','isAdmin'])->group( function(){
    Route::post('adminlogout',[AuthController::class, 'logout']);
    Route::get('CheckingAuth', function(){
        return response()->json(['message'=>'You are in', 'status'=>200], 200);

    });
    Route::put('update_user/{id}',[UserController::class, 'updateUser']);
    Route::put('admin_updatePassword/{id}',[UserController::class, 'updatePassword']);
    Route::get('admin_get_user/{id}',[UserController::class, 'getuser']);
    Route::get('user',[UserController::class, 'index']);
    Route::post('/AdminUpdate_user/{id}',[UserController::class, 'Update']);

    Route::delete('/delete_user/{id}',[UserController::class, 'destroy']);
    Route::get('get_user/{id}',[UserController::class,'getuser']);

});


Route::middleware(['auth:sanctum','isEnseignant'])->group( function(){

    Route::post('enseignantlogout',[AuthController::class, 'logout']);
    Route::get('EnseignantCheckingAuth', function(){
        return response()->json(['message'=>'You are in', 'status'=>200], 200);

    });
    Route::get('Enseignant_get_data/{id}',[UserController::class, 'getuser']);
    Route::post('/Update_profile/{id}',[UserController::class, 'Update']);
    Route::put('Enseignant_updatePassword/{id}',[UserController::class, 'updatePassword']);

    Route::get('/Enseignant_formations/{id}', [FormationController::class, 'getWitheEnseignant']);
    Route::post('/Add_formations', [FormationController::class, 'store']);
    Route::delete('/delete_formation/{id}', [FormationController::class, 'destroy']);

    Route::get('/quizzes',  [QuizController::class, 'index']);
    Route::get('/getQuiszz/{EnseignantId}',  [QuizController::class, 'getQuiszz']);
    Route::get('/show_quizzes/{id}',  [QuizController::class, 'show']);
    Route::post('/quizzes',  [QuizController::class, 'store']);
    Route::put('/Update_quizzes/{id}', [QuizController::class, 'update']);
    Route::delete('delete_quizzes/{id}', [QuizController::class, 'destroy']);

    Route::post('/Add_question', [QuestionController::class, 'store']);
    Route::get('/get_question/{id}', [QuestionController::class, 'get']);
    Route::delete('delete_question/{id}', [QuestionController::class, 'destroy']);
    Route::put('/Update_question/{id}', [QuestionController::class, 'update']);
    Route::get('/get_question_par_id/{id}', [QuestionController::class, 'getQuestion']);

    Route::post('/AjouteCours', [CourController::class, 'store']);
    Route::put('/UpdateCours', [CourController::class, 'update']);
    Route::get('/get_cour_par_Formation_id/{id}', [CourController::class, 'getCourParFormationId']);

    Route::get('inscription_student/{id}',[AttributionController::class, 'getInscriptionParId']);
    Route::put('/update_student_status/{id}', [AttributionController::class, 'updateStatus']);
    Route::post('/add_certificate', [CertifcateController::class, 'store']);


});



Route::middleware(['auth:sanctum','isEtudiant'])->group( function(){

    Route::post('logout',[AuthController::class, 'logout']);
    Route::get('eleveCheckingAuth', function(){
        return response()->json(['message'=>'You are in', 'status'=>200], 200);

    });

    Route::get('Etudiant_get_data/{id}',[UserController::class, 'getuser']);
    Route::post('Etudiant_Update_profile/{id}',[UserController::class, 'Update']);
    Route::put('Etudiant_updatePassword/{id}',[UserController::class, 'updatePassword']);
    Route::get('Etudiant_get_formation',[FormationController::class, 'index']);
    Route::get('Etudiant_get_certificate/{id}',[CertifcateController::class, 'getparEtudiant']);



    Route::post('Etudiant_iscription',[AttributionController::class, 'store']);
    Route::get('Etudiant_get_inscription_formation/{id}',[AttributionController::class, 'getInscription']);
    Route::get('Etudiant_Cours/{id}',[CourController::class, 'getCourParFormationId']);
    Route::get('Etudiant_qcm/{id}',[QuizController::class, 'getParFormationId']);
    Route::get('get_question_parQcmId/{id}',[QuestionController::class, 'get']);


});
