import React, { useEffect } from 'react'
import Home from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import SignUp from './Components/SignUp';


import { loadCustomFonts } from './LoadCustomFonts';
import Splash from './Components/Splash';


const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Load custom fonts when the component mounts
    loadCustomFonts();
  }, []);
  return (
    <>
            <NavigationContainer>
              <Stack.Navigator initialRouteName='Splash'>
                  <Stack.Screen name='Splash' component={Splash} options={{headerShown: false }} />
                  <Stack.Screen name='Login Page' component={Login} />
                  <Stack.Screen name='Home' component={Home} />
                  <Stack.Screen name='SignUp' component={SignUp} />
              </Stack.Navigator>
            </NavigationContainer>
    </>
   
  )
}

export default App