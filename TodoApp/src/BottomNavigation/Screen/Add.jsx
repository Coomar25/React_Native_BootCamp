import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

let token = '';
let AuthUserCredentials = '';
let email = '';
const Add = () => {
  const [imageUri, setImageUri] = useState('');
  const [fetchImageUrl, setfetchImageUrl] = useState('');
  const [userCaption, setuserCaption] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(false);

  useEffect(() => {
    getFcmDeviceToken();
    // checkAsyncStorageData();
  }, []);


  

  const checkAsyncStorageData = async () => {
    const storedUsername = await AsyncStorage.getItem('USERNAME');
    const storedEmail = await AsyncStorage.getItem('EMAIL');

    if (storedUsername !== null && storedEmail !== null) {
      // Data is stored in AsyncStorage
      console.log('Data found in AsyncStorage:');
      console.log('Username: ' + storedUsername);
      console.log('Email: ' + storedEmail);
    } else {
      // Data is not stored in AsyncStorage
      console.log('No data found in AsyncStorage.');
    }
  };

  const getFcmDeviceToken = async () => {
    token = await messaging().getToken();
    authUser = await AsyncStorage.getItem('userDataInAsyncStorage');
    AuthUserCredentials = JSON.parse(authUser);
    console.log(token);
  };

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (!result.didCancel) {
      setImageUri(result);
    }
  };

  const selectImageFromDevice = async () => {
    setImageUri(null);
    const uploadFromDevice = await launchImageLibrary({mediaType: 'photo'});
    setImageUri(uploadFromDevice);
    // console.log(imageUri);
  };

  const uploadImage = async () => {

    try {
      if (imageUri && userCaption) {
        setIsLoading(true);
        setIsUploadButtonDisabled(true);4
        const reference = storage().ref(imageUri.assets[0].fileName);
        const pathToFile = imageUri.assets[0].uri;
        // console.log(pathToFile);

        try {
          const uploadToFirebase = await reference.putFile(pathToFile);
          if (uploadToFirebase) {
            console.log('Image uploaded successfully.');
            const imageurlFromFireBase = await storage()
              .ref(imageUri.assets[0].fileName)
              .getDownloadURL();
              setfetchImageUrl(imageurlFromFireBase);

            console.log(fetchImageUrl);
            const requestData = {
              username: AuthUserCredentials.username,
              email: AuthUserCredentials.email,
              image: imageurlFromFireBase,
              caption: userCaption,
            };
            console.log(requestData);
            const success = firestore()
              .collection('posts')
              .add(requestData)
              .then(() => {
                console.log('post added successfully!');
                Alert.alert('Success', 'Post added successfully!', [
                  {text: 'OK'},
                ]);
                uploadVayaseTokenFetchGarneResponseMaCallGarera();
                setIsLoading(false);
                setIsUploadButtonDisabled(false);
              });
            if (success) {
              setuserCaption(null);
              setImageUri(null);
            }
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        console.log('Missing Credentials!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePhoto = () => {
    if (imageUri && imageUri.assets && imageUri.assets[0]) {
      setImageUri(null);
    } else {
      console.warn('Image does not exist');
    }
  };


  const uploadVayaseTokenFetchGarneResponseMaCallGarera = () => {
    let sabbaiFCMtokenStoreGarekoTempVariableMa = [];
    firestore()
    .collection('FCMtokens')
    .get()
    .then(querySnapshot => {
      console.log('Total Posts: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.data());
        sabbaiFCMtokenStoreGarekoTempVariableMa.push(documentSnapshot.data());
      });
      aavaNotificationSendGarne(sabbaiFCMtokenStoreGarekoTempVariableMa);
    });

  }

  const aavaNotificationSendGarne = async (token) => {
        var axios = require('axios');
        var data = JSON.stringify({
        data: {},
        notification: {
        body: 'click to open check Post',
        title: 'New Post Added',
        },
        to: token,
        });
        var config = {
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
        Authorization:
        'key=AAAAHs1MzE4:APA91bG9YnFDNCFlYbbmRGStmHNkhwIPEsGRxN_LR_SmaxXRttk3B1OB8Qoe2_ZI-jMme2TD846pOg8HUoJaNawF0Q-n2ibASljimpGUZ0ekX20grm_7XOpTNkq8eY6ls3-Aa9EozscZ',
        'Content-Type': 'application/json',
        },
        data: data,
        };
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
  }



  return (
    <>
      {isLoading ? (
        <View style={addComponent.loadingScreen}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>{/* Your content */}</View>
      )}

      <ScrollView style={addComponent.coreContainer}>
        <View style={addComponent.topBarContainer}>
          <Text style={addComponent.addCategoryBtn1}> Post </Text>
          <TouchableOpacity>
            <Text
              onPress={() => {
                if (imageUri !== null) {
                  uploadImage();
                }
              }}
              style={[
                addComponent.addCategoryBtn2,
                isUploadButtonDisabled && {opacity: 0.3},
              ]}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </View>

        <View style={addComponent.rectangleArea}>
          <View style={addComponent.uploadButton}>
            <TouchableOpacity
              onPress={() => openCamera()}
              style={addComponent.uploadVaiCamera}>
              <Image
                source={require('../../assets/icons/camera.png')}
                style={addComponent.cameraLogo}
              />
              <Text style={{fontWeight: '600', color: BLACK_COLOR}}>
                {' '}
                Open Camera{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectImageFromDevice()}
              style={addComponent.uploadVaiCamera}>
              <Image
                source={require('../../assets/icons/AddgalleryUpload.png')}
                style={addComponent.cameraLogo}
              />
              <Text style={{fontWeight: '600', color: BLACK_COLOR}}>
                {' '}
                Open Gallery{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removePhoto()}
              style={addComponent.uploadVaiCamera}>
              <Image
                source={require('../../assets/icons/remove.png')}
                style={addComponent.cameraLogo}
              />
              <Text style={{fontWeight: '600', color: BLACK_COLOR}}>
                {' '}
                Remove Image{' '}
              </Text>
            </TouchableOpacity>
          </View>

          {imageUri && imageUri.assets && imageUri.assets[0] ? (
            <Image
              source={{uri: imageUri.assets[0].uri}}
              style={addComponent.ImageSection}
            />
          ) : (
            <Image
              style={addComponent.ImageSection}
              source={require('../../assets/icons/Image-Shown.png')}
            />
          )}
        </View>

        <View style={addComponent.secondContainer}>
          <TouchableOpacity style={addComponent.addCaptionContainer}>
            <TextInput
              style={addComponent.captionInput}
              placeholder="type Caption Here"
              value={userCaption}
              onChangeText={text => setuserCaption(text)}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const BLACK_COLOR = 'black';
const WHITE_COLOR = 'white';

const addComponent = StyleSheet.create({
  coreContainer: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    position: 'relative',
    zIndex: 1,
  },

  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 3,
    alignSelf: 'center',
    top: 180,
    right: 110,
  },
  secondContainer: {
    backgroundColor: BLACK_COLOR,
    marginTop: 8,
  },
  topBarContainer: {
    width: '100%',
    height: 60,
    backgroundColor: BLACK_COLOR,
    borderBottomWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // padding:15,
  },

  addCategoryBtn1: {
    fontSize: 20,
    marginLeft: 20,
  },
  addCategoryBtn2: {
    fontSize: 20,
    marginRight: 21,
    // color: imageUri !== null? '#8e8e8e':'#E75810',
    color: '#E75810',
  },
  rectangleArea: {
    width: '90%',
    height: 240,
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
  },
  uploadButton: {
    width: '20%',
    position: 'absolute',
    left: 20,
    gap: 10,
  },

  cameraLogo: {
    width: 40,
    height: 40,
    alignContent: 'center',
  },
  ImageSection: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'orange',
    width: '58%',
    height: 220,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  uploadVaiCamera: {
    width: 100,
    height: 70,
    backgroundColor: 'orange',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addCaptionContainer: {
    width: '90%',
    height: 100,
    borderWidth: 1,
    borderColor: 'orange',
    alignSelf: 'center',
    borderRadius: 15,
  },
});

export default Add;
