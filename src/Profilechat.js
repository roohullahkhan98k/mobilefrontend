import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import io from 'socket.io-client';

const ProfileChat = ({ route }) => {
  const { user } = route.params; // Assuming user info is passed via navigation

  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://192.168.0.102:8001');

    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setSocketConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setSocketConnected(false);
    });

    socketRef.current.on('chat message', (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [message, ...prevMessages]); // Prepend message to maintain order
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (newMessage.trim() === '') {
      return; // Prevent sending empty messages
    }
    const message = {
      id: '_' + Math.random().toString(36).substr(2, 9), // Generate a unique ID for each message
      text: newMessage,
      senderId: user.id, // Assuming user ID is available
      senderName: user.name, // Assuming user name is available
      timestamp: new Date().toLocaleTimeString(),
    };
    socketRef.current.emit('chat message', message);
    setNewMessage('');
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.senderName}: {item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>{socketConnected ? 'Socket connected' : 'Socket disconnected'}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id} // Ensure unique key for each message
        contentContainerStyle={styles.messagesContainer}
        inverted // Display new messages at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  messageContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 20,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileChat;
