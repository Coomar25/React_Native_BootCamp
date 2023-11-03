/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// for firebase messaging
import messaging from '@react-native-firebase/messaging';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
// app close na huda ko situation ma handler
messaging().getInitialNotification(
    async remoteMessage => {
        console.log('Message handled in the kill state!', remoteMessage);
    }
);


AppRegistry.registerComponent(appName, () => App);
