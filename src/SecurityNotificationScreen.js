import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native';
import { black, blue, white } from './Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 for back and check icons
import axios from 'axios';

const logoImage = require('./Components/logo.jpeg');

const SecurityNotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [fadeInOut] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://192.168.164.157:8000/api/notifications');
        setNotifications(response.data);
        // Fade in animation for notifications
        Animated.timing(fadeInOut, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Mainpage'); // Navigate back to the main page
  };

  const handleCheckedPress = () => {
    navigation.navigate('Mainpage'); // Navigate back to the main page
  };

  return (
    <ImageBackground source={{ uri: 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <FontAwesome5 name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.headerText}>Society Connect</Text>
          </View>
        </View>

        {/* Body */}
        <Animated.View style={[styles.body, { opacity: fadeInOut }]}>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationBox}>
              <Text style={styles.notificationText}>{notification.message}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.checkedButton} onPress={handleCheckedPress}>
            <FontAwesome5 name="check" size={20} color="black" style={styles.checkIcon} />
            <Text style={styles.checkedButtonText}>Checked</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.divider} />
          <Text style={styles.footerText}></Text>
          <Text style={styles.creditItem}></Text>
          <Text style={styles.creditItem}></Text>
          <Text style={styles.creditItem}></Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: white,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: black,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBox: {
    padding: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkedButton: {
    backgroundColor: 'transparent', // Make button transparent
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkIcon: {
    marginRight: 5,
  },
  checkedButtonText: {
    color: 'black',
    fontWeight: 'bold',
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
    color: 'black',
    fontWeight: 'bold',
  },
  creditItem: {
    marginBottom: 3,
  },
});

export default SecurityNotificationScreen;
