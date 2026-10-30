import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Detalhes() {
  const { receita } = useLocalSearchParams<{ receita: string }>();
  const item = JSON.parse(receita || '{}');

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
      <Text style={styles.titulo}>{item.strMeal}</Text>
      <Text style={styles.info}>Categoria: {item.strCategory || 'Não informada'}</Text>
      <Text style={styles.info}>Origem: {item.strArea || 'Não informada'}</Text>
      <Text style={styles.subtitulo}>Modo de preparo</Text>
      <Text style={styles.texto}>{item.strInstructions || 'Não disponível.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fffaf5' 
  },
  imagem: { 
    width: '100%', 
    height: 230, 
    borderRadius: 8 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 12 
  },
  info: { 
    fontSize: 15, 
    marginTop: 6, 
    color: '#666' 
  },
  subtitulo: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginBottom: 8 
  },
  texto: { 
    fontSize: 16, 
    lineHeight: 23 
  },
});
