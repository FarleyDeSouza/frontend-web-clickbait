import React, { useState, useEffect } from "react";
import { listarPedidos, deletarPedido } from "../api/pedidosService";
import "./PedidosList.css";

export default function PedidosList({ onSelectPedido, onCreateNew }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [page, setPage] = useState(1);
  const [filtroStatus, setFiltroStatus] = useState("");

  const statusCores = {
    pendente: "#ffd700",
    confirmado: "#ffd700",
    enviado: "#ffd700",
    entregue: "#ffd700",
    cancelado: "#ff6b6b"
  };

  useEffect(() => {
    carregarPedidos();
  }, [page, filtroCliente]);

  const carregarPedidos = async () => {
    try {
      setLoading(true);
      const dados = await listarPedidos(filtroCliente || null, page, 10);
      setPedidos(dados);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
      setError("Erro ao carregar pedidos. Verifique a conexão com a API.");
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePedido = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este pedido?")) {
      try {
        await deletarPedido(id);
        carregarPedidos();
      } catch (err) {
        console.error("Erro ao deletar pedido:", err);
        setError("Erro ao deletar pedido.");
      }
    }
  };

  const pedidosFiltrados = filtroStatus
    ? pedidos.filter(p => p.status === filtroStatus)
    : pedidos;

  return (
    <div className="pedidos-list-container">
      <div className="pedidos-header">
        <h2>📦 Meus Pedidos</h2>
        <button className="btn-criar" onClick={onCreateNew}>
          ➕ Novo Pedido
        </button>
      </div>

      <div className="filtros-container">
        <input
          type="text"
          placeholder="Filtrar por ID do cliente..."
          value={filtroCliente}
          onChange={(e) => {
            setFiltroCliente(e.target.value);
            setPage(1);
          }}
          className="filtro-input"
        />
        
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todos os Status</option>
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="enviado">Enviado</option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Carregando pedidos...</div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum pedido encontrado</p>
          <button onClick={onCreateNew} className="btn-criar">
            Criar Primeiro Pedido
          </button>
        </div>
      ) : (
        <div className="pedidos-grid">
          {pedidosFiltrados.map((pedido) => (
            <div
              key={pedido.id}
              className="pedido-card"
              onClick={() => onSelectPedido(pedido.id)}
            >
              <div className="pedido-header-card">
                <h3>Pedido #{pedido.id.slice(-6)}</h3>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: statusCores[pedido.status] || "#6c757d"
                  }}
                >
                  {pedido.status}
                </span>
              </div>

              <div className="pedido-info">
                <p>
                  <strong>Cliente:</strong> {pedido.clienteId}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(pedido.dataCriacao).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="pedido-actions">
                <button
                  className="btn-view"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPedido(pedido.id);
                  }}
                >
                  👁️ Ver Detalhes
                </button>
                <button
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePedido(pedido.id);
                  }}
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="btn-pag"
        >
          ← Anterior
        </button>
        <span className="page-info">Página {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={pedidosFiltrados.length < 10}
          className="btn-pag"
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}
