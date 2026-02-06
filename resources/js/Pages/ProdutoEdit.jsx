import React from 'react'
import { useForm, Link } from '@inertiajs/react'

export default function ProdutoEdit({ produto }) {
    const { data, setData, put, processing, errors } = useForm({
        codigo: produto.codigo,
        descricao: produto.descricao,
        preco: produto.preco,
        unidade: produto.unidade,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/produtos/${produto.id}`)
    }

    return (
        <div>
            <h1>Editar Produto</h1>
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