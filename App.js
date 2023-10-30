import React from 'react'
import {Button, ScrollView } from 'react-native';
import Home from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from './Components/NavBar';
import Login from './Components/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login Page'>
            <Stack.Screen name='Login Page' component={Login} />
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App