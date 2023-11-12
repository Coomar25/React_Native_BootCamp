import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const isValidEmail = email => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  // For notification
  useEffect(()=> {
    getFcmDeviceToken();
  }, []);
  const getFcmDeviceToken = async ()=>{
    let token = await messaging().getToken();
    // console.log(token);
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
        const snapshot = await firestore()
          .collection('users')
          .where('email', '==', email)
          .get();
        if (snapshot.docs.length > 0) {
          const userData = snapshot.docs[0].data();
          if(userData.email ==email && userData.password == password){
            // store garam hai sabbai user ko data asyncstorage ma 
                storeUserDataInAsyncStorage(userData);
            // =====================================================
            setModalMessage('Login Success');
            setModalVisible(true);
            setTimeout(()=> {
              navigation.navigate('Home');  
            }, 1500);
          }else{
            console.log('Wrong Password');
            setModalMessage("Wrong Password. Please reset your password");
            setModalVisible(true);
          }
        } else {
          setModalMessage(
            'Account does not exist. Please signup and then login.',
          );
          setModalVisible(true);
        }
    } catch (error) {
      console.log(error);
    }
  };


  const storeUserDataInAsyncStorage =async (userData) => {
    try{
        await AsyncStorage.setItem('userDataInAsyncStorage', JSON.stringify(userData));
    }catch(error){
      console.log('Error storing user data in AsyncStorage', error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.LoginButtonWithOpacity}>
        <Text style={styles.LoginBtnText}>Login</Text>
      </TouchableOpacity>

      <Text style={{color: 'black'}}>
        If you don't have an account{' '}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          Create One
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.SignInWithGoogle}
        onPress={() => handleLogin()}>
        <Text style={styles.LoginBtnText}>Sign In With Google</Text>
      </TouchableOpacity>

      <Modal isVisible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderRadius: 20,
    color: '#2b2b2b',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },

  link: {
    marginTop: 20,
    color: '#FF5733',
    fontSize: 18,
    textDecorationLine: 'underline',
  },

  LoginButtonWithOpacity: {
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  LoginBtnText: {
    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontFamily: 'PlaypenSans-ExtraBold',
    letterSpacing: 1,
  },

  SignInWithGoogle: {
    position: 'absolute',
    bottom: 40,
    width: 300,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
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

  modalButton: {
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Login;
