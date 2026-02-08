<?php

use App\Http\Controllers\ContatosController;
use App\Http\Controllers\ProdutosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/login');
});



// Rotas protegidas por autenticação
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    });

    // Rotas de Produtos
    Route::get('/produtos', [ProdutosController::class, 'index']);
    Route::get('/produtos/create', [ProdutosController::class, 'create']);
    Route::post('/produtos', [ProdutosController::class, 'store']);
    Route::get('/produtos/{id}/edit', [ProdutosController::class, 'edit']);
    Route::put('/produtos/{id}', [ProdutosController::class, 'update']);
    Route::delete('/produtos/{id}', [ProdutosController::class, 'destroy']);
});