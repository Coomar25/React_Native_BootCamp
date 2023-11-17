import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Welcome = () => {
  const [postdata, setPostdata] = useState([]);

  // useEffect(() => {
  //   const fetchAfterInterval = setInterval(()=> {
  //     fetchPostData();
  //   }, 100000);

  //   return ()=> {
  //     clearInterval(fetchAfterInterval);
  //   }
  // },[]);

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchPostData();
    }, 10000000); 
  
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);
  

  // Fetch post data from database
  const fetchPostData = () => {
    firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        console.log('Total Posts: ', querySnapshot.size);
        const allPostData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          allPostData.push(documentSnapshot.data());
        });
        setPostdata(allPostData);
      });
  };

  return (
    <>
      <View style={welcome.coreContainer}>
        <FlatList
          data={postdata}
          renderItem={({item, index}) => {
            return (
              <View style={welcome.conainer}>
                <View style={welcome.postHeader}>
                  <View style={welcome.profileImageName}>
                    <Image
                      source={require('../../assets/icons/user.png')}
                      style={welcome.profilePicture}
                    />
                    <Text style={welcome.username}>{item.username}</Text>
                  </View>
                </View>
                <Image style={welcome.postImage} source={{uri: item.image}} />
                <View style={welcome.likecommentContainer}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/icons/love.png')}
                      style={welcome.like}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/icons/chat.png')}
                      style={welcome.chat}
                    />
                  </TouchableOpacity>
                </View>

                <Text>{item.caption}</Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const welcome = StyleSheet.create({
  coreContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  conainer: {
    alignSelf: 'center',
    padding: 12,
    width: '100%',
  },
  username: {
    fontSize: 20,
  },
  postHeader: {
    fontWeight: '600',
    gap: 8,
    position: 'relative',
    zIndex: 1,
  },
  profileImageName: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    zIndex: 2,
    top: 3,
    left: 4,
  },
  postImage: {
    height: 400,
    width: 400,
  },
  profilePicture: {
    width: 40,
    height: 40,
  },
  like: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  chat: {
    width: 36,
    height: 36,
    tintColor: 'white',
  },
  likecommentContainer: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 12,
    marginLeft: 10,
  },
});

export default Welcome;
