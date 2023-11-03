import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./Screen/Welcome";
import Analytics from "./Screen/Analytics";



const TabBottomNavigator = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <>
            <TabBottomNavigator.Navigator initialRouteName="Dashboard">
                <TabBottomNavigator.Screen
                        name="Dashboard" 
                        component={Welcome} 
                        options={{
                                    headerShown: false,
                                    // tabBarIcon: (tabInfo)=> {
                                    //     return (
                                    //         <Image    
                                    //             source={require('../../assets/icons/icons8-dashboard-50.png')}
                                    //             style={{width: 30, height:30, tintColor: tabInfo.focused?'#38EACF':'#2b2b2b'}}
                                    //         />
                                    //     );
                                    // },
                                    // tabBarLabel: ({focused}) => {
                                    //     return(
                                    //         <Text style={{ color: focused? '#38EACF':'#2b2b2b', fontSize:10 }}>
                                    //              Dashboard
                                    //         </Text>
                                    //     );
                                    // },
                                  
                                }}
                />


                 <TabBottomNavigator.Screen
                            name="Analytics" 
                            component={Analytics} 
                            options={{
                                        headerShown: false,
                                        // tabBarIcon: (tabInfo)=> {
                                        //     return (
                                        //         <Image    
                                        //             source={require('../../assets/icons/icons8-analytics-64.png')}
                                        //             style={{width: 30, height:30, tintColor: tabInfo.focused?'#38EACF':'#2b2b2b'}}
                                        //         />
                                        //     )
                                        // },
                                        // tabBarLabel: ({focused}) => {
                                        //     return(
                                        //         <Text style={{ color: focused? '#38EACF':'#2b2b2b', fontSize:10 }}>
                                        //             Analytics
                                        //         </Text>
                                        //     );
                                        // },
                                    }}
                 />

            </TabBottomNavigator.Navigator>
    </>
  );
};

export default BottomNavigator;
