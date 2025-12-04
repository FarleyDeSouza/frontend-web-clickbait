import React, { useState, useEffect } from "react";
import { obterPedido, atualizarStatusPedido } from "../api/pedidosService";
import PaymentForm from "./PaymentForm";
import "./PedidoDetail.css";

export default function PedidoDetail({ pedidoId, onBack, onPaymentSuccess }) {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [novoStatus, setNovoStatus] = useState("");

  const statusCores = {
    pendente: "#ffd700",
    confirmado: "#ffd700",
    enviado: "#ffd700",
    entregue: "#ffd700",
    cancelado: "#ff6b6b"
  };

  useEffect(() => {
    carregarPedido();
  }, [pedidoId]);

  const carregarPedido = async () => {
    try {
      setLoading(true);
      const dados = await obterPedido(pedidoId);
      setPedido(dados);
      setNovoStatus(dados.status);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar pedido:", err);
      setError("Erro ao carregar detalhes do pedido.");
    } finally {
      setLoading(false);
    }
  };

  const handleAtualizarStatus = async () => {
    if (novoStatus === pedido.status) {
      alert("Selecione um status diferente");
      return;
    }

    try {
      await atualizarStatusPedido(pedidoId, novoStatus);
      setPedido({ ...pedido, status: novoStatus });
      alert("✅ Status atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("❌ Erro ao atualizar status");
    }
  };

  const calcularTotal = () => {
    if (!pedido?.itens) return 0;
    return pedido.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  if (loading) {
    return (
      <div className="pedido-detail-container">
        <div className="loading">Carregando detalhes do pedido...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pedido-detail-container">
        <div className="error-message">{error}</div>
        <button className="btn-back" onClick={onBack}>
          ← Voltar
        </button>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="pedido-detail-container">
        <p>Pedido não encontrado</p>
        <button className="btn-back" onClick={onBack}>
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="pedido-detail-container">
      <button className="btn-back" onClick={onBack}>
        ← Voltar
      </button>

      <div className="detail-header">
        <h2>📋 Detalhes do Pedido #{pedidoId.slice(-6)}</h2>
        <span
          className="status-badge-large"
          style={{
            backgroundColor: statusCores[pedido.status] || "#6c757d"
          }}
        >
          {pedido.status.toUpperCase()}
        </span>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Informações do Pedido</h3>
          <div className="info-row">
            <label>ID do Pedido:</label>
            <span className="info-value">{pedido.id}</span>
          </div>
          <div className="info-row">
            <label>ID do Cliente:</label>
            <span className="info-value">{pedido.clienteId}</span>
          </div>
          <div className="info-row">
            <label>Data de Criação:</label>
            <span className="info-value">
              {new Date(pedido.dataCriacao).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
        </div>

        {pedido.endereco && (
          <div className="detail-card">
            <h3>📍 Endereço de Entrega</h3>
            <div className="info-row">
              <label>Rua:</label>
              <span className="info-value">{pedido.endereco.rua}</span>
            </div>
            <div className="info-row">
              <label>Número:</label>
              <span className="info-value">{pedido.endereco.numero}</span>
            </div>
            <div className="info-row">
              <label>Cidade:</label>
              <span className="info-value">{pedido.endereco.cidade}</span>
            </div>
            <div className="info-row">
              <label>Estado:</label>
              <span className="info-value">{pedido.endereco.estado}</span>
            </div>
          </div>
        )}
      </div>

      {pedido.itens && pedido.itens.length > 0 && (
        <div className="items-card">
          <h3>📦 Itens do Pedido</h3>
          <div className="items-table">
            <div className="items-header">
              <div className="col-produto">Produto</div>
              <div className="col-quantidade">Qty</div>
              <div className="col-preco">Preço</div>
              <div className="col-subtotal">Subtotal</div>
            </div>
            {pedido.itens.map((item, index) => (
              <div key={index} className="items-row">
                <div className="col-produto">{item.produtoId}</div>
                <div className="col-quantidade">{item.quantidade}</div>
                <div className="col-preco">R$ {item.preco.toFixed(2)}</div>
                <div className="col-subtotal">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="total-row">
            <strong>Total:</strong>
            <strong className="total-value">R$ {calcularTotal().toFixed(2)}</strong>
          </div>
        </div>
      )}

      <div className="actions-card">
        <div className="status-update">
          <h3>🔄 Atualizar Status</h3>
          <select
            value={novoStatus}
            onChange={(e) => setNovoStatus(e.target.value)}
            className="status-select"
          >
            <option value="pendente">Pendente</option>
            <option value="confirmado">Confirmado</option>
            <option value="enviado">Enviado</option>
            <option value="entregue">Entregue</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <button
            onClick={handleAtualizarStatus}
            className="btn-update-status"
          >
            ✅ Atualizar Status
          </button>
        </div>

        {pedido.status !== "cancelado" && (
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="btn-payment"
          >
            {showPaymentForm ? "❌ Cancelar Pagamento" : "💳 Processar Pagamento"}
          </button>
        )}
      </div>

      {showPaymentForm && pedido.status !== "cancelado" && (
        <div className="payment-section">
          <h3>Formulário de Pagamento</h3>
          <PaymentForm
            orderId={pedido.id}
            amount={calcularTotal()}
            onSuccess={() => {
              setShowPaymentForm(false);
              if (onPaymentSuccess) onPaymentSuccess(pedido.id);
            }}
          />
        </div>
      )}
    </div>
  );
}
