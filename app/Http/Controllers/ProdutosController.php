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

           //no moelo de retorno inertia, ao inves de retonar uma view blade 
           //ou porecessarr uma reuisição de blade, o inertia renderiza um componente do react, 
           //passando os dados como props, a impressão que dá e que a rota nunca fecha              

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
                  'codigo' => 'required|integer',
                  'descricao' => 'required|string',
                  'preco' => 'required|numeric',
                  'unidade' => 'required|string',
                ]);
              
                Produto::create($request->all());
                return redirect()->back();
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
                    'codigo' => 'required|integer',
                    'descricao' => 'required|string',
                    'preco' => 'required|numeric',
                    'unidade' => 'required|string',
                ]);
                
                Produto::findOrFail($id)->update($request->all());
                return redirect()->back();
            }

    
          public function destroy($id)
            {
               Produto::findOrFail($id)->delete();
               return redirect('/produtos');
            }
}
