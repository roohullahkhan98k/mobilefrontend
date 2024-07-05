import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { white } from './Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const backgroundImageUrl = 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp'; // Replace with your background image URL
const logoImage = require('./Components/logo.jpeg');

const ServicesScreen = ({ navigation }) => {
  const handleMaidPress = () => {
    navigation.navigate('Maid');
  };
  
  const handlePlumberPress = () => {
    navigation.navigate('Plumber');
  };

  const handleElectricianPress = () => {
    navigation.navigate('Electrician');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back button */}
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={20} color={white} />
          </TouchableOpacity>
          
          {/* Logo and header text */}
          <View style={styles.headerCenter}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.headerText}>Society Connect</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.iconButton, styles.largeButton]} onPress={handleMaidPress}>
              <FontAwesome5 name="user" size={30} color={white} />
              <Text style={styles.iconText}>Maid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.largeButton]} onPress={handlePlumberPress}>
              <FontAwesome5 name="toolbox" size={30} color={white} />
              <Text style={styles.iconText}>Plumber</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.largeButton]} onPress={handleElectricianPress}>
              <FontAwesome5 name="bolt" size={30} color={white} />
              <Text style={styles.iconText}>Electrician</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Connect with Trusted Service Providers</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' as per your choice
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    padding: 10,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: white,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: white,
    marginLeft: 10,
  },
  largeButton: {
    marginBottom: 15,
  },
  footer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: white,
  },
});

export default ServicesScreen;
