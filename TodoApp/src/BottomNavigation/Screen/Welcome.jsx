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
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




let userID = '';

const Welcome = () => {
  const [postdata, setPostdata] = useState([]);

  // const [onLikeClick, setOnLikeClick] = useState(false);
  // // const isFocused = useIsFocused();

  // useEffect(()=> {
  //   getUserIdFromAsyncStorage();
  // }, [onLikeClick]);

  const getUserIdFromAsyncStorage = async () => {
     userID = await AsyncStorage.getItem('USER_ID');
     console.log(userID);
  }

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
    }, 20000); 
  
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


  // const getLikeStatus = (likes) => {
  //   let likestatus = false;
  //   likes.map(item => {
  //     if(item === userID){
  //       likestatus = true;
  //     }else{
  //       likestatus = false;
  //     }
  //   });
  //   return likestatus;
  // }

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
                <View style={welcome.attrationContainer}>
                  <View style={welcome.likecommentContainer}> 
                      <Text style={welcome.likesCommentCount}>{'0'}</Text>


                      <TouchableOpacity>
                        {/* {getLikeStatus(item.likes) ? (
                           <Image
                           source={require('../../assets/icons/love.png')}
                           style={welcome.like}
                         />
                        ) : (
                          <Image
                          source={require('../../assets/icons/love.png')}
                          style={welcome.alreadyLike}
                        />
                        )  } */}

                        <Image
                           source={require('../../assets/icons/love.png')}
                           style={welcome.like}
                         />

                      
                      </TouchableOpacity>


                  </View>

                  <View style={welcome.likecommentContainer}>
                      <Text style={welcome.likesCommentCount}>{'0'}</Text>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/icons/chat.png')}
                          style={welcome.chat}
                        />
                      </TouchableOpacity>
                  </View>
                
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

  alreadyLike: {
    width: 40,
    height: 40,
    tintColor: 'red',
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
  likesCommentCount: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    justifyContent: 'center',
    marginTop: 6,
    marginRight:6
  },
  attrationContainer: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
  }
});

export default Welcome;
