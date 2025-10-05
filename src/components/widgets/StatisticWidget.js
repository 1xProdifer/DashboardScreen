// StatisticWidget.js
// Displays a statistic card showing a key value, subtitle, and optional trend indicator.
// This widget is designed to be responsive and can adapt its text size for tablets.

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BaseWidget from './BaseWidget';
import {theme} from '../../styles/theme';
import {isTablet} from '../../utils/responsive';

const StatisticWidget = ({
  title,         
  value,        
  subtitle,      
  icon,         
  iconColor,    
  trend,       
  trendValue,   
  onPress,
}) => {
  // Determine if device is a tablet for scaling text
  const isTab = isTablet();

  // Identify trend direction color (green for up, red for down)
  const isPositiveTrend = trend === 'up';
  const trendColor = isPositiveTrend
    ? theme.colors.semantic.success
    : theme.colors.semantic.error;

  return (
    <BaseWidget
      title={title}
      icon={icon}
      iconColor={iconColor}
      onPress={onPress}
      showArrow={!!onPress}> {/* Show arrow only if the card is clickable */}
      
      <View style={styles.statisticContainer}>
        {/* Main Value Display */}
        <Text style={[styles.value, isTab && styles.tabletValue]}>
          {value}
        </Text>

        {/* Optional Subtitle */}
        {subtitle && (
          <Text style={[styles.subtitle, isTab && styles.tabletSubtitle]}>
            {subtitle}
          </Text>
        )}

        {/* Optional Trend Indicator (arrow + value) */}
        {trend && trendValue && (
          <View style={styles.trendContainer}>
            <Icon
              name={trend === 'up' ? 'trending-up' : 'trending-down'}
              size={isTab ? 18 : 16}
              color={trendColor}
              style={styles.trendIcon}
            />
            <Text style={[styles.trendValue, {color: trendColor}]}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>
    </BaseWidget>
  );
};

// Component Styles
const styles = StyleSheet.create({
  statisticContainer: {
    alignItems: 'center', // Center all content inside the widget
  },
  value: {
    fontSize: theme.typography.h1,
    fontWeight: 'bold',
    color: theme.colors.neutral.gray800,
    marginBottom: theme.spacing.xs,
  },
  tabletValue: {
    // Slightly larger font size for tablets
    fontSize: theme.typography.h1 * 1.2,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.neutral.gray600,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  tabletSubtitle: {
    fontSize: theme.typography.body,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: theme.spacing.xs,
  },
  trendValue: {
    fontSize: theme.typography.caption,
    fontWeight: 'bold',
  },
});

export default StatisticWidget;
