import axios from "axios";

const API_BASE_URL = "https://pmv-ads-2025-2-e4-proj-infra-t5-clickbait.onrender.com/api";
const STORAGE_KEY = '@Clickbait:pedidos';

// Helper para gerenciar LocalStorage
const getLocalPedidos = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalPedidos = (pedidos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
};

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
    console.warn("Backend offline. Listando pedidos locais.");
    const pedidos = getLocalPedidos();
    // Simples filtro local se necessário
    return pedidos;
  }
};

// Obter pedido por ID
export const obterPedido = async (id) => {
  try {
    const response = await apiClient.get(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`Backend offline. Buscando pedido ${id} localmente.`);
    const pedidos = getLocalPedidos();
    const pedido = pedidos.find(p => p._id === id || p.id === id);
    if (!pedido) throw error;
    return pedido;
  }
};

// Criar novo pedido
export const criarPedido = async (dadosPedido) => {
  try {
    const response = await apiClient.post("/pedidos", dadosPedido);
    return response.data;
  } catch (error) {
    console.warn("Backend offline. Criando pedido localmente.");
    const pedidos = getLocalPedidos();
    const novoPedido = {
      _id: 'local-' + Date.now(),
      id: 'local-' + Date.now(),
      status: 'pendente',
      dataCriacao: new Date().toISOString(),
      ...dadosPedido
    };
    pedidos.push(novoPedido);
    saveLocalPedidos(pedidos);
    return novoPedido;
  }
};

// Atualizar pedido
export const atualizarPedido = async (id, dadosAtualizacao) => {
  try {
    const response = await apiClient.put(`/pedidos/${id}`, dadosAtualizacao);
    return response.data;
  } catch (error) {
    console.warn("Backend offline. Atualizando pedido localmente.");
    const pedidos = getLocalPedidos();
    const index = pedidos.findIndex(p => p._id === id || p.id === id);
    if (index !== -1) {
      pedidos[index] = { ...pedidos[index], ...dadosAtualizacao };
      saveLocalPedidos(pedidos);
      return pedidos[index];
    }
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
    console.warn("Backend offline. Atualizando status localmente.");
    const pedidos = getLocalPedidos();
    const index = pedidos.findIndex(p => p._id === id || p.id === id);
    if (index !== -1) {
      pedidos[index].status = novoStatus;
      saveLocalPedidos(pedidos);
      return pedidos[index];
    }
    throw error;
  }
};

// Deletar pedido
export const deletarPedido = async (id) => {
  try {
    const response = await apiClient.delete(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.warn("Backend offline. Deletando pedido localmente.");
    let pedidos = getLocalPedidos();
    pedidos = pedidos.filter(p => p._id !== id && p.id !== id);
    saveLocalPedidos(pedidos);
    return { message: "Pedido deletado localmente" };
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
