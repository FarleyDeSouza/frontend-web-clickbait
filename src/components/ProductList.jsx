import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import cartService from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState(null);
    const { signed } = useAuth();
    const { updateCartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            // Fallback para produtos de exemplo se a API falhar (para demonstração)
            setProducts([
                {
                    _id: '507f1f77bcf86cd799439011',
                    nome: 'ClicNotícias+ Premium',
                    descricao: 'Acesso premium às notícias mais quentes e exclusivas.',
                    preco: 29.90,
                    imagem: '�'
                },
                {
                    _id: '507f1f77bcf86cd799439012',
                    nome: 'Kit Clic-Gadgets Iniciante',
                    descricao: 'Kit completo para iniciantes em tecnologia e gadgets.',
                    preco: 89.90,
                    imagem: '�'
                },
                {
                    _id: '507f1f77bcf86cd799439013',
                    nome: 'Curso Clic-Marketing Digital',
                    descricao: 'Aprenda estratégias de marketing viral e clickbait.',
                    preco: 149.90,
                    imagem: '📈'
                },
                {
                    _id: '507f1f77bcf86cd799439014',
                    nome: 'E-book Clickbait Secrets',
                    descricao: 'Segredos para criar títulos irresistíveis.',
                    preco: 19.90,
                    imagem: '📚'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (product) => {
        if (!signed) {
            navigate('/login');
            return;
        }

        try {
            setAddingId(product._id);
            await cartService.addItem({
                produtoId: product._id,
                quantidade: 1,
                productDetails: product // Passando detalhes para fallback local
            });
            updateCartCount();
            alert('Produto adicionado ao carrinho!');
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            alert('Erro ao adicionar produto ao carrinho.');
        } finally {
            setAddingId(null);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando produtos...</p>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <header className="product-list-header">
                <h1>Nossos Produtos</h1>
                <p>Confira as melhores ofertas selecionadas para você</p>
            </header>

            <div className="products-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <div className="product-image-placeholder">
                            {product.imagem || '📦'}
                        </div>
                        <div className="product-info">
                            <h3>{product.nome}</h3>
                            <p className="product-description">{product.descricao}</p>
                            <p className="product-price">
                                R$ {product.preco.toFixed(2).replace('.', ',')}
                            </p>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(product)}
                                disabled={addingId === product._id}
                            >
                                {addingId === product._id ? 'Adicionando...' : '🛒 Adicionar ao Carrinho'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
