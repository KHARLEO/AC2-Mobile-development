import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Home() {
  const [pesquisa, setPesquisa] = useState('');
  const [receitas, setReceitas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [pesquisou, setPesquisou] = useState(false);
  const router = useRouter();

  async function buscarReceitas() {
    if (pesquisa.trim() === '') return;
    setCarregando(true);
    setPesquisou(true);
    try {
      const resposta = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${pesquisa}`);
      setReceitas(resposta.data.meals || []);
    } catch {
      setReceitas([]);
    }
    setCarregando(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar receitas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma receita (ex.: pasta, cake)"
        value={pesquisa}
        onChangeText={setPesquisa}
        onSubmitEditing={buscarReceitas}
      />
      <Button title="Buscar" onPress={buscarReceitas} color="#6bc4df" />
      {carregando && <ActivityIndicator size="large" style={{ margin: 15 }} />}
      {!carregando && pesquisou && receitas.length === 0 && <Text style={styles.mensagem}>Nenhuma receita encontrada.</Text>}
      {!pesquisou && <Text style={styles.mensagem}>Digite o nome de um prato para começar.</Text>}
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/detalhes', params: { receita: JSON.stringify(item) } })}>
            <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
            <Text style={styles.nome}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fffaf5' 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  input: { 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    padding: 10, 
    marginBottom: 8 
  },
  mensagem: { 
    textAlign: 'center', 
    margin: 15, 
    color: '#666' 
  },
  card: { 
    backgroundColor: 'white', 
    padding: 10, 
    marginTop: 12, 
    borderRadius: 8 
  },
  imagem: { 
    width: '100%', 
    height: 180, 
    borderRadius: 6 
  },
  nome: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 8 
  },
});
