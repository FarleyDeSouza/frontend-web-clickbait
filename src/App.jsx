import React, { useState } from "react";
import PaymentForm from "./components/PaymentForm";
import PedidosList from "./components/PedidosList";
import PedidoDetail from "./components/PedidoDetail";
import CreatePedido from "./components/CreatePedido";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("pedidos"); // pedidos, detail, create, payment
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);

  const handleSelectPedido = (pedidoId) => {
    setSelectedPedidoId(pedidoId);
    setCurrentView("detail");
  };

  const handleCreateNew = () => {
    setCurrentView("create");
  };

  const handleBackToPedidos = () => {
    setSelectedPedidoId(null);
    setCurrentView("pedidos");
  };

  const handleCreateSuccess = (novoPedidoId) => {
    setSelectedPedidoId(novoPedidoId);
    setCurrentView("detail");
  };

  const handlePaymentSuccess = (pedidoId) => {
    setCurrentView("detail");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo">
          <span className="logo-icon">⚡</span> Clickbait
        </h1>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${currentView === "pedidos" ? "active" : ""}`}
            onClick={() => handleBackToPedidos()}
          >
            📦 Pedidos
          </button>
          <button
            className={`nav-tab ${currentView === "payment" ? "active" : ""}`}
            onClick={() => setCurrentView("payment")}
          >
            💳 Pagamento Direto
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === "pedidos" && (
          <PedidosList
            onSelectPedido={handleSelectPedido}
            onCreateNew={handleCreateNew}
          />
        )}

        {currentView === "detail" && selectedPedidoId && (
          <PedidoDetail
            pedidoId={selectedPedidoId}
            onBack={handleBackToPedidos}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentView === "create" && (
          <CreatePedido
            onSuccess={handleCreateSuccess}
            onCancel={handleBackToPedidos}
          />
        )}

        {currentView === "payment" && (
          <PaymentForm />
        )}
      </main>
    </div>
  );
}

export default App;
