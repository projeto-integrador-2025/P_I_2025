import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { theme } from '../../constants/theme';

export default function ErrorRateChart() {
  const size = 160;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const errorRate = 39; // percentage from the image
  const strokeDashoffset = circumference - (errorRate / 100) * circumference;
  
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.chart}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.chart.gray}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.chart.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Center Text */}
        <G>
          <SvgText
            x={size / 2}
            y={size / 2}
            fontSize="24"
            fontWeight="bold"
            fill={theme.colors.text}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {errorRate}%
          </SvgText>
        </G>
      </Svg>
      
      <Text style={styles.title}>Taxa de erro na separação</Text>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: theme.colors.chart.primary }]} />
          <Text style={styles.legendText}>Plásticos</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: theme.colors.chart.secondary }]} />
          <Text style={styles.legendText}>Metais</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  chart: {
    marginVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: '600',
    color: theme.colors.text,
    marginVertical: theme.spacing.md,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
});