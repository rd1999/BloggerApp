import React, {useState, useEffect, useRef} from "react"
import {View, ImageBackground, TouchableWithoutFeedback, StyleSheet, Image} from "react-native"
import { Layout, Text, Divider, Spinner, Button } from '@ui-kitten/components';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import CountFollower from "./countFollower"

const Profile = ({navigation}) => {

  const [image, setImage] = useState('data:image/png;base64,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')
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [profile, setProfile] = useState([])
  const refRBSheet = useRef();

  useEffect(() => {

    const {currentUser} = auth();

    firestore()
        .collection(`users/${currentUser.uid}/name`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setData(users)
                setLoading(false)
            }

        })

        firestore()
        .collection(`users/${currentUser.uid}/bookmarks`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setBookmarks(users)
            }
        })

        firestore()
        .collection(`profile`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setProfile(users)
            }
        })

        firestore()
        .collection(`posts`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setPosts(users)
            }
        })

  }, [])

  const renderName = () => {
    if(loading === false){
      var str = data[0].data.name
      str = str.split(" ").join("")
      return(
        <Text category='h5' style={{alignSelf: 'center', marginBottom: 20}}>{(str).toLowerCase()}</Text> 
      )
    }else{
      return(
        null
      )
    }
  }

  const renderImage = () => {
    if(loading === false){
      return(
        <TouchableWithoutFeedback onPress={() => choosePhotoFromGallery()}> 
          <Image 
            source={{uri: data[0].data.image}}
            style={{height: 100, width: 100, alignSelf: 'center', marginTop: 80, marginBottom: 20, borderRadius: 15}}
          />
        </TouchableWithoutFeedback>
      )
    }else{
      return(
        null
      )
    }
  }

  async function getAlert(uri, name, firebasePath){
    const imageRef = storage().ref(`${firebasePath}/${name}`)
    await imageRef.putFile(uri, { contentType: 'image/jpg'}).catch((error) => { throw error })
    const url = await imageRef.getDownloadURL().catch((error) => { throw error });
    // console.log(url)
    setImage(url)
    const {currentUser} = auth();

    // console.log(bookmarks)
    // console.log(data[0].data.image)

    if(loading === false){
      bookmarks.map((bookmark) => {
        if(bookmark.data.post.profileImage === data[0].data.image){
          // console.log(bookmark.uid)
          var post = bookmark.data.post
          post.profileImage = url
          firestore().
          collection(`users/${currentUser.uid}/bookmarks`)
          .doc(`${bookmark.uid}`)
            .update({
                post: post,
              })
        }
      })
    }

    if(loading === false){
      posts.map((post) => {
        if(post.data.userId === currentUser.uid){
          firestore().
          collection(`posts`)
          .doc(`${post.uid}`)
            .update({
                profileImage: url,
              })
        }
      })
    }

    if(loading === false){
      profile.map((post) => {
        if(post.data.userId === currentUser.uid){
          firestore().
            collection(`profile`)
            .doc(`${post.uid}`)
              .update({
                  profileImage: url,
                })
        }
      })
    }

      firestore().
        collection(`users/${currentUser.uid}/name`)
        .doc(`${data[0].uid}`)
          .update({
              image: url,
            })

        
  }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
    }).then(image1 => {
      getAlert(image1.path, image1.path, "imageUrl")
    
      const {currentUser} = auth();
      firestore().
        collection(`users/${currentUser.uid}/name`)
        .doc(`${data[0].uid}`)
          .update({
              image: image,
            })
      // refRBSheet.current.close()
    });
  }

  const choosePhotoFromGallery = () => {   
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true
    }).then(image1 => {
      getAlert(image1.path, image1.path, "imageUrl")
      
      // refRBSheet.current.close()
    });
  }

  return(
    <Layout style={{ flex: 1 }}>
      {/* {alert(data[0].data.name)} */}
      {renderImage()}
      {renderName()}
      
        {/* <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
        <View style={{marginHorizontal: 20}}> 
          <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>{noFollowers}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Followers</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>{noPosts}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Posts</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>{noFollowing}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Following</Text>
        </View>
        </View> */ }
        {loading === false ? <CountFollower loading={loading} data={data} navigation={navigation} /> : null}
      <Divider />

      <Text onPress={() => navigation.navigate('PersonalBlogs')} style={{paddingLeft: 10, paddingVertical: 20, fontSize: 18}}>Your Blogs</Text>
      <Divider />
      <Text onPress={() => navigation.navigate('BookmarkedBlogs')} style={{paddingLeft: 10, paddingVertical: 20, fontSize: 18}}>Bookmarked Blogs</Text>
      <Divider />
      <Text onPress={() => navigation.navigate('Drafts')} style={{paddingLeft: 10, paddingVertical: 20, fontSize: 18}}>Drafts</Text>
      <Divider />

      {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        animationType="fade"
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            borderColor: '#8F9BB3',
            borderTopWidth: 1,
            borderRadius: 20,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }
        }}
      >
        <View style={{marginTop: 20}}>
          <Text style={{alignSelf: 'center', paddingBottom: 5, color: '#000'}} category='h4'>Upload Photo</Text>
          <Text style={{alignSelf: 'center', paddingBottom: 10, color: '#000'}}>Choose Your Profile Picture</Text>
          <Button style={styles.button} size='medium' status='info' onPress={() => takePhotoFromCamera()}>Take Photo</Button>
          <Button style={styles.button} size='medium' status='info' onPress={() => choosePhotoFromGallery()}>Choose from Library</Button>
          <Button style={styles.button} size='medium' status='info' onPress={() => refRBSheet.current.close()}>Cancel</Button>
        </View>
      </RBSheet> */}
    </Layout>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginHorizontal: 15
  }
})

export default Profile