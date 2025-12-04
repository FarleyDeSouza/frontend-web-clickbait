import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ProductCard from './ProductCard';
import { styles } from '../styles';


export default function ProductList({ produtos }) {
return (
<View>
{produtos.length === 0 ? (
<Text style={[styles.textGray600, styles.textSm]}>Nenhum produto encontrado.</Text>
) : (
<FlatList
data={produtos}
keyExtractor={(item) => String(item.id)}
renderItem={({ item }) => <ProductCard item={item} />}
/>
)}
</View>
);
}