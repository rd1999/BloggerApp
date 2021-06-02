import React, {useState, useEffect, useRef} from "react"
import {View, ImageBackground, TouchableWithoutFeedback, StyleSheet, Image, ScrollView} from "react-native"
import { Layout, Text, Divider, Spinner, Button } from '@ui-kitten/components';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import BlogComponent from "./BlogComponent"

const OtherProfile = ({navigation, route }) => {

    const {name, profileImage, userId} = route.params

    const [posts, setPosts] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState([])
    const [noFollowers, setNoFollowers] = useState(0)
    const [noFollowing, setNoFollowing] = useState(0)
    const [noPosts, setNoPosts] = useState(0)
    const {currentUser} = auth()

    useEffect(() => {

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
            .collection(`posts`)
            .onSnapshot(docs => {
                let users = []
                if(docs!=null){
                    docs.forEach(doc => {
                        users.push({post: doc.data(), uid: doc.id})
                    })
                    setPosts(users)
                    setLoading(false)
                    var x = 0
                    users.map((p) => {
                        if(p.post.userId === userId){
                            x += 1
                        }
                    })
                    setNoPosts(x)
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
                    setLoading(false)
                }
            })

            firestore()
            .collection(`profile`)
            .onSnapshot(docs => {
                let users = []
                console.log(docs)
                if(docs!=null){
                    docs.forEach(doc => {
                        users.push({data: doc.data(), uid: doc.id})
                    })
                    setProfile(users)
                    users.map((p) => {
                        if(p.data.userId === userId){
                            setNoFollowers(p.data.followers.length)
                            setNoFollowing(p.data.following.length)
                        }
                    })
                }
            })
    
    }, [])

    const renderName = () => {
        var str = name
        str = str.split(" ").join("")
        return(
            <Text category='h5' style={{alignSelf: 'center', marginBottom: 20}}>{(str).toLowerCase()}</Text> 
        )
    }

    const renderImage = () => {
        return(
            <Image 
                source={{uri: profileImage}}
                style={{height: 100, width: 100, alignSelf: 'center', marginTop: 50, marginBottom: 20, borderRadius: 15}}
            />
        )
    }

    const onFollow = () => {
        profile.map((p) => {
            if(p.data.userId === userId){

                var followers = [...p.data.followers]
                followers.push({name: data[0].data.name, profileImage: data[0].data.image})

                firestore().
                    collection(`profile`)
                    .doc(`${p.uid}`)
                    .update({
                        followers: followers,
                        })

            }

            const {currentUser} = auth()

            if(p.data.userId === currentUser.uid){

                var following = [...p.data.following]
                following.push({name: name, profileImage: profileImage})

                firestore().
                    collection(`profile`)
                    .doc(`${p.uid}`)
                    .update({
                        following: following,
                        })

            }
        })
    }

    const onNotFollow = () => {

        profile.map((p) => {
            if(p.data.userId === userId){

                var followers = [...p.data.followers]

                // const index = followers.indexOf(data[0].data.name);
                var index = followers.findIndex(x => x.name === data[0].data.name && x.profileImage === data[0].data.image)
                if (index > -1) {
                    followers.splice(index, 1);
                }

                // alert(followers)

                firestore().
                    collection(`profile`)
                    .doc(`${p.uid}`)
                    .update({
                        followers: followers,
                        })

            }

            const {currentUser} = auth()

            if(p.data.userId === currentUser.uid){

                var following = [...p.data.following]

                // const index = following.indexOf(name);
                var index = following.findIndex(x => x.name === name && x.profileImage === profileImage)
                if (index > -1) {
                    following.splice(index, 1);
                }

                // following.push(name)

                firestore().
                    collection(`profile`)
                    .doc(`${p.uid}`)
                    .update({
                        following: following,
                        })

            }
        })

    }

  return(
    <Layout style={{ flex: 1 }}>
      {renderImage()}
      {renderName()}
      <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('FollowersFollowing', {type: 'Followers', uid: userId})}>
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>{noFollowers}</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Followers</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>{noPosts}</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Posts</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('FollowersFollowing', {type: 'Following', uid: userId})}>
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>{noFollowing}</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Following</Text>
            </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{flexDirection: 'row'}}>
        {profile.map((p) => {
            if(p.data.userId === userId){
                var index = p.data.followers.findIndex(x => x.name === data[0].data.name && x.profileImage === data[0].data.image)
                if(index !== -1){
                    return <Button status='basic' onPress={() => onNotFollow()} style={{marginLeft: 15, marginRight: 5 ,marginBottom: 15, flex: 0.5}}>Following</Button>
                }else{
                    return <Button status='info' onPress={() => onFollow()} style={{marginLeft: 15, marginRight: 5 ,marginBottom: 15, flex: 0.5}}>Follow</Button>
                }
            }
        })}
        <Button onPress={() => {
            navigation.navigate('Message', {name: name,image: profileImage, userId: userId, senderName: data[0].data.name, avatar: data[0].data.image, senderId: currentUser.uid})
        }} status='info' style={{marginRight: 15, marginBottom: 15,marginLeft: 5, flex: 0.5}}>Message</Button>
      </View>

      <Divider />
      <ScrollView>
        {posts.map((post) => {
            if(post.post.userId === userId){
                return <BlogComponent post={post} loading={loading} data={data} navigation={navigation} bookmarks={bookmarks} />
            }
        })}
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginHorizontal: 15
  }
})

export default OtherProfile