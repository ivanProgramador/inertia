import React, { useState } from 'react'
import { Link } from '@inertiajs/react'

export default function AdminLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Menu Lateral */}
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-xl font-bold">Admin</h2>
                </div>
                <nav className="mt-4">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
                        Dashboard
                    </Link>
                    <div>
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between"
                        >
                            Cadastros
                            <span>{menuOpen ? '▼' : '▶'}</span>
                        </button>
                        {menuOpen && (
                            <div>
                                <div className="bg-gray-900">
                                <Link href="/produtos" className="block px-8 py-2 hover:bg-gray-700">
                                    Produtos
                                </Link>
                               </div>
                            </div>
                            
                        )}
                    </div>
                    <Link href="/logout" method="post" as="button" className="w-full text-left px-4 py-2 hover:bg-gray-700">
                        Sair
                    </Link>
                </nav>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}