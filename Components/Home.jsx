import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, ScrollView } from 'react-native';
import { HomePageStyle } from '../resources/styles.js';
import { StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style = {HomePageStyle.container}>
        <View style={HomePageStyle.card}>
          {/* <StatusBar style="auto" /> */}
            <Image
            style={HomePageStyle.cardImage}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4599/4599706.png',
              }}
            />
            
            <View style={HomePageStyle.cardContent}>
                <Text style={HomePageStyle.textWithFont}>Total Sales</Text>
                <Text style={HomePageStyle.textWithFont}>Litre: 30000 ltr</Text>
            </View>
        </View>

        <View style={HomePageStyle.card}>
          {/* <StatusBar style="auto" /> */}
          <Image
            style={HomePageStyle.cardImage}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4599/4599706.png',
              }}
            />

            <View style={HomePageStyle.cardContent}>
                <Text style={HomePageStyle.textWithFont}>Income From Dairy</Text>
                <Text style={HomePageStyle.textWithFont}>Nrs. 30000</Text>
            </View>
        </View>

        <View style={HomePageStyle.card}>
          {/* <StatusBar style="auto" /> */}
          <Image
            style={HomePageStyle.cardImage}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4599/4599706.png',
              }}
            />

            <View style={HomePageStyle.cardContent}>
                <Text style={HomePageStyle.textWithFont}>Total Expenditure</Text>
                <Text style={HomePageStyle.textWithFont}>Nrs. 30000</Text>
            </View>
        </View>


        <View style={HomePageStyle.card}>
          {/* <StatusBar style="auto" /> */}
          <Image
            style={HomePageStyle.cardImage}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4599/4599706.png',
              }}
            />

            <View style={HomePageStyle.cardContent}>
                <Text style={HomePageStyle.textWithFont}>Total Earning From Dairy</Text>
                <Text style={HomePageStyle.textWithFont}>Nrs. 30000</Text>
            </View>
        </View>
        
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