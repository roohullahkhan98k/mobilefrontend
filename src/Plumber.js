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

// Plumber Profile Component
const PlumberProfile = ({ name, number, info }) => {
  const handleCallPlumber = () => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.profileContainer}>
      <FontAwesome5 name="user" size={100} color="#000000" style={styles.profileIcon} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.info}>{info}</Text>
      <TouchableOpacity style={styles.callButton} onPress={handleCallPlumber}>
        <FontAwesome5 name="phone" size={20} color="#FFFFFF" style={styles.phoneIcon} />
        <Text style={styles.callButtonText}>Call Plumber</Text>
      </TouchableOpacity>
    </View>
  );
};

const Plumber = ({ navigation }) => {
  const [fadeInOut] = useState(new Animated.Value(0));
  const [plumberProfiles, setPlumberProfiles] = useState([]);
  const profession = "Plumber";

  useEffect(() => {
    Animated.timing(fadeInOut, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    fetchPlumberProfiles();
  }, []);

  const fetchPlumberProfiles = async () => {
    try {
      const response = await axios.get(`http://192.168.164.157:8000/api/service-providers/${profession}`);
      setPlumberProfiles(response.data);
    } catch (error) {
      console.error(`Error fetching ${profession} service providers:`, error);
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Animated.ScrollView contentContainerStyle={styles.contentContainer} style={{ opacity: fadeInOut }}>
          {plumberProfiles.map((profile, index) => (
            <PlumberProfile key={index} name={profile.name} number={profile.contact} info={profile.profession} />
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
});

export default Plumber;
