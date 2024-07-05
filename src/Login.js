import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Logo from './Components/logo.jpeg';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      // First, check the regular user login
      const userResponse = await axios.post('http://192.168.0.102:8000/login', {
        email,
        password,
      });
  
      // If the user exists, navigate to the user dashboard
      if (userResponse.data === 'user') {
        navigation.navigate('Home');
        return;
      }
  
      // If the user does not exist, check the service provider login
      const serviceProviderResponse = await axios.post('http://192.168.0.102:8000/login', {
        email,
        password,
      });
  
      // If the service provider exists, navigate to the home screen
      if (serviceProviderResponse.data === 'serviceProvider') {
        navigation.navigate('Servicepro');
        return;
      }
  
      // If no user or service provider exists, show appropriate alert
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again or sign up.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  }
  

  return (
    <View style={{ flex: 1, backgroundColor: '#1976D2', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={Logo} style={{ width: 200, height: 200, marginBottom: 40 }} />
      <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Login</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={{ marginBottom: 10, padding: 10, width: 300, backgroundColor: '#f0f0f0', borderRadius: 5 }}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
          style={{ marginBottom: 20, padding: 10, width: 300, backgroundColor: '#f0f0f0', borderRadius: 5 }}
        />
        <TouchableOpacity onPress={submit} style={{ marginBottom: 20, padding: 15, backgroundColor: '#000', borderRadius: 5, alignItems: 'center' }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Signup Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
