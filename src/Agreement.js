import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { black, white } from './Constants';

const backgroundImage = { uri: 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp' };

const Home = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  const agreementText = `
    By tapping the arrow below, you agree to Society Connect's Terms of Use and acknowledge that you have read the Privacy Policy

    Check the box to indicate that you are at least 18 years of age, agree to the Terms & Conditions, and acknowledge the Privacy Policy.
  `;

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Image style={styles.logo} source={require('./Components/logo.jpeg')} /> */}
        <Text style={styles.title}>Society Connect</Text>
        <Text style={styles.heading}>Terms and Conditions</Text>
        <Text style={styles.agreementText}>{agreementText}</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={[styles.checkbox, isChecked && styles.checked]} onPress={handleCheckboxPress}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>I agree to the Terms & Conditions</Text>
        </View>
        <TouchableOpacity style={[styles.button, !isChecked && styles.disabledButton]} onPress={() => props.navigation.navigate("Mainpage")} disabled={!isChecked}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    tintColor: white,
  },
  title: {
    color: white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: white,
  },
  agreementText: {
    fontSize: 16,
    color: white,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 12,
  },
  checked: {
    backgroundColor: black,
  },
  checkmark: {
    color: white,
    fontSize: 16,
  },
  checkboxText: {
    fontSize: 16,
    color: white,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
