<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Produto;

class ProdutosController extends Controller
{

        public function index(Request $request)
          {

            $produtos = Produto::query()
                        ->when($request->search, function ($query, $search) {
                            $query->where('descricao', 'like', "%{$search}%")
                                  ->orWhere('codigo', 'like', "%{$search}%");
                        })
                        ->get();

              return Inertia::render('Produtos/Produtos', [
                  'produtos' => $produtos,
                  'filters' => $request->only('search'),
              ]);
              
          }

          public function create()
              {
                  return Inertia::render('Produtos/ProdutoCreate');
              }

          public function store(Request $request)
            {
              $request->validate([
                  'codigo' => 'required|string',
                  'descricao' => 'required|string',
                  'preco' => 'required|numeric',
                  'unidade' => 'required|string',
                ]);
              
                Produto::create($request->all());
                return redirect('/produtos');
              }

          public function edit($id)
            {
                return Inertia::render('Produtos/ProdutoEdit', [
                    'produto' => Produto::findOrFail($id)
                ]);
            }

          public function update(Request $request, $id)
            {
                $request->validate([
                    'codigo' => 'required|string',
                    'descricao' => 'required|string',
                    'preco' => 'required|numeric',
                    'unidade' => 'required|string',
                ]);
                
                Produto::findOrFail($id)->update($request->all());
                return redirect('/produtos');
            }

    
          public function destroy($id)
            {
               Produto::findOrFail($id)->delete();
               return redirect('/produtos');
            }
}
