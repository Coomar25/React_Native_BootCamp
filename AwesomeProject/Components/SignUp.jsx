import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal';
import { APP_URL } from "@env"

// firebase
import {auth} from '../ firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";


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

    console.log(auth?.currentUser?.name);

    const isValidEmail = (email) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      };
    const handleSignUp = async () => {
        const newErrors = {};
        if(!username){
            newErrors.username ='Username field is required';
        }
        if(!email){
            newErrors.email = "Email field is required";
        }else if(!isValidEmail(email)){
            newErrors.email = 'Invalid email address'
        }
        if(!contact){
            newErrors.contact = "Contact field is required";
        }else if (!/^\d{10}$/.test(contact)) {
            newErrors.contact = 'Contact must be a 10-digit number';
          }

        if(!address){
            newErrors.address = "Address field is required";
        }
        if(!password){
            newErrors.password = "password filed is requiered";
        }
        if(password !== confirmPassword){
            newErrors.confirmPassword = "Password Do not match! Please re-enter the password";
        }
        setErrors(newErrors);
        if(Object.keys(newErrors).length === 0 ){
            try{
                const success= await createUserWithEmailAndPassword(auth, email, password);
                if(success){
                    setModalMessage('User created successfully!');
                    setModalVisible(true);
                    setTimeout(()=> {
                        navigation.navigate('Home');
                        console.log("Login Successfully");
                    }, 4000);
                    // console.warn("We will handle the form submission or made an API Request");
                }
            }catch(error){
                setModalMessage(error.message);
                setModalVisible(true);
                const errorCode = error.code;
                const errorMessage = error.message;
                newErrors.firebaseError = errorMessage;
                // console.error('Error creating user:', errorCode, errorMessage);
            }
        }
        // console.log(newErrors);
    }

    // const sendSignUpData = () => {
    //     const requestData = {
    //         username,
    //         email,
    //         contact,
    //         address,
    //         password
    //     }
    //     console.log(requestData);

    //     axios.post(`${APP_URL}/api/signup`, requestData).then((response) => {
    //         console.log('API Response:', response.data);
    //     }).catch((error)=> {
    //         console.log(error);
    //     });
    // }


  return (
    <>
        <View style= {signupStyles.container}>
            {/* <Text>Create an Account Here</Text> */}
            <Image 
                style = {signupStyles.signUpLogo}
                source = {{
                    uri: 'https://ir.signupsoftware.com/wp-content/uploads/2021/10/Signup-logotype-Standard-1.png',
                }}
                resizeMode="contain"
                />
            
            <TextInput
                style= {signupStyles.input}
                placeholder='User Name'
                value = {username}
                onChangeText={ (text)=> setUsername(text)}
                />
            
            {errors.username?<Text style= {signupStyles.error}>{errors.username}</Text> : null}

            <TextInput
                style= {signupStyles.input}
                placeholder='Email'
                value = {email}
                onChangeText={ (text)=> setEmail(text)}
                />

            {errors.email ? <Text style= {signupStyles.error}>{errors.email}</Text>: null }

            <TextInput
                style= {signupStyles.input}
                placeholder='Contact'
                value = {contact}
                onChangeText={ (text)=> setContact(text)}
                />
            {errors.contact ? <Text style= {signupStyles.error}>{errors.contact}</Text>: null }
            
            <TextInput
                    style={signupStyles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
            {errors.address ? <Text style= {signupStyles.error}>{errors.address}</Text>: null }

            <TextInput
                    style={signupStyles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            {errors.password ? <Text style= {signupStyles.error}>{errors.password}</Text>: null }

        
            <TextInput
                    style={signupStyles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            {errors.confirmPassword ? <Text style= {signupStyles.error}>{errors.confirmPassword}</Text>: null }

            <TouchableOpacity onPress={handleSignUp} style={signupStyles.signUpBtn}>
                <Text style={signupStyles.txtButtonName}>Sign Up</Text>
            </TouchableOpacity>
            
        </View>

         {/* Modal for success and error messages */}
      <Modal isVisible={modalVisible}>
        <View style={signupStyles.modalContainer}>
          <Text style={signupStyles.modalText}>{modalMessage}</Text>
          <TouchableOpacity style={signupStyles.signUpBtn} onPress={() => setModalVisible(false)}>
            <Text style={signupStyles.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>


        
    </>
  )
}

const signupStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    signUpLogo: {
        width:200,
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
        marginBottom: 8
    },
    error: {
        color: "red",
        padding: 3,
        marginTop: -10
    },
    signUpBtn: {
        width:300,
        height: 50,
        backgroundColor:'orange',
        borderRadius: 20,
        marginTop: 10,
        alignSelf:'center',
        justifyContent: 'center',
        alignContent:'center'
    },
    txtButtonName: {
        alignSelf:'center',
        fontSize: 18,
        fontWeight: '600',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
      },
      modalClose: {
        fontSize: 16,
        color: 'blue',
        alignSelf:'center',
        color:'#1b1b1b',
        fontWeight:'500',
      },
});

export default SignUp