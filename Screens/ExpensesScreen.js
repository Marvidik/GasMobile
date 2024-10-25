import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import TextField from '../Reuseables/TextField';
import CustomButton from '../Reuseables/CustomButton';
import axios from 'axios';

export default function ExpensesScreen() {
  const [use, setUse] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!use || !amount) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://oilgas.pythonanywhere.com/pos/create-expense/', {
        use, // Field name for expense purpose
        amount: parseFloat(amount), // Ensure amount is a number
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Expense added successfully!');
        setUse('');
        setAmount('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logooo.jpeg')} />
      <Text style={styles.expense}>Add Expenses</Text>

      <TextField 
        placeholder="Use" 
        style={{ alignSelf: 'center', marginTop: 40 }} 
        value={use}
        onChangeText={setUse}
      />
      <TextField 
        placeholder="Amount" 
        style={{ alignSelf: 'center', marginTop: 20 }} 
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0047AB" style={{ marginTop: 40 }} />
      ) : (
        <CustomButton 
          title="Submit" 
          style={{ alignSelf: 'center', width: '80%', marginTop: 40 }} 
          onPress={handleSubmit} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  expense: {
    fontSize: 32,
    color: 'grey',
    alignSelf: 'center',
    marginTop: 20,
  },
});
