import React, { useState } from 'react'
import { router, Link } from '@inertiajs/react'

export default function Contatos({ contatos, filters }) {
    const [search, setSearch] = useState(filters?.search || '')

    function handleDelete(id) {
        if (confirm('Tem certeza?')) {
            router.delete(`/contatos/${id}`)
        }
    }

    function handleSearch(e) {
        const value = e.target.value
        setSearch(value)
        
        router.get('/contatos', { search: value }, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    return (
        <div>
            <h1>Lista de Contatos</h1>
            <input 
                type="text" 
                value={search} 
                onChange={handleSearch}
                placeholder="Pesquisar..."
            />
            <Link href="/contatos/create">Novo Contato</Link>
            
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {contatos && contatos.map(contato => (
                        <tr key={contato.id}>
                            <td>{contato.id}</td>
                            <td>{contato.nome}</td>
                            <td>{contato.telefone}</td>
                            <td>{contato.endereco}</td>
                            <td>
                                <button onClick={() => handleDelete(contato.id)}>
                                    Apagar
                                </button>
                            </td>
                            <td>
                                <a href={`/contatos/${contato.id}/edit`}>Editar</a>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
             <a href="/">Voltar</a>

        </div>

    )
}