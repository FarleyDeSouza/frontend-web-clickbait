import React from 'react'

export default function ProductCard({ product }){
  return (
<div className="container">
            <div className="h-48 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden">
        {product.imagemUrl ? <img src={product.imagemUrl} alt={product.nome} className="object-contain h-full" /> : <div className="text-gray-400">Sem imagem</div>}
      </div>
      <h3 className="font-semibold text-lg">{product.nome}</h3>
      <p className="text-sm text-gray-600 flex-1">{product.descricao}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xl font-bold">R$ {Number(product.preco).toFixed(2)}</div>
        <button className="px-3 py-1 border rounded text-sm">Ver</button>
      </div>
    </div>
  )
}
