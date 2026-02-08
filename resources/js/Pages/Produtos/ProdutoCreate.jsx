import React from 'react'
import { useForm, Head } from '@inertiajs/react'
import AdminLayout from '../Layouts/AdminLayout/AdminLayout';

export default function ProdutoCreate() {
    const { data, setData, post, processing, errors } = useForm({
        codigo: '',
        descricao: '',
        preco: '',
        unidade: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/produtos')
    }

    return (
        <AdminLayout>
            <Head title="Novo Produto" />
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Código</label>
                        <input 
                            type="text" 
                            value={data.codigo} 
                            onChange={e => setData('codigo', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.codigo && <p className="text-red-500 text-sm mt-1">{errors.codigo}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Descrição</label>
                        <input 
                            type="text" 
                            value={data.descricao} 
                            onChange={e => setData('descricao', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Preço</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={data.preco} 
                            onChange={e => setData('preco', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Unidade</label>
                        <input 
                            type="text" 
                            value={data.unidade} 
                            onChange={e => setData('unidade', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.unidade && <p className="text-red-500 text-sm mt-1">{errors.unidade}</p>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {processing ? 'Salvando...' : 'Salvar'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    )
}