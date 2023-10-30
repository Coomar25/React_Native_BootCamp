import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const NavBar = ({navigation}) => {


    const navigateToHomeScreen = () => {
        navigation.navigate('FirstHome');
    }

    
  return (
    <View style={styles.navbar}>
        <Button
                title="Home"
                color="black"
                onPress={navigateToHomeScreen}
            /> 
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection:'row',
    margin:80,
    gap:6,
    flex: 1,
    // backgroundColor: 'blue', // Set your desired background color
    height: 60, // Set your desired height
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavBar;
