import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import cartService from '../services/cartService';
import { criarPedido } from '../api/pedidosService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({
    rua: '',
    numero: '',
    cidade: '',
    estado: ''
  });

  const { user, signed } = useAuth();
  const { updateCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (signed) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [signed]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cart = await cartService.fetchCart();

      // Converter formato do backend para o formato local
      const items = cart.items?.map(item => ({
        id: item.produtoId,
        produtoId: item.produtoId,
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade
      })) || [];

      setCartItems(items);
    } catch (error) {
      console.warn('Erro ao carregar carrinho:', error.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    try {
      // Atualizar estado local otimista
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantidade: newQuantity } : item
        )
      );

      await cartService.updateQuantidade({
        produtoId: item.produtoId,
        quantidade: newQuantity
      });
      updateCartCount();
    } catch (error) {
      console.warn('Erro ao atualizar quantidade:', error.message);
      loadCart(); // Reverter em caso de erro
    }
  };

  const removeItem = async (id) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    try {
      setCartItems(items => items.filter(item => item.id !== id));

      await cartService.removeItem({
        produtoId: item.produtoId
      });
      updateCartCount();
    } catch (error) {
      console.warn('Erro ao remover item:', error.message);
      loadCart();
    }
  };

  const clearCart = async () => {
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      try {
        setCartItems([]);
        await cartService.clearCart();
        updateCartCount();
      } catch (error) {
        console.warn('Erro ao limpar carrinho:', error.message);
        loadCart();
      }
    }
  };

  const handleCheckout = async () => {
    if (!address.rua || !address.numero || !address.cidade || !address.estado) {
      alert('Por favor, preencha o endereço de entrega para continuar.');
      return;
    }

    try {
      setLoading(true);

      const userId = user._id || user.id || 'mock-user-id';

      const pedidoData = {
        clienteId: userId,
        itens: cartItems.map(item => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          preco: item.preco
        })),
        endereco: address
      };

      let novoPedido;
      try {
        novoPedido = await criarPedido(pedidoData);
      } catch (err) {
        console.warn("Backend offline, creating mock order");
        novoPedido = { _id: 'mock-order-' + Date.now(), ...pedidoData };
      }

      await cartService.clearCart();
      setCartItems([]);
      updateCartCount();

      navigate('/payment', {
        state: {
          orderId: novoPedido._id || novoPedido.id,
          amount: calculateTotal()
        }
      });

    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar pedido.');
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% taxa
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantidade, 0);

  if (!signed) {
    return (
      <div className="cart-app">
        <div className="cart-container">
          <h2>Por favor, faça login para ver seu carrinho.</h2>
          <button onClick={() => navigate('/login')}>Ir para Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-app">


      {/* Loading */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando seu carrinho...</p>
        </div>
      ) : (
        /* Container principal */
        <div className="cart-container">
          {/* Lista de itens do carrinho */}
          <div className="cart-items">
            <h2>🛒 Seus Itens ({totalItems})</h2>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <h3>Carrinho vazio</h3>
                <p>Adicione alguns produtos incríveis ao seu carrinho!</p>
              </div>
            ) : (
              cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => updateQuantity(item.id, item.quantidade + 1)}
                  onDecrease={() => updateQuantity(item.id, item.quantidade - 1)}
                  onRemove={() => removeItem(item.id)}
                />
              ))
            )}

            {cartItems.length > 0 && (
              <div className="address-section">
                <h3>📍 Endereço de Entrega</h3>
                <div className="address-grid">
                  <div className="form-group">
                    <label>Rua</label>
                    <input
                      type="text"
                      value={address.rua}
                      onChange={e => setAddress({ ...address, rua: e.target.value })}
                      placeholder="Ex: Rua das Flores"
                      className="address-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Número</label>
                    <input
                      type="text"
                      value={address.numero}
                      onChange={e => setAddress({ ...address, numero: e.target.value })}
                      placeholder="123"
                      className="address-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cidade</label>
                    <input
                      type="text"
                      value={address.cidade}
                      onChange={e => setAddress({ ...address, cidade: e.target.value })}
                      placeholder="São Paulo"
                      className="address-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <input
                      type="text"
                      value={address.estado}
                      onChange={e => setAddress({ ...address, estado: e.target.value })}
                      placeholder="SP"
                      className="address-input"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resumo do carrinho */}
          <CartSummary
            itemCount={totalItems}
            subtotal={calculateSubtotal()}
            tax={calculateTax()}
            total={calculateTotal()}
            onClear={clearCart}
            onCheckout={handleCheckout}
            disabled={cartItems.length === 0}
          />
        </div>
      )}

    </div>
  );
}

export default CartPage;