import { StyleSheet } from "react-native";


export const HomePageStyle = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#F5F5F5',
      // marginTop: 50,
      // alignItems: 'center',
      // justifyContent: 'center',
    },

    card: {
      backgroundColor: 'grey',
      borderRadius: 40,
      flexDirection:"row",
      padding:20,
      borderRadius: 20,
      margin: 15,  
      gap:30    
    },

    cardImage: {
      height: 100,
      width: 100, 
    },

    cardContent: {
      flex: 1,
      justifyContent:'center',
      gap:14,
      backgroundColor:'#1b1b1b',
      width:100,
      height: 100,
      padding: 10,
      borderRadius: 12
    },

    textWithFont: {
      fontFamily: 'PlaypenSans-Light',
      fontSize: 17,
      color: 'white',
    },

    textinputstyles: {
      margin:30,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
    },
  });