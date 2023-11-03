import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);
  }, []);

  return (
    <View style={styles.AppLogo}>
        <Image    
            // source={require('../../assets/icons/icons8-dashboard-50.png')}
            source={{
                uri: 'https://images.squarespace-cdn.com/content/v1/57b5ef68c534a5cc06edc769/1508951082864-9MM1AT83BVZTGWNLHD8U/calm+circle+logo.png', 
              }}
            style={{width: 350, height:350}}
        />

        <Text style={styles.AppName}>
            Lets code for native
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    AppLogo: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AppName: {
        margin:2,
        textAlign:'center',
        fontSize:25,
        // fontFamily: 'PlaypenSans-Light',
    }

});

export default Splash;


