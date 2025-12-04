import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Importando componentes de Autenticação (Vindos da branch Barbara)
import Login from "./components/Login";
import Register from "./components/Register";

// Importando componentes do Sistema (Vindos da branch Main)
import PaymentForm from "./components/PaymentForm";
import PedidosList from "./components/PedidosList";
import PedidoDetail from "./components/PedidoDetail";
import CreatePedido from "./components/CreatePedido";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1 className="logo">
            <span className="logo-icon">⚡</span> Clickbait
          </h1>
          {/* Futuramente você pode adicionar links de navegação aqui usando <Link to="..."> */}
        </header>

        <main className="app-main">
          <Routes>
            {/* Rotas Iniciais */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas do Sistema */}
            <Route path="/payment" element={<PaymentForm />} />
            
            {/* Rotas de Pedidos */}
            <Route path="/pedidos" element={<PedidosList />} />
            <Route path="/pedidos/novo" element={<CreatePedido />} />
            {/* A rota abaixo pega o ID do pedido na URL (ex: /pedidos/123) */}
            <Route path="/pedidos/:id" element={<PedidoDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
