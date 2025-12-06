import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { cartCount } = useCart();

    // Rotas onde a Navbar NÃO deve aparecer
    const hiddenRoutes = ['/', '/login', '/register'];

    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/pedidos" className="navbar-logo">
                    <span className="logo-icon">⚡</span> Clickbait
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/produtos">Produtos</Link>
                </li>
                <li>
                    <Link to="/produtos/novo">Cadastrar Produto</Link>
                </li>
                <li>
                    <Link to="/pedidos">Meus Pedidos</Link>
                </li>
                <li>
                    <Link to="/cart" className="cart-link">
                        Carrinho
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </li>
            </ul>
            <div className="navbar-actions">
                <button onClick={handleLogout} className="logout-btn">
                    Sair
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
