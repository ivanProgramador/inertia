<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Inertia\Inertia;

use Illuminate\Http\Request;

class ContatosController extends Controller
{
    public function index(Request $request)
     {
         $contatos = Contact::query()
         ->when($request->search, function ($query, $search) {
               $query->where('nome', 'like', "%{$search}%");
         })
         ->get();

         return Inertia::render('Contatos', [
         'contatos' => $contatos,
         'filters' => $request->only('search'),
         ]);
     }

    public function destroy($id)
     {
        Contact::findOrFail($id)->delete();
        return redirect()->route('contatos');
     }

    public function edit($id)
     {
        return Inertia::render('ContatoEdit', [
           'contato' => Contact::findOrFail($id)
        ]);
     }

    public function update(Request $request, $id)
     {
        Contact::findOrFail($id)->update($request->all());
        return redirect('/contatos');
     }

    public function create()
     {
         return Inertia::render('ContatoCreate');
     }

    public function store(Request $request)
    {
       Contact::create($request->all());
       return redirect('/contatos');
    }



     
}
