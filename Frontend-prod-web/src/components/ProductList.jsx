import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import ProductCard from '../components/ProductCard'

export default function ProductList(){
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  async function load(){
    try{
      setLoading(true)
      const data = await fetchProducts(q)
      setProducts(data)
    }catch(err){
      console.error(err)
      alert('Erro ao carregar produtos. Veja o console.')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, []) // carrega ao montar

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pesquisar produtos..." className="flex-1 border rounded px-3 py-2" />
        <button onClick={load} className="px-4 py-2 bg-indigo-600 text-white rounded">Buscar</button>
      </div>

      {loading ? <div>Carregando...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length === 0 ? <div className="col-span-full text-gray-600">Nenhum produto encontrado.</div> : products.map(p=>(
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
