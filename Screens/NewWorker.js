import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import TextField from '../Reuseables/TextField';
import CustomButton from '../Reuseables/CustomButton';
import axios from 'axios';

export default function NewWorker() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both username and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://oilgas.pythonanywhere.com/user/register', {
        username,
        password,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Worker added successfully!');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add worker. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logooo.jpeg')} />
      
      <TextField 
        placeholder="Username" 
        style={{ alignSelf: 'center', marginTop: 60 }} 
        value={username}
        onChangeText={setUsername}
      />
      <TextField 
        placeholder="Password" 
        style={{ alignSelf: 'center', marginTop: 20 }} 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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
});
