import React from 'react'
import { useForm } from '@inertiajs/react'

export default function ContatoEdit({ contato }) {
    const { data, setData, put, errors } = useForm({
        nome: contato.nome,
        telefone: contato.telefone,
        endereco: contato.endereco,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/contatos/${contato.id}`)
    }

    return (
        <div>
            <h1>Editar Contato</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={data.nome} 
                        onChange={e => setData('nome', e.target.value)} 
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input 
                        type="text" 
                        value={data.telefone} 
                        onChange={e => setData('telefone', e.target.value)} 
                    />
                </div>
                <div>
                    <label>Endereço:</label>
                    <input 
                        type="text" 
                        value={data.endereco} 
                        onChange={e => setData('endereco', e.target.value)} 
                    />
                </div>
                <button type="submit">Salvar</button>
                <a href="/contatos">Cancelar</a>
            </form>
        </div>
    )
}