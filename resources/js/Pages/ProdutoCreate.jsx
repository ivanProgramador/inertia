import React from 'react'
import { useForm, Link } from '@inertiajs/react'

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
        <div>
            <h1>Novo Produto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Código:</label>
                    <input 
                        type="text" 
                        value={data.codigo} 
                        onChange={e => setData('codigo', e.target.value)} 
                    />
                    {errors.codigo && <span>{errors.codigo}</span>}
                </div>
                <div>
                    <label>Descrição:</label>
                    <input 
                        type="text" 
                        value={data.descricao} 
                        onChange={e => setData('descricao', e.target.value)} 
                    />
                    {errors.descricao && <span>{errors.descricao}</span>}
                </div>
                <div>
                    <label>Preço:</label>
                    <input 
                        type="number" 
                        step="0.01"
                        value={data.preco} 
                        onChange={e => setData('preco', e.target.value)} 
                    />
                    {errors.preco && <span>{errors.preco}</span>}
                </div>
                <div>
                    <label>Unidade:</label>
                    <input 
                        type="text" 
                        value={data.unidade} 
                        onChange={e => setData('unidade', e.target.value)} 
                    />
                    {errors.unidade && <span>{errors.unidade}</span>}
                </div>
                <button type="submit" disabled={processing}>Salvar</button>
            </form>
            <Link href="/produtos">Voltar</Link>
        </div>
    )
}