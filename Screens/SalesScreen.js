import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProgressBar from '../Reuseables/ProgressBar';
import Card from '../Reuseables/Card';
import axios from 'axios';

export default function SalesScreen() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [todaysBalance, setTodaysBalance] = useState(0);

  const fetchSalesData = async () => {
    setLoading(true);
    setError(false);
    try {
      const salesResponse = await axios.get('https://oilgas.pythonanywhere.com/pos/all_sales');
      const balanceResponse = await axios.get('https://oilgas.pythonanywhere.com/pos/all_stats_today');
      
      setSales(salesResponse.data.worker_sales);
      setTodaysBalance(balanceResponse.data.total_money_made);
    } catch (error) {
      console.error(error);
      setError(true);
      Alert.alert('Network Error', 'Failed to load sales data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0047AB" />
      ) : error ? (
        <Button title="Retry" onPress={fetchSalesData} color="#0047AB" />
      ) : (
        <>
          <View style={styles.todaysale2}>
            <Text style={styles.todaysmoney}>Today's Balance</Text>
            <Text style={styles.balance2}>₦{todaysBalance}</Text>
            <ProgressBar progress={70} />
          </View>
          <Text style={styles.text1}>Sales</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {sales.map((sale) => (
              <Card
                key={sale.id}
                date={new Date(sale.date).toLocaleDateString()}
                seller={sale.seller} // Adjust if seller info is available
                customer={sale.customer}
                product={sale.product_name}
                amount={sale.amount_paid}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    paddingTop: 60,
  },
  todaysale2: {
    width: '90%',
    height: 130,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    elevation: 5,
  },
  balance2: {
    fontSize: 42,
    marginLeft: 20,
    color: 'black',
    fontWeight: '900',
  },
  todaysmoney: {
    fontSize: 28,
    color: 'grey',
    marginLeft: 20,
    marginTop: 10,
  },
  text1: {
    fontSize: 28,
    color: "grey",
    marginTop: 15,
    marginLeft: 20,
  },
});
