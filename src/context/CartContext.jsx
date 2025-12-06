import React, { createContext, useState, useContext, useEffect } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const { signed } = useAuth();

    useEffect(() => {
        if (signed) {
            updateCartCount();
        } else {
            setCartCount(0);
        }
    }, [signed]);

    const updateCartCount = async () => {
        try {
            const cart = await cartService.fetchCart();
            const count = cart.items ? cart.items.reduce((acc, item) => acc + item.quantidade, 0) : 0;
            setCartCount(count);
        } catch (error) {
            console.error("Error updating cart count", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
