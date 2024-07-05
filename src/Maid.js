import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Image, Linking, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

// Header Component
const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Society Connect</Text>
    </View>
  );
};

// Footer Component
const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.divider} />
      <Text style={styles.footerText}>Connect with Trusted Service Providers</Text>
    </View>
  );
};

const Maid = ({ navigation }) => {
  const [fadeInOut] = useState(new Animated.Value(0));
  const [serviceProviders, setServiceProviders] = useState([]);
  const profession = "Maid"; // Specify the desired profession

  useEffect(() => {
    Animated.timing(fadeInOut, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    fetchServiceProviders();
  }, []);

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get(`http://192.168.0.104:8000/api/service-providers/${profession}`);
      setServiceProviders(response.data);
    } catch (error) {
      console.error(`Error fetching ${profession} service providers:`, error);
    }
  };

  const handleCallMaid = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleProfilePress = (provider) => {
    // Replace 'DesiredScreen' with the name of the screen you want to navigate to
    navigation.navigate('DesiredScreen', { provider });
  };

  return (
    <ImageBackground source={{ uri: 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Animated.ScrollView contentContainerStyle={styles.contentContainer} style={{ opacity: fadeInOut }}>
          {serviceProviders.map((provider, index) => (
            <View key={index} style={styles.profileContainer}>
              <FontAwesome5 name="user" size={100} color="#000000" style={styles.profileIcon} />
              <Text style={styles.name}>{provider.name}</Text>
              <Text style={styles.number}>{provider.contact}</Text>
              <Text style={styles.info}>{provider.profession}</Text>
              <TouchableOpacity style={styles.callButton} onPress={() => handleCallMaid(provider.contact)}>
                <FontAwesome5 name="phone" size={20} color="#FFFFFF" style={styles.phoneIcon} />
                <Text style={styles.callButtonText}>Call Maid</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewButton} onPress={() => handleProfilePress(provider)}>
                <FontAwesome5 name="info-circle" size={20} color="#FFFFFF" style={styles.viewButtonIcon} />
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.ScrollView>
        <Footer />
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
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
    color: 'white',
    fontWeight: 'bold',
  },
  profileContainer: {
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  profileIcon: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  number: {
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 10,
  },
  callButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  phoneIcon: {
    marginRight: 5,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: 'rgba(46, 204, 113, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  viewButtonIcon: {
    marginRight: 5,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Maid;
