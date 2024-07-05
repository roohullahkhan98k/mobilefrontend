import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

// Header Component
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Service Provider Profile</Text>
    </View>
  );
};

// Footer Component
const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Footer Content</Text>
    </View>
  );
};

const ServiceProviderProfile = () => {
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setPhoto(response.assets[0].uri);
        }
      }
    );
  };

  const handleServiceCompletion = () => {
    // Logic to mark the service as completed
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          {/* Profile Picture */}
          <TouchableOpacity onPress={pickImage}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.bioInput}
            placeholder="Enter bio"
            value={bio}
            onChangeText={setBio}
            multiline
          />
          <TouchableOpacity style={styles.doneButton} onPress={handleServiceCompletion}>
            <Text style={styles.doneButtonText}>Mark Service Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Successfully marked as done!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    padding: 10,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoText: {
    color: '#757575',
    fontSize: 16,
  },
  bioInput: {
    width: '100%',
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ServiceProviderProfile;
