import api from './api';

const PRODUCTS_STORAGE_KEY = '@Clickbait:products';

const getLocalProducts = () => {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveLocalProducts = (products) => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

// Default mock products to show when offline and no local products exist
const DEFAULT_MOCK_PRODUCTS = [
    {
        _id: '507f1f77bcf86cd799439011',
        nome: 'ClicNotícias+ Premium',
        descricao: 'Acesso premium às notícias mais quentes e exclusivas.',
        preco: 29.90,
        imagem: '📰'
    },
    {
        _id: '507f1f77bcf86cd799439012',
        nome: 'Kit Clic-Gadgets Iniciante',
        descricao: 'Kit completo para iniciantes em tecnologia e gadgets.',
        preco: 89.90,
        imagem: '📱'
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
];

export const productService = {
    getAllProducts: async () => {
        try {
            const response = await api.get('/api/produtos');
            return response.data;
        } catch (error) {
            console.warn('Backend offline. Fetching local products.');
            const localProducts = getLocalProducts();
            // Combine default mocks with user created local products
            // If local storage is empty, we might want to initialize it with defaults or just return defaults + local
            // For simplicity, let's return defaults + local, filtering duplicates if necessary
            const allProducts = [...DEFAULT_MOCK_PRODUCTS, ...localProducts];
            // Remove duplicates based on ID if any
            const uniqueProducts = Array.from(new Map(allProducts.map(item => [item._id, item])).values());
            return uniqueProducts;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await api.get(`/api/produtos/${id}`);
            return response.data;
        } catch (error) {
            console.warn(`Backend offline. Fetching product ${id} locally.`);
            const localProducts = getLocalProducts();
            const allProducts = [...DEFAULT_MOCK_PRODUCTS, ...localProducts];
            const product = allProducts.find(p => p._id === id);
            if (!product) throw error;
            return product;
        }
    },

    createProduct: async (productData) => {
        try {
            const response = await api.post('/api/produtos', productData);
            return response.data;
        } catch (error) {
            console.warn('Backend offline. Creating product locally.');
            const localProducts = getLocalProducts();
            const newProduct = {
                ...productData,
                _id: 'local-' + Date.now(),
                createdAt: new Date().toISOString()
            };
            localProducts.push(newProduct);
            saveLocalProducts(localProducts);
            return newProduct;
        }
    }
}; export default productService;
