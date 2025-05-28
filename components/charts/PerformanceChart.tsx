import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { theme } from '../../constants/theme';

export default function MaterialsChart() {
  const data = {
    labels: theme.months.slice(0, 6),
    datasets: [
      {
        data: [50, 65, 53, 48, 70, 55],
      },
    ],
  };
  
  const chartConfig = {
    backgroundGradientFrom: theme.colors.cardBackground,
    backgroundGradientTo: theme.colors.cardBackground,
    decimalPlaces: 0,
    color: () => theme.colors.chart.primary,
    labelColor: () => theme.colors.textSecondary,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 10,
    },
    barPercentage: 0.7,
  };
  
  const screenWidth = Dimensions.get('window').width > 500 
    ? 500 
    : Dimensions.get('window').width - 70;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Materiais Processados</Text>
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>•••</Text>
        </View>
      </View>
      
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        showValuesOnTopOfBars
        fromZero
        withInnerLines={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: '600',
    color: theme.colors.text,
  },
  iconPlaceholder: {
    padding: theme.spacing.xs,
  },
  iconText: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.textSecondary,
  },
  chart: {
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
});