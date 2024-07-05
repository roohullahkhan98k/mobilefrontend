import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Logo from './Components/logo.jpeg';

function SignupWorker({ navigation }) {
  const [email, setEmail] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      const response = await axios.post('http://192.168.105.157:8000/register-service-provider', {
        email: email,
        profession: selectedJob,
        contact: contact,
        password: password,
      });

      if (response.data === 'pending') {
        Alert.alert('Signup Request Sent', 'Your signup request has been sent for admin approval.');
        navigation.navigate('Login');
      } else if (response.data === 'exist') {
        Alert.alert('Error', 'User with this email already exists');
      } else {
        Alert.alert('Error', 'Registration failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1976D2' }}>
      <Image source={Logo} style={{ width: 200, height: 200, marginBottom: 40 }} />
      <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Service Provider Signup</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={{ marginBottom: 10, padding: 10, width: 300, backgroundColor: '#f0f0f0', borderRadius: 5 }}
        />
        <View style={{ marginBottom: 10, padding: 10, width: 300, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
          <Picker
            selectedValue={selectedJob}
            onValueChange={(itemValue, itemIndex) => setSelectedJob(itemValue)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Select Profession" value="" />
            <Picker.Item label="Maid" value="Maid" />
            <Picker.Item label="Electrician" value="Electrician" />
            <Picker.Item label="Plumber" value="Plumber" />
          </Picker>
        </View>
        <TextInput
          value={contact}
          onChangeText={(text) => setContact(text)}
          placeholder="Contact Number"
          keyboardType={'numeric'}
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
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Login Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignupWorker;
