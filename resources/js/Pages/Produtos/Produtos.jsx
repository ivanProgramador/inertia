import React, { useState, useEffect } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { router, Link, Head } from '@inertiajs/react'
import AdminLayout from '../Layouts/AdminLayout/AdminLayout.jsx'

export default function Produtos({ produtos, filters }) {
    
    const [search, setSearch] = useState(filters?.search || '')
    const [showModal, setShowModal] = useState(false)
    const [produtoParaExcluir, setProdutoParaExcluir] = useState(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/produtos', { search }, { 
                preserveState: true,
                replace: true 
            })
        }, 300)

        return () => clearTimeout(timeout)
    }, [search])

    function confirmarExclusao(produto) {
        setProdutoParaExcluir(produto)
        setShowModal(true)
    }

    function handleDelete() {
        router.delete(`/produtos/${produtoParaExcluir.id}`, {
            onSuccess: () => setShowModal(false),
        })
    }

    return (
        <AdminLayout>
            <Head title="Produtos" />
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">Produtos</h1>
                
                <div className="flex gap-4 mb-6">
                    <input 
                        type="text" 
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Link 
                        href="/produtos/create" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Novo Produto
                    </Link>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border p-3 text-left">Código</th>
                            <th className="border p-3 text-left">Descrição</th>
                            <th className="border p-3 text-left">Preço</th>
                            <th className="border p-3 text-left">Unidade</th>
                            <th className="border p-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(produto => (
                            <tr className="hover:bg-gray-100" key={produto.id}>
                                <td className="border p-3">{produto.codigo}</td>
                                <td className="border p-3">{produto.descricao}</td>
                                <td className="border p-3">R$ {produto.preco}</td>
                                <td className="border p-3">{produto.unidade}</td>
                                <td className="border p-3">
                                    <Link
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                        href={`/produtos/${produto.id}/edit`}
                                    >
                                        <i className="fas fa-edit text-xl"></i>
                                    </Link>
                                    <button 
                                        onClick={() => confirmarExclusao(produto)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        <i className="fas fa-trash text-xl"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Confirmação */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
                        <p>Tem certeza que deseja excluir <strong>{produtoParaExcluir?.descricao}</strong>?</p>
                        <div className="mt-4 flex gap-2 justify-end">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}