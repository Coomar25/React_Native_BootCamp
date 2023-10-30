import React, { isValidElement, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, ScrollView, Button, StyleSheet } from 'react-native';

const Login = ({navigation}) => {

  const [ error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  const handleLogin = () => {    
    if (email && password) {
      console.log('Logging in with email:', email, 'and password:', password);
      console.log(process.env.APP_URL);
      navigation.navigate('Home');
    } else {
      console.log('Please enter valid email and password');
      setError('Please Enter vallid email address and password');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error? <Text style={styles.error}>{error}</Text>: null}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Text>  
        If you don't have an account {' '}
        <Text
          style={styles.link}
          onPress={()=> {navigation.navigate('SignUp')}}
        >
          Create One
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
    borderRadius:20
  },
  error: {
    color: 'red',
    marginBottom:10
  },
  buttonContainer: {
    color: 'red',
    width: '80%',
    borderRadius: 50
  }, 

  link : {
    marginTop: 20,
  color: '#FF5733',
  fontSize: 18,
  textDecorationLine: 'underline'
  }

});

export default Login;
