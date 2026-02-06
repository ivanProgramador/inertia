import React from 'react'
import { useForm } from '@inertiajs/react'

export default function ContatoCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        telefone: '',
        endereco: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/contatos')
    }

    return (
        <div>
            <h1>Novo Contato</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={data.nome} 
                        onChange={e => setData('nome', e.target.value)} 
                    />
                    {errors.nome && <span>{errors.nome}</span>}
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
                <button type="submit" disabled={processing}>Salvar</button>
            </form>
            <a href="/">Voltar</a>
        </div>
    )
}