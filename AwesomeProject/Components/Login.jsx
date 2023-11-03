import React, { isValidElement, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../ firebaseConfig";
import { auth } from "../ firebaseConfig";


const Login = ({ navigation }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const isValidEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  const handleLogin = () => {
    if (email && password) {
  
      navigation.navigate("Home");
      console.log("Logging in with email:", email, "and password:", password);
      console.log(process.env.APP_URL);
      // navigation.navigate("Home");
    } else {
      console.log("Please enter valid email and password");
      setError("Please Enter vallid email address and password");
    }
  };

  const signInWithGoogle= async () => {
      try{
        const googleSignIn = await signInWithPopup(auth, googleProvider);
        if(googleSignIn){
          console.log('sign in successfully');
          navigation.navigate('Home');
        }
      }catch(error){
        console.warn(error);
      }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={{
          uri: "https://reactnative.dev/docs/assets/p_cat2.png",
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
      {error ? <Text style={styles.error}>{error}</Text> : null}


        <TouchableOpacity
          onPress={handleLogin}
          style={styles.LoginButtonWithOpacity}
        >
          <Text style={styles.LoginBtnText}>Login</Text>
        </TouchableOpacity>


      <Text>
        If you don't have an account{" "}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          Create One
        </Text>
      </Text>


        <TouchableOpacity
          onPress={signInWithGoogle}
          style={styles.LoginButtonWithOpacity}
        >
          <Text style={styles.LoginBtnText}>Sign In With Google</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderRadius: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },


  link: {
    marginTop: 20,
    color: "#FF5733",
    fontSize: 18,
    textDecorationLine: "underline",
  },

  LoginButtonWithOpacity: {
    width: 300,
    height: 50,
    backgroundColor: "orange",
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  LoginBtnText: {
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "600",
    fontFamily: "PlaypenSans-ExtraBold",
    letterSpacing: 1,
  },
});

export default Login;
