import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const pieData = [
    {
      name: 'Plásticos',
      population: 61,
      color: '#B4DEBE',
      legendFontColor: '#666666',
      legendFontSize: 12,
    },
    {
      name: 'Metais',
      population: 39,
      color: '#77CCA4',
      legendFontColor: '#666666',
      legendFontSize: 12,
    },
  ];

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [50, 60, 70, 55, 66, 75, 64, 69, 54, 60, 63, 59],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [5, 6, 6.5, 6, 6.8, 6.3, 7],
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
    <ScrollView style={styles.container}>

      <Link href="../../entry" style={styles.icon}>
            <EvilIcons name="arrow-left" size={35} color="#666" />
      </Link>

      <Text style={styles.header}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Taxa de erro na separação</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={160}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          center={[0, 0]}
          absolute
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Materiais Processados</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Desempenho Geral da Produção</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
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
    margin: 10,
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
