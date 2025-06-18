import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';
import api from '../../services/api';

export default function Monitoramento() {
  const [dados, setDados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get('/Ciclo')
      .then(response => {
        setDados(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Erro ao buscar API:', error);
        setErro('Erro ao carregar dados do monitoramento');
        setLoading(false);
      });
  }, []);

  const totalMetal = dados.filter(item => item.tipoMaterial === 'Metal').length;
  const totalPlastico = dados.filter(item => item.tipoMaterial === 'Plástico').length;
  const totalPecas = dados.length;
  const totalRejeitados = dados.filter(item => item.resultado === 'Rejeitado').length;

  const ultimaParada = dados[dados.length - 1]?.data || 'Sem dados';
  const tempoProcesso = 15.0; // Se quiser, pode puxar da API futuramente
  const erros = 0.0; // Se tiver campo de erros, substitua

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Link href="/(tabs)/entry" asChild>
        <TouchableOpacity style={styles.backButton}>
          <EvilIcons name="arrow-left" size={32} color="#444" />
        </TouchableOpacity>
      </Link>

      <Text style={styles.header}>MONITORAMENTO</Text>

      {erro ? (
        <Text style={styles.error}>{erro}</Text>
      ) : (
        <>
          {/* Quantidades de Peças */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quantidades de Peças</Text>
            <Text>Qtd Metal: {totalMetal}</Text>
            <Text>Qtd Plásticos: {totalPlastico}</Text>
            <Text>Qtd Total: {totalPecas}</Text>
            <Text>Qtd Rejeitados: {totalRejeitados}</Text>
          </View>

          {/* Dados da Máquina */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dados da Máquina</Text>
            <Text style={styles.esteira}>
              Esteira: <Text style={styles.ativo}>Ligado</Text>
            </Text>
            <Text>Tempo de Processo da Máquina: {tempoProcesso} s</Text>
            <Text>Última Parada: {ultimaParada}</Text>
            <Text>Erros: {erros}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F0F0D8', 
  },
  container: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#B4DEBE',
    width: '90%',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  esteira: {
    marginBottom: 5,
  },
  ativo: {
    color: 'green',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#ffffffcc',
    padding: 8,
    borderRadius: 30,
    zIndex: 10,
  },
});
