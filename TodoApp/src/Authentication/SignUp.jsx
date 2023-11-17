import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
// Firebase
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';



let token= '';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  // Modal pop up message
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const isValidEmail = email => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };


  useEffect(()=> {
    getFcmDeviceToken();
  }, []);
  const getFcmDeviceToken = async ()=>{
    token = await messaging().getToken();
    // console.log(token);
  }


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username field is required';
    }
    if (!email) {
      newErrors.email = 'Email field is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!contact) {
      newErrors.contact = 'Contact field is required';
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = 'Contact must be a 10-digit number';
    }

    if (!address) {
      newErrors.address = 'Address field is required';
    }
    if (!password) {
      newErrors.password = 'password filed is requiered';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        'Password Do not match! Please re-enter the password';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const requestData = {
          username,
          email,
          contact,
          address,
          password,
          token,
          uuid: uuid.v4(),
        };

        console.log(requestData);
        
        const success = firestore()
          .collection('users')
          .add(requestData)
          .then(() => {
            console.log('User added!');
            saveLocalData();
          });

          // store garam fcmToken auta collection and send garne sabbai lai notification
          firestore()
          .collection('FCMtokens')
          .add({
            token: token
          }).then(()=> {
            console.log("fcm token store vayo device ma");
          });


          const saveLocalData = async () => {
            await AsyncStorage.setItem("USERNAME", username);
            await AsyncStorage.setItem("EMAIL", email);

            const storedUsername = await AsyncStorage.getItem("USERNAME");
            const storedEmail = await AsyncStorage.getItem("EMAIL");

            if (storedUsername !== null && storedEmail !== null) {
              // Data is stored in AsyncStorage
              console.log('Data found in AsyncStorage:');
              console.log('Username: ' + storedUsername);
              console.log('Email: ' + storedEmail);
            } else {
              // Data is not stored in AsyncStorage
              console.log('No data found in AsyncStorage.');
            }
          };

        if (success) {
          setModalMessage('User created successfully!');
          setModalVisible(true);
          setTimeout(() => {
            navigation.navigate('Home');
            console.log('Login Successfully');
          }, 4000);
          // console.warn("We will handle the form submission or made an API Request");
        }
      } catch (error) {
        setModalMessage(error.message);
        setModalVisible(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.error('Error creating user:', errorCode, errorMessage);
      }
    }
    // console.log(newErrors);
  };

  return (
    <>
      <View style={signupStyles.container}>
   
        <Image
          source={require('../assets/Image/Signup-logotype-Standard-1.png')}
            style={signupStyles.signUpLogo}
            resizeMode="contain"
        />

        <TextInput
          style={signupStyles.input}
          placeholder="User Name"
          placeholderTextColor="gray"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        {errors.username ? (
          <Text style={signupStyles.error}>{errors.username}</Text>
        ) : null}

        <TextInput
          style={signupStyles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        {errors.email ? (
          <Text style={signupStyles.error}>{errors.email}</Text>
        ) : null}

        <TextInput
          style={signupStyles.input}
          placeholder="Contact"
          placeholderTextColor="gray"
          value={contact}
          onChangeText={text => setContact(text)}
        />
        {errors.contact ? (
          <Text style={signupStyles.error}>{errors.contact}</Text>
        ) : null}

        <TextInput
          style={signupStyles.input}
          placeholderTextColor="gray"
          placeholder="Address"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        {errors.address ? (
          <Text style={signupStyles.error}>{errors.address}</Text>
        ) : null}

        <TextInput
          style={signupStyles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {errors.password ? (
          <Text style={signupStyles.error}>{errors.password}</Text>
        ) : null}

        <TextInput
          style={signupStyles.input}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        {errors.confirmPassword ? (
          <Text style={signupStyles.error}>{errors.confirmPassword}</Text>
        ) : null}

        <TouchableOpacity onPress={handleSignUp} style={signupStyles.signUpBtn}>
          <Text style={signupStyles.txtButtonName}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for success and error messages */}
      <Modal isVisible={modalVisible}>
        <View style={signupStyles.modalContainer}>
          <Text style={signupStyles.modalText}>{modalMessage}</Text>
          <TouchableOpacity
            style={signupStyles.signUpBtn}
            onPress={() => setModalVisible(false)}>
            <Text style={signupStyles.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    color: 'black',
  },
  signUpLogo: {
    width: 200,
    height: 100,
    // backgroundColor:'red'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginBottom: 8,
    color: '#1b1b1b',
  },
  error: {
    color: 'red',
    padding: 3,
    marginTop: -10,
  },
  signUpBtn: {
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  txtButtonName: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

//   Modal Designing
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    color: '#1b1b1b',
  },
  modalClose: {
    fontSize: 16,
    color: 'blue',
    alignSelf: 'center',
    color: '#1b1b1b',
    fontWeight: '500',
  },
});

export default SignUp;
