import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';


export default function ProductForm({ onSave }) {
const [nome, setNome] = useState('');
const [descricao, setDescricao] = useState('');
const [preco, setPreco] = useState('');
const [imagemUrl, setImagemUrl] = useState('');


function handleSave() {
if (!nome || !preco) return;
onSave({ nome, descricao, preco, imagemUrl });
setNome(''); setDescricao(''); setPreco(''); setImagemUrl('');
}


return (
<View style={{ marginBottom: 16 }}>
<Text style={styles.formTitle}>Cadastrar Produto</Text>


<View style={styles.label}>
<Text style={styles.labelText}>Nome</Text>
<TextInput style={styles.input} value={nome} onChangeText={setNome} />
</View>


<View style={styles.label}>
<Text style={styles.labelText}>Descrição</Text>
<TextInput style={styles.textarea} value={descricao} onChangeText={setDescricao} multiline />
</View>


<View style={styles.label}>
<Text style={styles.labelText}>Preço</Text>
<TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" />
</View>


<View style={styles.label}>
<Text style={styles.labelText}>Imagem URL</Text>
<TextInput style={styles.input} value={imagemUrl} onChangeText={setImagemUrl} />
</View>


<TouchableOpacity style={styles.button} onPress={handleSave}>
<Text style={styles.buttonText}>Salvar</Text>
</TouchableOpacity>
</View>
);
}