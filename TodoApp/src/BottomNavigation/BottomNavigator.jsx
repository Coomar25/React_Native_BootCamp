import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Welcome from './Screen/Welcome';
import Add from './Screen/Add';
import Search from './Screen/Search';
import Chat from './Screen/Chat';
import Profile from './Screen/Profile';

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
            tabBarIcon: tabInfo => {
              return (
                <Image
                  source={require('../assets/icons/house.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: tabInfo.focused ? '#38EACF' : '#2b2b2b',
                  }}
                />
              );
            },
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#38EACF' : '#2b2b2b',
                    fontSize: 10,
                  }}>
                  Dashboard
                </Text>
              );
            },
          }}
        />

        <TabBottomNavigator.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            tabBarIcon: tabInfo => {
              return (
                <Image
                  source={require('../assets/icons/search_FILL0_wght400_GRAD0_opsz24.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: tabInfo.focused ? '#38EACF' : '#2b2b2b',
                  }}
                />
              );
            },
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#38EACF' : '#2b2b2b',
                    fontSize: 10,
                  }}>
                  Search
                </Text>
              );
            },
          }}
        />

        <TabBottomNavigator.Screen
          name="Add"
          component={Add}
          options={{
            headerShown: false,
            tabBarIcon: tabInfo => {
              return (
                <Image
                  source={require('../assets/icons/more.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: tabInfo.focused ? '#38EACF' : '#2b2b2b',
                  }}
                />
              );
            },
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#38EACF' : '#2b2b2b',
                    fontSize: 10,
                  }}>
                  Add
                </Text>
              );
            },
          }}
        />

        <TabBottomNavigator.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
            tabBarIcon: tabInfo => {
              return (
                <Image
                  source={require('../assets/icons/chat.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: tabInfo.focused ? '#38EACF' : '#2b2b2b',
                  }}
                />
              );
            },
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#38EACF' : '#2b2b2b',
                    fontSize: 10,
                  }}>
                  Chat
                </Text>
              );
            },
          }}
        />

        <TabBottomNavigator.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: tabInfo => {
              return (
                <Image
                  source={require('../assets/icons/user.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: tabInfo.focused ? '#38EACF' : '#2b2b2b',
                  }}
                />
              );
            },
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#38EACF' : '#2b2b2b',
                    fontSize: 10,
                  }}>
                  Profile
                </Text>
              );
            },
          }}
        />
      </TabBottomNavigator.Navigator>
    </>
  );
};

export default BottomNavigator;
