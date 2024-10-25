import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.halfwayMark} />
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 5,
    width: '80%',
    backgroundColor: '#e0e0e0', // Background of the bar
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden', // Ensures progress stays inside the container
    marginLeft:20
  },
  halfwayMark: {
    height: '100%',
    width: 2, // Thickness of the halfway mark
    backgroundColor: '#ff0000', // Color of the halfway mark
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -1 }], // Center the halfway mark
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50', // Progress bar color
    borderRadius: 10,
  },
});

export default ProgressBar;
