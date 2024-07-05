import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

// Import your Society Connect logo image
import Logo from './Components/logo.jpeg';

function Signup() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      const response = await axios.post('http://192.168.164.157:8000/signup', {
        email,
        address,
        password
      });

      if (response.data === 'exist') {
        alert('User already exists');
      } else if (response.data === 'notexist') {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Wrong details');
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1976D2' }}>
       <Image source={Logo} style={{ width: 200, height: 200, marginBottom: 40 }} />
      <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Signup</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={{ marginBottom: 10, padding: 10, width: 300, backgroundColor: '#f0f0f0', borderRadius: 5 }}
        />
        <TextInput
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
          style={{ marginBottom: 10, padding: 10, width: 300, backgroundColor: '#f0f0f0', borderRadius: 5 }}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
          style={{ marginBottom: 10, padding: 10, width: 300, backgroundColor: '#f0f0f0', borderRadius: 5 }}
        />
        <TouchableOpacity onPress={submit} style={{ marginBottom: 10, padding: 15, backgroundColor: '#000', borderRadius: 5, alignItems: 'center' }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignupWorker')}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Signup as Service Provider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Signup;
