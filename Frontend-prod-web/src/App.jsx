import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="app-container flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">Clickbait Produtos</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-700">Produtos</Link>
            <Link to="/novo" className="text-gray-700">Cadastrar</Link>
          </nav>
        </div>
      </header>

      <main className="app-container py-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/novo" element={<ProductForm />} />
        </Routes>
      </main>
    </div>
  )
}
