import '../../css/app.css'
import React, { useState, useEffect } from 'react'
import { router, Link } from '@inertiajs/react'

export default function Produtos({ produtos, filters }) {
    const [search, setSearch] = useState(filters?.search || '')

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/produtos', { search }, { 
                preserveState: true,
                replace: true 
            })
        }, 300) // debounce de 300ms

        return () => clearTimeout(timeout)
    }, [search])

    return (
        <div className='container mx-auto p-6'>

            <h1 className='text-3xl font-bold mb-6' >Produtos</h1>
            <div className='flex gap-4 mb-6'>
            <input 
                type="text" 
                placeholder="Pesquisar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-4 py-2 w-64"
            />
            <Link href="/produtos/create" 
             
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >Novo Produto</Link>
            </div>


            
            
            <table className="w-full border-collapse" border="1">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="border p-3 text-left" >Código</th>
                        <th className="border p-3 text-left">Descrição</th>
                        <th className="border p-3 text-left">Preço</th>
                        <th className="border p-3 text-left">Unidade</th>
                        <th className="border p-3 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr className="hover:bg-gray-100" key={produto.id}>
                            <td className="border p-3" >{produto.codigo}</td>
                            <td className="border p-3" >{produto.descricao}</td>
                            <td className="border p-3" >R$ {produto.preco}</td>
                            <td className="border p-3">{produto.unidade}</td>
                            <td className="border p-3 gap-2" >
                                <Link
                                   className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                   href={`/produtos/${produto.id}/edit`}>Editar
                                 </Link>
                                
                               <button onClick={() => handleDelete(produto.id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}