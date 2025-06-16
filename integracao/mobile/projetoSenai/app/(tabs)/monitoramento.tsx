import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import api from '../../services/api';  // Caminho pro seu service

const { width } = Dimensions.get('window');

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

  const slides = [
    <Esteiras dados={dados} />,
    <Ativador dados={dados} />,
    <Tempos dados={dados} />,
    <Parada dados={dados} />,
    <Pecas dados={dados} />,
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href="/entry" asChild>
        <TouchableOpacity style={styles.backButton}>
          <EvilIcons name="arrow-left" size={32} color="#444" />
        </TouchableOpacity>
      </Link>

      <Text style={styles.header}>Monitoramento</Text>

      {erro ? (
        <Text style={styles.error}>{erro}</Text>
      ) : (
        <Carousel
          loop={false}
          width={width * 0.9}
          height={400}
          data={slides}
          scrollAnimationDuration={600}
          renderItem={({ item }) => <View style={styles.card}>{item}</View>}
        />
      )}
    </View>
  );
}

function Esteiras({ dados }: { dados: any[] }) {
  return (
    <View>
      <Text style={styles.title}>Esteiras</Text>
      {dados.map((item, index) => (
        <Text key={index}>
          Esteira {item.id}: {item.resultado}
        </Text>
      ))}
    </View>
  );
}

function Ativador({ dados }: { dados: any[] }) {
  return (
    <View>
      <Text style={styles.title}>Dados da Máquina</Text>
      <Text>• Total de Ciclos: {dados.length}</Text>
    </View>
  );
}

function Tempos({ dados }: { dados: any[] }) {
  return (
    <View>
      <Text style={styles.title}>Tempos de Operação</Text>
      {dados.map((item, index) => (
        <Text key={index}>Data: {item.data}</Text>
      ))}
    </View>
  );
}

function Parada({ dados }: { dados: any[] }) {
  return (
    <View>
      <Text style={styles.title}>Última Parada</Text>
      <Text>{dados[dados.length - 1]?.data}</Text>
    </View>
  );
}

function Pecas({ dados }: { dados: any[] }) {
  return (
    <View>
      <Text style={styles.title}>Quantidade de Peças</Text>
      <Text>Peças Processadas: {dados.length}</Text>
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
