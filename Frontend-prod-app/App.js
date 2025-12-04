import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';


export default function App() {
const [produtos, setProdutos] = useState([
{
id: 1,
nome: 'Case Capa Notebook Macbook Air Pro M1 E M2',
descricao: 'Em Couro 3 Em 1',
preco: '129,90',
imagemUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_602289-MLB90530466287_082025-F-case-capa-notebook-macbook-air-pro-m1-e-m2-em-couro-3-em-1.webp'
},
{
id: 2,
nome: 'Tênis Masculino Esportivo Academia Treino + Carteira Relogio',
descricao: 'Tenis leve e confortavel.',
preco: '79,90',
imagemUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_636857-MLB88485965133_072025-F-tnis-masculino-esportivo-academia-treino-carteira-relogio.webp'
}
]);


const [showForm, setShowForm] = useState(false);


function handleSave(product) {
const novo = { ...product, id: Date.now() };
setProdutos(prev => [novo, ...prev]);
setShowForm(false);
}


return (
<SafeAreaView style={styles.pageContainer}>
<View style={styles.header}>
<Text style={styles.logo}>⚡Clickbait</Text>
</View>


<View style={styles.productContainer}>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
<Text style={{ color: '#d1d5db', fontSize: 16 }}>Produtos</Text>
<TouchableOpacity
onPress={() => setShowForm(v => !v)}
style={showForm ? styles.buttonOutline : styles.button}
>
<Text style={showForm ? styles.buttonOutlineText : styles.buttonText}>
{showForm ? 'Fechar' : 'Cadastrar'}
</Text>
</TouchableOpacity>
</View>


{showForm ? (
<ProductForm onSave={handleSave} />
) : (
<ProductList produtos={produtos} />
)}
</View>
</SafeAreaView>
);
}