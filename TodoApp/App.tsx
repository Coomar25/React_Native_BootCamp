import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from './src/xomponent/Splash';
import Home from './src/xomponent/Home';
import Login from './src/Authentication/Login';
import SignUp from './src/Authentication/SignUp';

import { DefaultTheme } from '@react-navigation/native';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'grey', 
  },
};



const Stack = createNativeStackNavigator();
const App = () => {
  return (
      <NavigationContainer theme={customTheme}>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen name='Splash' component={Splash} options={{headerShown: false }} />
          <Stack.Screen name='Home' component={Home} options={{headerShown: true }} />
          <Stack.Screen name='Login' component={Login} options={{headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App