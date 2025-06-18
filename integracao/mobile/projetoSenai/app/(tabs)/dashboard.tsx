import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';
import api from '../../services/api';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 40; // Margem segura

interface Ciclo {
  idCiclo: number;
  idPeca: number;
  idEstacao: number;
  timestampCiclo: string;
  turno: string;
}

export default function DashboardScreen() {
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resposta = await api.get<Ciclo[]>('/Ciclo');
        setCiclos(resposta.data);
      } catch (err) {
        console.error('Erro ao buscar dados da API:', err);
        setErro(true);
      }
    };

    carregarDados();
  }, []);

  const pieData = [
    {
      name: 'Plástico',
      population: ciclos.filter(c => c.idPeca === 1).length,
      color: '#B4DEBE',
      legendFontColor: '#666666',
      legendFontSize: 12,
    },
    {
      name: 'Metal',
      population: ciclos.filter(c => c.idPeca === 2).length,
      color: '#77CCA4',
      legendFontColor: '#666666',
      legendFontSize: 12,
    },
  ];

  const barErroData = {
    labels: ciclos.map(c => `C${c.idCiclo}`),
    datasets: [
      {
        data: ciclos.map(c => Number.isFinite(c.idEstacao) ? c.idEstacao : 0),
      },
    ],
  };

  const lineData = {
    labels: ciclos.map(c => `C${c.idCiclo}`),
    datasets: [
      {
        data: ciclos.map(c => {
          const date = new Date(c.timestampCiclo);
          const segundos = isNaN(date.getTime()) ? 0 : date.getSeconds();
          return Number.isFinite(segundos) ? segundos : 0;
        }),
        strokeWidth: 2,
        color: () => '#77CCA4',
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#F0F0D8',
    backgroundGradientTo: '#F0F0D8',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    labelColor: () => '#666666',
    propsForDots: {
      r: '3',
      strokeWidth: '1',
      stroke: '#fff',
    },
    propsForBackgroundLines: {
      stroke: '#F7FBED',
    },
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Link href="/(tabs)/entry" style={styles.icon}>
        <EvilIcons name="arrow-left" size={50} color="#666" />
      </Link>

      <Text style={styles.header}>Dashboard</Text>

      {erro ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>Erro ao carregar dados da API</Text>
      ) : (
        <>
          {/* PIE CHART */}
          <View style={styles.card}>
            <Text style={styles.title}>Taxa de erro na separação</Text>
            <PieChart
              data={pieData}
              width={chartWidth}
              height={160}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[0, 0]}
              absolute
            />
          </View>

          {/* BAR CHART - ERRO POR CICLO */}
          <View style={styles.card}>
            <Text style={styles.title}>Taxa de Erro por Ciclo</Text>
            <View style={{ overflow: 'hidden' }}>
              <BarChart
                data={barErroData}
                width={chartWidth}
                height={220}
                chartConfig={chartConfig}
                fromZero
                showValuesOnTopOfBars
                yAxisSuffix=""
                yAxisLabel=""
                style={styles.chart}
              />
            </View>
          </View>

          {/* LINE CHART */}
          <View style={styles.card}>
            <Text style={styles.title}>Desempenho Geral da Produção</Text>
            <View style={{ overflow: 'hidden' }}>
              <LineChart
                data={lineData}
                width={chartWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                yAxisSuffix=""
                yAxisLabel=""
                style={styles.chart}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBED',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  card: {
    backgroundColor: '#CAE8CD',
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666666',
  },
  chart: {
    borderRadius: 12,
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
});
