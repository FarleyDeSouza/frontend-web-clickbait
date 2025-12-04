import { useState } from 'react'
import api from '../services/api'
import './Login-Register.css'

const estados = [
  'Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Distrito Federal',
  'Espírito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grossodo Sul',
  'Minas Gerais',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernambuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Tocantins'
]

export default function Register() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    estado: estados[0],
    cidade: '',
    nascimento: '',
    senha: '',
    confirmarSenha: ''
  })
  const [message, setMessage] = useState(null)

  function onChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)
    // Enviando as informações de cadastro para API
    try {
      const payload = {
        Nome: form.nome,
        Email: form.email,
        Telefone: form.telefone,
        Estado: estados.indexOf(form.estado),
        Cidade: form.cidade,
        Nascimento: form.nascimento,
        Senha: form.senha,
        ConfirmarSenha: form.confirmarSenha
      }
      const res = await api.post('/api/usuarios', payload)
      setMessage(res.data?.message || '✅ Cadastro efetuado com sucesso')
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Erro ao cadastrar')
    }
  }

  return (
    <div className="page-container">
      {/* Cabeçalho */}
      <header className="header">
        <h1 className="logo">
          <span className="logo-icon">⚡</span> Clickbait
        </h1>
      </header>

      {/* Conteúdo principal */}
      <main className='auth-container'>
        <div className="auth-card">
          <h2>Cadastro</h2>
          {message && <div className="auth-message">{message}</div>}
          <form className='auth-form' onSubmit={handleSubmit}>
            <label>
              Nome
              <input name="nome" value={form.nome} onChange={onChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={onChange} required />
            </label>
            <label>
              Telefone
              <input name="telefone" value={form.telefone} onChange={onChange} />
            </label>
            <label>
              Estado
              <select name="estado" value={form.estado} onChange={onChange}>
                {estados.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </label>
            <label>
              Cidade
              <input name="cidade" value={form.cidade} onChange={onChange} required />
            </label>
            <label>
              Nascimento
              <input name="nascimento" type="date" value={form.nascimento} onChange={onChange} required />
            </label>
            <label>
              Senha
              <input name="senha" type="password" value={form.senha} onChange={onChange} required />
            </label>
            <label>
              Confirmar Senha
              <input name="confirmarSenha" type="password" value={form.confirmarSenha} onChange={onChange} required />
            </label>
            <button className="auth-button" type="submit">Cadastrar</button>
          </form>
          <div className="auth-switch">
            {`Já possui uma conta? `}<a href="/Login">Entre</a>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Clickbait - Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
