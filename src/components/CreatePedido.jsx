import React, { useState } from "react";
import { criarPedido } from "../api/pedidosService";
import "./CreatePedido.css";

export default function CreatePedido({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    clienteId: "",
    itens: [{ produtoId: "", quantidade: 1, preco: 0 }],
    endereco: {
      rua: "",
      numero: "",
      cidade: "",
      estado: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      endereco: {
        ...formData.endereco,
        [name]: value
      }
    });
  };

  const handleItemChange = (index, field, value) => {
    const novoItens = [...formData.itens];
    novoItens[index][field] = field === "quantidade" || field === "preco" ? Number(value) : value;
    setFormData({
      ...formData,
      itens: novoItens
    });
  };

  const adicionarItem = () => {
    setFormData({
      ...formData,
      itens: [...formData.itens, { produtoId: "", quantidade: 1, preco: 0 }]
    });
  };

  const removerItem = (index) => {
    if (formData.itens.length > 1) {
      const novoItens = formData.itens.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        itens: novoItens
      });
    }
  };

  const calcularTotal = () => {
    return formData.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.clienteId.trim()) {
      setError("ID do cliente é obrigatório");
      return;
    }

    if (formData.itens.some(item => !item.produtoId || item.quantidade <= 0 || item.preco <= 0)) {
      setError("Todos os itens devem ter produto, quantidade e preço válidos");
      return;
    }

    try {
      setLoading(true);
      const novoPedido = await criarPedido(formData);
      alert("✅ Pedido criado com sucesso!");
      if (onSuccess) onSuccess(novoPedido.id);
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
      setError("Erro ao criar pedido. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-pedido-container">
      <div className="create-pedido-card">
        <h2>➕ Criar Novo Pedido</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          {/* Dados Básicos */}
          <section className="form-section">
            <h3>Dados do Pedido</h3>
            <div className="form-group">
              <label>ID do Cliente *</label>
              <input
                type="text"
                name="clienteId"
                value={formData.clienteId}
                onChange={handleInputChange}
                placeholder="Ex: 123"
                required
              />
            </div>
          </section>

          {/* Itens do Pedido */}
          <section className="form-section">
            <h3>Itens do Pedido</h3>
            <div className="items-list">
              {formData.itens.map((item, index) => (
                <div key={index} className="item-row">
                  <input
                    type="text"
                    value={item.produtoId}
                    onChange={(e) => handleItemChange(index, "produtoId", e.target.value)}
                    placeholder="ID do Produto"
                    required
                  />
                  <input
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => handleItemChange(index, "quantidade", e.target.value)}
                    placeholder="Quantidade"
                    min="1"
                    required
                  />
                  <input
                    type="number"
                    value={item.preco}
                    onChange={(e) => handleItemChange(index, "preco", e.target.value)}
                    placeholder="Preço"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="item-subtotal">
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </span>
                  {formData.itens.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removerItem(index)}
                      className="btn-remove-item"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={adicionarItem}
              className="btn-add-item"
            >
              ➕ Adicionar Item
            </button>
          </section>

          {/* Endereço */}
          <section className="form-section">
            <h3>📍 Endereço de Entrega</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Rua</label>
                <input
                  type="text"
                  name="rua"
                  value={formData.endereco.rua}
                  onChange={handleEnderecoChange}
                  placeholder="Nome da rua"
                />
              </div>
              <div className="form-group">
                <label>Número</label>
                <input
                  type="text"
                  name="numero"
                  value={formData.endereco.numero}
                  onChange={handleEnderecoChange}
                  placeholder="Número"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.endereco.cidade}
                  onChange={handleEnderecoChange}
                  placeholder="Cidade"
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={formData.endereco.estado}
                  onChange={handleEnderecoChange}
                  placeholder="Ex: SP, RJ"
                  maxLength="2"
                />
              </div>
            </div>
          </section>

          {/* Resumo e Botões */}
          <div className="form-summary">
            <div className="total-section">
              <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>
            </div>

            <div className="form-buttons">
              <button
                type="button"
                onClick={onCancel}
                className="btn-cancel"
              >
                ❌ Cancelar
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? "Criando..." : "✅ Criar Pedido"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
