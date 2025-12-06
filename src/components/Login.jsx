import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login-Register.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      await login(email, senha)
      navigate('/pedidos')
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Erro ao efetuar login')
    } finally {
      setLoading(false)
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
          <h2>Login</h2>
          {message && <div className="auth-message">{message}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
              Senha
              <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
            </label>
            <button className="auth-button" type="submit">Entrar</button>
          </form>
          <div className="auth-switch">
            {`Não tem conta? `}<a href="/register">Cadastre-se</a>
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