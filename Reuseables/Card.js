import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ date, seller, customer, product, amount }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Seller:</Text>
          <Text style={styles.info}>{seller}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Customer:</Text>
          <Text style={styles.info}>{customer}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Product:</Text>
          <Text style={styles.info}>{product}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.amount}>${amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    width:"90%",
    alignSelf:"center"
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
    paddingBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
  cardBody: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Card;
