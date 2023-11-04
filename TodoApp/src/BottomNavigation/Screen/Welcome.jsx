import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Welcome = () => {
  const [imageUri, setImageUri] = useState('');
  const [fetchImageUrl, setfetchImageUrl] = useState('');

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (!result.didCancel) {
      setImageUri(result);
      // console.log(imageUri.assets[0].uri);
      // const selectedImageUri = result.assets[0].uri;
    }
  };

  const selectImageFromDevice = async () => {
    const uploadFromDevice = await launchImageLibrary({mediaType: 'photo'});
    setImageUri(uploadFromDevice);
    // console.log(imageUri);
  };

  const uploadImage = async () => {
    if (imageUri && imageUri.assets && imageUri.assets[0]) {
      const reference = storage().ref(
         imageUri.assets[0].fileName,
      );
      const pathToFile = imageUri.assets[0].uri;
      // console.log(pathToFile);

      try {
        const uploadToFirebase = await reference.putFile(pathToFile);
        if(uploadToFirebase){
          console.log('Image uploaded successfully.');
          const imageurlFromFireBase = await storage().ref(imageUri.assets[0].fileName).getDownloadURL();
          setfetchImageUrl(imageurlFromFireBase);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.log('No image to upload.');
    }
  };

  const removePhoto = () => {
    if (imageUri && imageUri.assets && imageUri.assets[0]) {
      setImageUri(null); 
    }else{
      console.warn('Image does not exist');
    }
  } 

  return (
    <View style={styles.container}>

      <View>
            {imageUri && imageUri.assets && imageUri.assets[0] ? (
              <Image
                source={{uri: imageUri.assets[0].uri}}
                style={styles.imagePlaceholder}
              />
            ) : (
              <Text>No image</Text>
            )}
      </View>


      <View style={styles.buttonUpload}>
         <TouchableOpacity
          onPress={()=> removePhoto()}
          style={[styles.button, {backgroundColor: 'orange'}]}>
          <Text style={styles.buttonText}>Remove Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openCamera}
          style={[styles.button, {backgroundColor: 'orange'}]}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=> selectImageFromDevice()}
          style={[styles.button, {backgroundColor: 'orange'}]}>
          <Text style={styles.buttonText}>upload Device </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => uploadImage()}
          style={[styles.button, {backgroundColor: 'orange'}]}>
          <Text style={styles.buttonText}>Upload </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePlaceholder: {
    borderRadius:20,
    width: 200, height: 200,
    resizeMode: 'contain'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10, // Add a border radius to round the corners of the image
  },
  buttonUpload: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:100
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Welcome;
