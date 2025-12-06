import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { useAuth } from '../context/AuthContext';
import './ProductForm.css';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        imagem: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signed } = useAuth();

    // Redirecionar se não estiver logado (opcional, já que a rota pode ser protegida)
    if (!signed) {
        return (
            <div className="product-form-container">
                <h2>Acesso Negado</h2>
                <p>Você precisa estar logado para cadastrar produtos.</p>
                <button className="btn-submit" onClick={() => navigate('/login')}>Ir para Login</button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await productService.createProduct({
                ...formData,
                preco: Number(formData.preco)
            });
            alert('Produto cadastrado com sucesso!');
            navigate('/produtos');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-page">

            <div className="product-form-container">
                <h2 className="form-title">➕ Cadastrar Produto</h2>
                <div className="form-divider"></div>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="preco">Preço</label>
                        <input
                            type="number"
                            id="preco"
                            name="preco"
                            value={formData.preco}
                            onChange={handleChange}
                            required
                            min="0.01"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imagem">Imagem URL</label>
                        <input
                            type="url"
                            id="imagem"
                            name="imagem"
                            value={formData.imagem}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate('/produtos')}
                        >
                            ✕ Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Cadastrando...' : '✅ Cadastrar Produto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
