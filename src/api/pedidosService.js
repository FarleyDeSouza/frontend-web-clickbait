import axios from "axios";

const API_BASE_URL = "https://pmv-ads-2025-2-e4-proj-infra-t5-clickbait.onrender.com/api";

// Configurar instância do axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Listar todos os pedidos
export const listarPedidos = async (clienteId = null, page = 1, pageSize = 10) => {
  try {
    const params = { page, pageSize };
    if (clienteId) {
      params.clienteId = clienteId;
    }
    
    const response = await apiClient.get("/pedidos", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    throw error;
  }
};

// Obter pedido por ID
export const obterPedido = async (id) => {
  try {
    const response = await apiClient.get(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter pedido ${id}:`, error);
    throw error;
  }
};

// Criar novo pedido
export const criarPedido = async (dadosPedido) => {
  try {
    const response = await apiClient.post("/pedidos", dadosPedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
};

// Atualizar pedido
export const atualizarPedido = async (id, dadosAtualizacao) => {
  try {
    const response = await apiClient.put(`/pedidos/${id}`, dadosAtualizacao);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar pedido ${id}:`, error);
    throw error;
  }
};

// Atualizar status do pedido
export const atualizarStatusPedido = async (id, novoStatus) => {
  try {
    const response = await apiClient.patch(`/pedidos/${id}/status`, {
      status: novoStatus
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar status do pedido ${id}:`, error);
    throw error;
  }
};

// Deletar pedido
export const deletarPedido = async (id) => {
  try {
    const response = await apiClient.delete(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar pedido ${id}:`, error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await apiClient.get("/health");
    return response.data;
  } catch (error) {
    console.error("Erro no health check:", error);
    throw error;
  }
};

export default apiClient;
