<?php

use App\Http\Controllers\ContatosController;
use App\Http\Controllers\ProdutosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

//rotas de ação para os contatos 
Route::get('/contatos/create', [ContatosController::class, 'create']);

Route::post('/contatos', [ContatosController::class, 'store']);

Route::get('/contatos',[ContatosController::class,'index'])->name('contatos');

Route::delete('/contatos/{id}', [ContatosController::class, 'destroy']);

Route::get('/contatos/{id}/edit', [ContatosController::class, 'edit']);

Route::put('/contatos/{id}', [ContatosController::class, 'update']);

//rotas de acaão para os produtos

Route::get('/produtos', [ProdutosController::class, 'index']);

Route::delete('/produtos/{id}', [ProdutosController::class, 'destroy']);

Route::get('/produtos/create', [ProdutosController::class, 'create']);

Route::post('/produtos', [ProdutosController::class, 'store']);

Route::get('/produtos/{id}/edit', [ProdutosController::class, 'edit']);

Route::put('/produtos/{id}', [ProdutosController::class, 'update']);

 


