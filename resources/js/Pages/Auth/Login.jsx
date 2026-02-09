import React, { useState } from 'react'
import '../../../css/app.css';
import { useForm, Head } from '@inertiajs/react'

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false)
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    })

    function submit(e) {
        e.preventDefault()
        if (isRegistering) {
            post('/register')
        } else {
            post('/login')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head title={isRegistering ? "Cadastro" : "Login"} />
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {isRegistering ? 'Cadastro' : 'Login'}
                </h1>
                
                <form onSubmit={submit}>
                    {isRegistering && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nome</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Senha</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {isRegistering && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Confirmar Senha</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                    )}

                    {!isRegistering && (
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-gray-700">Lembrar-me</span>
                            </label>
                        </div>
                    )}

                    <button type="submit" disabled={processing} className="w-full bg-blue-500 text-white py-2 rounded-lg">
                        {processing ? 'Aguarde...' : (isRegistering ? 'Cadastrar' : 'Entrar')}
                    </button>
                </form>

                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="w-full mt-4 text-blue-500"
                >
                    {isRegistering ? 'Já tenho conta' : 'Criar conta'}
                </button>
            </div>
        </div>
    )
}