import { View, Text, StyleSheet, Image, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import TextField from '../Reuseables/TextField';
import CustomButton from '../Reuseables/CustomButton';
import axios from 'axios';

export default function ProductScreen() {
  const [productId, setProductId] = useState(''); // Optional ID field
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!productName || !quantity || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      // If productId is provided, update the product; otherwise, create a new one
      if (productId) {
        const response = await axios.put(`https://oilgas.pythonanywhere.com/pos/products/${productId}/`, {
          name: productName,
          quantity: parseInt(quantity),  // Ensure quantity is a number
          price: parseFloat(price),      // Ensure price is a number
        });

        if (response.status === 200) {
          Alert.alert('Success', 'Product updated successfully!');
        }
      } else {
        const response = await axios.post('https://oilgas.pythonanywhere.com/pos/create-product/', {
          name: productName,
          quantity: parseInt(quantity),  // Ensure quantity is a number
          price: parseFloat(price),      // Ensure price is a number
        });

        if (response.status === 201) {
          Alert.alert('Success', 'Product added successfully!');
        }
      }

      // Clear the form after successful submission
      setProductId('');
      setProductName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      Alert.alert('Error', 'Failed to process the request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      keyboardVerticalOffset={80} // Adjust this offset as necessary
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image style={styles.image} source={require('../assets/logooo.jpeg')} />
        <Text style={styles.expense}>Add/Update Product</Text>

        <TextField 
          placeholder="Product ID (optional)" 
          style={{ alignSelf: 'center', marginTop: 20 }} 
          value={productId}
          onChangeText={setProductId}
          keyboardType="numeric"
        />
        <TextField 
          placeholder="Product Name" 
          style={{ alignSelf: 'center', marginTop: 20 }} 
          value={productName}
          onChangeText={setProductName}
        />
        <TextField 
          placeholder="Quantity" 
          style={{ alignSelf: 'center', marginTop: 20 }} 
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TextField 
          placeholder="Price" 
          style={{ alignSelf: 'center', marginTop: 20 }} 
          value={price}
          onChangeText={setPrice}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 40, // Add bottom padding for better spacing
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
