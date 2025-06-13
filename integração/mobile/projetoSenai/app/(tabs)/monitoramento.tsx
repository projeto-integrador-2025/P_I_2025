import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

export default function Monitoramento() {
  const data = [<Esteiras />, <Ativador />, <Tempos />, <Parada />, <Pecas />];

  return (
    <View style={styles.container}>
      <Link href="/entry" asChild>
        <TouchableOpacity style={styles.backButton}>
          <EvilIcons name="arrow-left" size={32} color="#444" />
        </TouchableOpacity>
      </Link>

      <Text style={styles.header}>Monitoramento </Text>

      <Carousel
        loop={false}
        width={width * 0.9}
        height={400}
        data={data}
        scrollAnimationDuration={600}
        renderItem={({ item }) => (
          <View style={styles.card}>{item}</View>
        )}
      />
    </View>
  );
}

function Esteiras() {
  return (
    <View>
      <Text style={styles.title}>Esteiras</Text>
      <Text style={styles.statusGreen}>🟢 Esteira 1: Ligada</Text>
      <Text style={styles.statusRed}>🔴 Esteira 2: Desligada</Text>
    </View>
  );
}

function Ativador() {
  return (
    <View>
      <Text style={styles.title}>Dados da Máquina</Text>
      <Text>• Ativador: Ligado</Text>
      <Text>• Tempo de processo da máquina: 0.0</Text>
      <Text>• Última parada: Est. 1</Text>
      <Text>• Erros: 0</Text>
    </View>
  );
}

function Tempos() {
  return (
    <View>
      <Text style={styles.title}>Tempos de Operação</Text>
      <Text>⏱ Processo: 00:12:45</Text>
      <Text>⏱ Total ligado: 03:21:10</Text>
    </View>
  );
}

function Parada() {
  return (
    <View>
      <Text style={styles.title}>Última Parada</Text>
      <Text>📅 2025-04-10 14:25</Text>
    </View>
  );
}

function Pecas() {
  return (
    <View>
      <Text style={styles.title}>Quantidade de Peças</Text>
      <Text>• Qtd Metal: 120</Text>
      <Text>• Qtd Plásticos: 200</Text>
      <Text>• Qtd Total: 320</Text>
      <Text>• Qtd Rejeitados: 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4DEBE',
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F0F0D8',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statusGreen: {
    color: '#4CAF50',
    marginBottom: 5,
    fontWeight: '500',
  },
  statusRed: {
    color: '#F44336',
    fontWeight: '500',
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
