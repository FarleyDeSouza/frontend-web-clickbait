import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('@Clickbait:token');
        const storedUser = localStorage.getItem('@Clickbait:user');

        if (storedToken && storedUser) {
            api.defaults.headers.Authorization = `Bearer ${storedToken}`;
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, senha) => {
        try {
            const response = await api.post('/api/auth/login', { email, senha });

            const { token, user } = response.data;

            localStorage.setItem('@Clickbait:token', token);
            localStorage.setItem('@Clickbait:user', JSON.stringify(user));

            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(user);
        } catch (error) {
            console.warn("Backend não encontrado. Entrando em modo de demonstração.");

            // Simulação de Login (Fallback)
            const mockUser = {
                _id: 'demo-user-id',
                nome: 'Usuário Demo',
                email: email
            };
            const mockToken = 'demo-token-123';

            localStorage.setItem('@Clickbait:token', mockToken);
            localStorage.setItem('@Clickbait:user', JSON.stringify(mockUser));

            api.defaults.headers.Authorization = `Bearer ${mockToken}`;
            setUser(mockUser);
        }
    }; const logout = () => {
        localStorage.removeItem('@Clickbait:token');
        localStorage.removeItem('@Clickbait:user');
        api.defaults.headers.Authorization = undefined;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default AuthContext;
