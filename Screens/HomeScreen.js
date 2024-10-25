import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Alert, Modal, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../Reuseables/CustomButton';
import ProgressBar from '../Reuseables/ProgressBar';
import Table from '../Reuseables/Table';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [totalSales, setTotalSales] = useState(0);
  const [todaysBalance, setTodaysBalance] = useState(0);
  const [expenseBalance, setTodaysExpense] = useState(0);
  const [allproducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(false); // State for error handling
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Start loading
    setError(false); // Reset error state
    try {
      const [statsTodayResponse, statsResponse, expenseResponse, productResponse] = await Promise.all([
        axios.get('https://oilgas.pythonanywhere.com/pos/all_stats_today'),
        axios.get('https://oilgas.pythonanywhere.com/pos/all_stats'),
        axios.get('https://oilgas.pythonanywhere.com/pos/total_expenses'),
        axios.get('https://oilgas.pythonanywhere.com/pos/other_products'),
      ]);
      
      setTodaysBalance(statsTodayResponse.data.total_money_made);
      setTotalSales(statsResponse.data.total_money_made);
      setTodaysExpense(expenseResponse.data.total_expenses);
      setProducts(productResponse.data);
      
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to fetch data", "Unable to retrieve information. Please try again.");
      setError(true); // Set error state to true if there is an error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up the interval to reload data every 2.5 minutes
    const interval = setInterval(() => {
      fetchData();
    }, 150000); // 150000 milliseconds = 2.5 minutes

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchData(); // Function to refresh data
  };

  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.welcome}>
        <Text style={styles.welcometext}>Welcome Sir,</Text>
      </View>

      <View style={styles.todaysale}>
        <Text style={styles.todaysmoney}>Total Sales</Text>
        <Text style={styles.balance}>₦{totalSales}</Text>
        <View style={styles.rowbut}>
          <CustomButton title="View Details" style={{ width: '45%' }} onPress={() => navigation.navigate('Sales')} />
          <CustomButton title="Add Expense" style={{ width: '45%', backgroundColor: 'white' }} textStyle={{ color: '#0047AB' }} onPress={() => navigation.navigate('Expenses')} />
        </View>
      </View>

      <View style={styles.todaysale2}>
        <Text style={styles.todaysmoney}>Today's Balance</Text>
        <Text style={styles.balance2}>₦{todaysBalance}</Text>
        <ProgressBar progress={70} />
      </View>

      <View style={styles.monthly}>
        <Text style={styles.ana}>Your General Analysis</Text>
        <View style={styles.rowbut}>
          <View style={styles.bar}>
            <Text style={styles.todaysmoney1}>Sales</Text>
            <Text style={styles.balance3}>₦{totalSales}</Text>
            <Image style={styles.image} source={require('../assets/upward.jpeg')} />
          </View>

          <View style={styles.bar}>
            <Text style={styles.todaysmoney1}>Expenses</Text>
            <Text style={styles.balance3}>₦{expenseBalance}</Text>
            <Image style={styles.image} source={require('../assets/downward.jpeg')} />
          </View>
        </View>
      </View>

      {/* Table for Product Information */}
      <Table products={allproducts} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  welcome: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
  },
  welcometext: {
    marginTop: 64,
    fontSize: 28,
    marginLeft: 30,
    fontWeight: '600',
  },
  todaysale: {
    width: '90%',
    height: 190,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    elevation: 5,
  },
  todaysmoney: {
    fontSize: 28,
    color: 'grey',
    marginLeft: 20,
    marginTop: 10,
  },
  balance: {
    fontSize: 42,
    marginLeft: 20,
    marginTop: 10,
    color: 'black',
    fontWeight: '900',
  },
  rowbut: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
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
  monthly: {
    marginTop: 10,
  },
  ana: {
    fontSize: 22,
    marginLeft: 20,
  },
  bar: {
    backgroundColor: 'white',
    elevation: 5,
    width: '45%',
  },
  image: {
    width: '100%',
    height: 80,
  },
  balance3: {
    fontSize: 22,
    marginLeft: 20,
    color: 'black',
    fontWeight: '900',
  },
  todaysmoney1: {
    fontSize: 18,
    color: 'grey',
    marginLeft: 20,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
