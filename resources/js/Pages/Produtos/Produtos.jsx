import React, { useState, useEffect } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { router, Link, Head } from '@inertiajs/react'
import AdminLayout from '../Layouts/AdminLayout/AdminLayout.jsx'

export default function Produtos({ produtos, filters }) {
    
        /*
        apra usar a useState eu tenho que tribuir a ela um array 
        com 2 variáveis
        
        1 - receb o nome da variavel que eu quero usar
        2 - recebe o nome da funcção reponsavel por definir o valor dela
        
            const [search, setSearch] = useState(filters?.search || '')

        basicamente essa função verifica se existe um valor dentro da input 
        search e joga esse valor pra dentro do filter se ele existir significa que alguém
        está digitando se sim o filter recebe uma valor e manda c onsulta para o controller
        que retorna o reusltado com base noque foi enviado e preenche a tabela
        como se trata de uma buscas em tempo real eu coloquei essa função pra rodar 
        toda vez que o valor do texto desse input mudar.
        
        "onChange={e => setSearch(e.target.value)}"

        

        entaão eu coloco essa função no meu componente  

            <input 
            type="text" 
            placeholder="Pesquisar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        


        */



    const [search, setSearch] = useState(filters?.search || '')

            /*
            controlando modais basicamente o processo eo mesmo porém ao inves de receber 
            caracteres a função sowModal recebe um booleam 
            
            sendo verdadeiro ->true o modal aparece  
            sendo falso (valor padrão) -> ele fica oculto
            
            */

    const [showModal, setShowModal] = useState(false)

            /*
            No caso da função novo produto receber somente um booleam 
            o um caaratere não é suficiente para controlar os dados do produto que eu quero criar
            então ela preccisa de uma objeto com as informações do produto para controlar os dados do produto que 
            eu quero criar como não existe api aqui é como se eu estivesse dentro da rota de criação 
            então a o "router.post()" 
            é a função que eu uso para enviar os dados para o controller e criar um novo produto

            e dentro do "router.post()"
            eu passo a rota que eu quero enviar os dados, 
            os dados do produto e as opções de configuração
            como por exemplo o "onSuccess" que é a função que eu quero executar quando a requisição 
            for bem sucedida e o "onError" que é a função que eu quero executar quando a requisição não der certo 

            a função onsuccess 
            faz 2 coisas se a requisição der certo ela fecha o modal de criação e limpa os campos do formulário 
            para que eu possa criar um novo produto sem precisar limpar os campos manualmente


                router.post('/produtos', dados, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateModal(false)
                    setNovoProduto({ codigo: '', descricao: '', preco: '', unidade: '' })
                },
                onError: (errors) => {
                    console.log('Erros:', errors)
                },
            })
            
            
            */
     const [novoProduto, setNovoProduto] = useState({
           codigo: '',
           descricao: '',
           preco: '',
           unidade: '',
     })



   



    const [produtoParaExcluir, setProdutoParaExcluir] = useState(null)


    const [showEditModal, setShowEditModal] = useState(false)

    const [produtoParaEditar, setProdutoParaEditar] = useState(null)

    const [showCreateModal, setShowCreateModal] = useState(false)

   

       function handleCreate() {
            const dados = {
                ...novoProduto,
                preco: String(novoProduto.preco).replace(',', '.')  // <- Converte pra passar na validação
            }
    
            router.post('/produtos', dados, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateModal(false)
                    setNovoProduto({ codigo: '', descricao: '', preco: '', unidade: '' })
                },
                onError: (errors) => {
                    console.log('Erros:', errors)
                },
          })
         }


        function abrirEdicao(produto) {
            //aqui eu uso o operador de spread pra não mexer no registro original en quando
            //eu estiver digitando, dessa forma eu so mexo nele na hora de gravar 
                     setProdutoParaEditar({...produto})
                     setShowEditModal(true)
        }

        function handleUpdate() {
        const dados = {
            ...produtoParaEditar,
            preco: String(produtoParaEditar.preco).replace(',', '.')
        }
    
        router.put(`/produtos/${produtoParaEditar.id}`, dados, {
            preserveState: true,
            preserveScroll: true,
            only: ['produtos'],
            onSuccess: () => setShowEditModal(false),
        })
        }

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
                        <button 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Novo Produto
                        </button>
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
                                        
                                        <button onClick={() => abrirEdicao(produto)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        
                                        <button 
                                            onClick={() => confirmarExclusao(produto)}
                                            className="bg-white-500 text-black px-3 py-1 rounded"
                                        >
                                            <i className="fas fa-trash fa-xs"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>




           

            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
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


          {showEditModal && produtoParaEditar && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Editar Produto</h2>
                        
                        <input 
                            type="number"
                            value={produtoParaEditar.codigo}
                            onChange={e => setProdutoParaEditar({...produtoParaEditar, codigo: e.target.value})}
                            placeholder="Código"
                            className="border rounded px-4 py-2 w-full mb-2"
                        />
                        <input 
                            type="text"
                            value={produtoParaEditar.descricao}
                            onChange={e => setProdutoParaEditar({...produtoParaEditar, descricao: e.target.value})}
                            placeholder="Descrição"
                            className="border rounded px-4 py-2 w-full mb-2"
                        />
                        <input 
                            type="number"
                            value={produtoParaEditar.preco}
                            onChange={e => setProdutoParaEditar({...produtoParaEditar, preco: e.target.value})}
                            placeholder="Preço"
                            className="border rounded px-4 py-2 w-full mb-2"
                        />
                        <input 
                            type="text"
                            value={produtoParaEditar.unidade}
                            onChange={e => setProdutoParaEditar({...produtoParaEditar, unidade: e.target.value})}
                            placeholder="Unidade"
                            className="border rounded px-4 py-2 w-full mb-4"
                        />
                    
                    <div className="flex gap-2 justify-end">
                            <button 
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Salvar
                            </button>
                            </div>
                </div>
            </div>
        )}

        {showCreateModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-bold mb-4">Novo Produto</h2>
                    <input 
                        type="number"
                        value={novoProduto.codigo}
                        onChange={e => setNovoProduto({...novoProduto, codigo: e.target.value})}
                        placeholder="Código"
                        className="border rounded px-4 py-2 w-full mb-2"
                    />
                    <input 
                        type="string"
                        value={novoProduto.descricao}
                        onChange={e => setNovoProduto({...novoProduto, descricao: e.target.value})}
                        placeholder="descricão"
                        className="border rounded px-4 py-2 w-full mb-2"
                    />

                    <input 
                        type="string"
                        value={novoProduto.preco}
                        onChange={e => setNovoProduto({...novoProduto, preco: e.target.value})}
                        placeholder="preço"
                        className="border rounded px-4 py-2 w-full mb-2"
                    />

                    <input 
                        type="string"
                        value={novoProduto.unidade}
                        onChange={e => setNovoProduto({...novoProduto, unidade: e.target.value})}
                        placeholder="unidade"
                        className="border rounded px-4 py-2 w-full mb-2"
                    />
                   
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => setShowCreateModal(false)}>Cancelar</button>
                        <button onClick={handleCreate}>Salvar</button>
                    </div>
                </div>
            </div>
        )}
        
    </AdminLayout>

        
    )

    
}