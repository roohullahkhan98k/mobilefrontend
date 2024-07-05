import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';

const placeholderImage = { uri: 'https://via.placeholder.com/50' };

const Chat = ({ loggedInUserId }) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to Socket.IO server on port 8001
    socketRef.current = io('http://192.168.0.102:8001');

    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://192.168.0.102:8000/users?userId=${loggedInUserId}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    // Cleanup on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [loggedInUserId]);

  const handleUserPress = (user) => {
    navigation.navigate('Profilechat', { user });
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.userContainer} onPress={() => handleUserPress(item)}>
      <Image source={placeholderImage} style={styles.userImage} />
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={{ uri: 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.webp' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.userList}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make the content transparent
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  userList: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userEmail: {
    fontSize: 16,
    color: 'black',
  },
});

export default Chat;
