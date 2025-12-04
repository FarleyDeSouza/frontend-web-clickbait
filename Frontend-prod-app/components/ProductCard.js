import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';


export default function ProductCard({ item }) {
return (
<View style={[styles.bgGray100, styles.rounded, styles.mb3, { padding: 12 }]}>
<View style={[styles.h48, styles.overflowHidden, styles.itemsCenter, styles.justifyCenter, { backgroundColor: '#111' }]}>
<Image source={{ uri: item.imagemUrl }} style={[{ width: '100%', height: '100%' }, styles.objectContain]} />
</View>


<Text style={[styles.textXl, styles.fontBold, styles.mt3, { color: 'white' }]}>{item.nome}</Text>
<Text style={[styles.textGray600, styles.textSm, { marginTop: 8 }]}>{item.descricao}</Text>


<View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }]}>
<Text style={[styles.textXl, styles.fontBold, { color: 'white' }]}>R$ {item.preco}</Text>
<TouchableOpacity style={styles.buttonOutline}>
<Text style={styles.buttonOutlineText}>Ver Detalhes</Text>
</TouchableOpacity>
</View>
</View>
);
}