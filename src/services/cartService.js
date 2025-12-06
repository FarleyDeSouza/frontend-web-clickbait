import api from './api';

const CART_STORAGE_KEY = '@Clickbait:cart';

const getLocalCart = () => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : { items: [] };
};

const saveLocalCart = (cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const cartService = {
  fetchCart: async () => {
    try {
      const response = await api.get('/api/carrinho');
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Fetching local cart.');
      return getLocalCart();
    }
  },

  addItem: async ({ produtoId, quantidade, productDetails }) => {
    try {
      const response = await api.post('/api/carrinho/adicionar', {
        produtoId,
        quantidade
      });
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Adding to local cart.');
      const cart = getLocalCart();
      const existingItemIndex = cart.items.findIndex(item => item.produtoId === produtoId);

      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantidade += quantidade;
      } else {
        // In offline mode, we need product details to add to cart since we can't fetch them from DB
        const newItem = {
          produtoId,
          quantidade,
          // Use provided details or placeholders
          nome: productDetails?.nome || 'Produto Desconhecido',
          preco: productDetails?.preco || 0,
          imagem: productDetails?.imagem || '📦'
        };
        cart.items.push(newItem);
      }
      saveLocalCart(cart);
      return cart;
    }
  },

  updateQuantidade: async ({ produtoId, quantidade }) => {
    try {
      const response = await api.put('/api/carrinho/atualizar', {
        produtoId,
        quantidade
      });
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Updating local cart.');
      const cart = getLocalCart();
      const itemIndex = cart.items.findIndex(item => item.produtoId === produtoId);

      if (itemIndex >= 0) {
        cart.items[itemIndex].quantidade = quantidade;
        saveLocalCart(cart);
      }
      return cart;
    }
  },

  removeItem: async ({ produtoId }) => {
    try {
      const response = await api.delete(`/api/carrinho/remover/${produtoId}`);
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Removing from local cart.');
      const cart = getLocalCart();
      cart.items = cart.items.filter(item => item.produtoId !== produtoId);
      saveLocalCart(cart);
      return cart;
    }
  },

  clearCart: async () => {
    try {
      const response = await api.delete('/api/carrinho/limpar');
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Clearing local cart.');
      saveLocalCart({ items: [] });
      return { items: [] };
    }
  }
};

export default cartService;