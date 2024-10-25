import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Table = ({ products}) => {

  const renderRow = ({ item }) => (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell2}>{item.quantity}</Text>
      <Text style={styles.cell3}>₦{item.price}</Text> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.header}>
      <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Product Name</Text>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Price</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={products}
        renderItem={renderRow}
        keyExtractor={(item) => item.id.toString()} // Ensure ID is a string
        showsVerticalScrollIndicator={false} // Optional: hide vertical scroll indicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  cell2: {
    flex: 1,
    textAlign: 'center',
    color: 'red',
  },
  cell3: {
    flex: 1,
    textAlign: 'center',
    color: 'green',
  },
});

export default Table;
