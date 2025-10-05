// ResponsiveGrid.js
// A reusable grid layout component that adjusts automatically
// based on device size and orientation using responsive utilities.

import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  getGridColumns,
  listenForOrientationChange,
  getAdaptivePadding,
  isTablet,
} from '../utils/responsive';
import {theme} from '../styles/theme';

const ResponsiveGrid = ({
  data = [],             // Array of data items to display in the grid
  renderItem,            // Function that returns the UI for each item
  numColumns,           
  spacing = theme.spacing.sm,  // Spacing between items
  contentContainerStyle, // Additional styles for outer container
}) => {
  // State to store current column count (responsive)
  const [columns, setColumns] = useState(numColumns || getGridColumns());

  useEffect(() => {
    // Listen for orientation or screen size changes
    const subscription = listenForOrientationChange(() => {
      // Update column count when screen orientation changes
      setColumns(numColumns || getGridColumns());
    });

    // Clean up event listener when component unmounts
    return () => subscription?.remove();
  }, [numColumns]);

  // Renders a single row of grid items
  const renderRow = (rowData, rowIndex) => {
    return (
      <View key={rowIndex} style={[styles.row, {marginHorizontal: -spacing / 2}]}>
        {rowData.map((item, itemIndex) => {
          if (!item) {
            // Empty placeholder to keep layout consistent for incomplete rows
            return <View key={itemIndex} style={[styles.item, {flex: 1}]} />;
          }
          return (
            <View
              key={item.id || itemIndex}
              style={[
                styles.item,
                {
                  flex: 1,
                  marginHorizontal: spacing / 2,
                  marginBottom: spacing,
                },
              ]}>
              {renderItem(item, itemIndex)}
            </View>
          );
        })}
      </View>
    );
  };

  // Groups the data into rows based on number of columns
  const groupedData = [];
  for (let i = 0; i < data.length; i += columns) {
    const row = data.slice(i, i + columns);
    // If the last row is incomplete, fill remaining spots with null
    while (row.length < columns) {
      row.push(null);
    }
    groupedData.push(row);
  }

  return (
    <View style={[styles.container, contentContainerStyle]}>
      {groupedData.map((rowData, rowIndex) => renderRow(rowData, rowIndex))}
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  container: {
    // Adds adaptive horizontal padding depending on device type
    paddingHorizontal: getAdaptivePadding(),
  },
  row: {
    flexDirection: 'row',          // Aligns items horizontally
    justifyContent: 'space-between', // Even spacing between items
  },
  item: {
    // Base placeholder style for each grid item
  },
});

export default ResponsiveGrid;
