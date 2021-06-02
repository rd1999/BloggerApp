import React, {useState, useEffect} from "react"
import {View, TouchableWithoutFeedback} from "react-native"
import { Text } from '@ui-kitten/components';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const CountFollower = ({loading, navigation}) => {

    const [noFollowers, setNoFollowers] = useState(0)
    const [noFollowing, setNoFollowing] = useState(0)
    const [noPosts, setNoPosts] = useState(0)
    const {currentUser} = auth()

    useEffect(() => {

        firestore()
        .collection(`profile`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                if(loading === false){
                    
                  users.map((p) => {
                    if(p.data.userId === currentUser.uid){
                        setNoFollowers(p.data.followers.length)
                        setNoFollowing(p.data.following.length)
                    }
                })
                }else{
                    
                }
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
                if(loading === false){
                    const {currentUser} = auth()
                  var x = 0
                  users.map((p) => {
                    if(p.data.userId === currentUser.uid){
                      x += 1
                    }
                  })
                  setNoPosts(x)
                }
            }
        })

    }, [])

    return(
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('FollowersFollowing', {type: 'Followers', uid: currentUser.uid})}>
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

            <TouchableWithoutFeedback onPress={() => navigation.navigate('FollowersFollowing', {type: 'Following', uid: currentUser.uid})}>
                <View style={{marginHorizontal: 20}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>{noFollowing}</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Following</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default CountFollower