import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./App.css";

// Importando componentes de Autenticação (Vindos da branch Barbara)
import Login from "./components/Login";
import Register from "./components/Register";

// Importando componentes do Sistema (Vindos da branch Main)
import PaymentForm from "./components/PaymentForm";
import PedidosList from "./components/PedidosList";
import PedidoDetail from "./components/PedidoDetail";
import CreatePedido from "./components/CreatePedido";
import CartPage from "./components/CartPage";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="app-main">
              <Routes>
                {/* Rotas Iniciais */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rotas do Sistema */}
                <Route path="/produtos" element={<ProductList />} />
                <Route path="/produtos/novo" element={<ProductForm />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/cart" element={<CartPage />} />

                {/* Rotas de Pedidos */}
                <Route path="/pedidos" element={<PedidosList />} />
                <Route path="/pedidos/novo" element={<CreatePedido />} />
                {/* A rota abaixo pega o ID do pedido na URL (ex: /pedidos/123) */}
                <Route path="/pedidos/:id" element={<PedidoDetail />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;