import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { black, white } from './Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const backgroundImage = { uri: 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp' };

const Home = (props) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./Components/logo.jpeg')} />
          <Text style={styles.logoText}>Society Connect</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("AgreementScreen")}>
            <Text style={styles.buttonText}>Get Started</Text>
            <FontAwesome5 name="arrow-right" size={20} color={white} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: '15%',
  },
  logo: {
    height: '20%',
    width: '55%',
    tintColor: white,
  },
  logoText: {
    marginTop: '5%',
    color: white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: '10%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default Home;
