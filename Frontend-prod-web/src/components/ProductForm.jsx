import React, { useState } from 'react'
import { createProduct } from '../api'
import { useNavigate } from 'react-router-dom'

export default function ProductForm() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagemUrl, setImagemUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = { nome, descricao, preco: Number(preco), imagemUrl }
      await createProduct(payload)
      alert('Produto criado com sucesso!')
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Erro ao criar produto. Veja o console.')
    } finally {
      setSaving(false)
    }
  }

  return (

    <div className="page-container">
      <header className="header">
        <h1 className="logo">
          <span className="logo-icon">⚡</span> Clickbait
        </h1>
      </header>
      <main className="product-container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Novo Produto</h2>

        <label >
          <div >Nome</div>
          <input required value={nome} onChange={e => setNome(e.target.value)}/>
        </label>

        <label >
          <div>Descrição</div>
          <textarea required value={descricao} onChange={e => setDescricao(e.target.value)}/>
        </label>

        <label>
          <div>Preço (BRL)</div>
          <input required type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)}/>
        </label>

        <label>
          <div>Imagem (URL)</div>
          <input value={imagemUrl} onChange={e => setImagemUrl(e.target.value)} className="w-full border rounded px-3 py-2" />
        </label>

        <div className="flex gap-2">
          <button type="submit" disabled={saving}>Salvar</button>
          <button type="button" onClick={() => { if (confirm('Descartar e voltar?')) navigate('/') }}>Cancelar</button>
        </div>
      </form>
      </main>
    </div>
    
      );
}
