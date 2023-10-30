import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, ScrollView } from 'react-native';
import { CommonStyles } from '../resources/styles.js';
import { StyleSheet } from 'react-native';

const Home = () => {
  return (
        <View style={CommonStyles.container}>
          <StatusBar style="auto" />
          <Image
              source={{
                uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
              }}
              style={{width: 200, height: 200}}
            />
               <TextInput
                        style={CommonStyles.textinputstyles}
                        defaultValue="You can type in me"
                />

                <Image 
                source={require('../images/jawBeauty.png')}
                style={styles.girlImage} />
        </View>
  )
}


const styles = StyleSheet.create({
  girlImage: {
    width: 200,
    height:200,
    borderRadius: 250
  }
})

export default Home