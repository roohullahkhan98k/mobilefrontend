import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Animated, Easing } from 'react-native';
import { black, white } from './Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Btn from './Button';

// Assume you have a logo image imported or require it from a file
const logoImage = require('./Components/logo.jpeg');

const Mainpage = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleServicesPress = () => {
    navigation.navigate('Services');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('SecurityNotificationScreen');
  };

  const handleChatPress = () => {
    navigation.navigate('Chat');
  };

  const handleLogoutPress = () => {
    navigation.navigate('Login');
  };

  const handleBackPress = () => {
    navigation.navigate('AgreementScreen');
  };

  // Animated menu button
  const rotateValue = new Animated.Value(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(rotateValue, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <ImageBackground source={{ uri: 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back button */}
          <TouchableOpacity onPress={() => navigation.navigate('AgreementScreen')} style={styles.backButton}>
  <FontAwesome5 name="arrow-left" size={20} color={white} />
</TouchableOpacity>

          {/* Logo and header text */}
          <View style={styles.headerCenter}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.headerText}>Society Connect</Text>
          </View>
          {/* Animated Menu Button */}
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Animated.View style={[styles.menuIcon, { transform: [{ rotate: rotateInterpolate }] }]} />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.buttonContainer}>
            {/* Services Button with Services Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={handleServicesPress}>
              <FontAwesome5 name="wrench" size={30} color={white} />
              <Text style={styles.iconText}>Services</Text>
            </TouchableOpacity>
            {/* Security Notifications Button with Security Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={handleNotificationsPress}>
              <FontAwesome5 name="shield-alt" size={30} color={white} />
              <Text style={styles.iconText}>Security Notifications</Text>
            </TouchableOpacity>
            {/* Chat Button with Chat Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={handleChatPress}>
              <FontAwesome5 name="comments" size={30} color={white} />
              <Text style={styles.iconText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.divider} />
          <Text style={styles.footerText}></Text>
        </View>

        {/* Menu Content */}
        {isMenuOpen && (
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.profileButton}>
              <FontAwesome5 name="user" size={24} color={black} />
              <Text style={styles.profileText}>Welcome Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
              <FontAwesome5 name="sign-out-alt" size={24} color={black} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 24,
    height: 2,
    backgroundColor: white,
    transform: [{ rotate: '0deg' }],
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: white,
    fontWeight: 'bold',
  },
  menuContent: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: white,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Mainpage;
