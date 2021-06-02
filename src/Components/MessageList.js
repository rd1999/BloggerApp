import React, {useState, useEffect} from "react"
import {ImageBackground, TouchableWithoutFeedback, View} from "react-native"
import {Layout, Text, Divider} from "@ui-kitten/components"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const MessageList = ({route, navigation}) => {

    const [profile, setProfile] = useState([])
    const [data, setData] = useState([])
    const {name, image} = route.params
    const {currentUser} = auth()

    var sortAlphabets = function(text) {
        return text.split('').sort().join('');
    };

    useEffect(() => {

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

    }, [])

    const getLastMessage = (userId) => {
        var id = currentUser.uid + userId
        id = sortAlphabets(id)

        firestore()
            .collection('messages')
            .doc(id)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    documentSnapshot.data().messageInfo.forEach((item, index) => {
                        item.createdAt = item.createdAt.toDate()
                        if(item.user.name != name){
                            item.user._id = 2
                        }else{
                            item.user._id = 1
                        }
                    })
                    documentSnapshot.data().messageInfo.sort((a, b) => {
                        return b.createdAt - a.createdAt
                    })
                    setData(documentSnapshot.data().messageInfo)
                }
            }).catch((err) => alert(err))
    }

    return(
        <Layout style={{flex: 1}}>
            <Text category='h4' style={{fontWeight: 'bold', marginTop: 10, alignSelf: 'center', marginBottom: 10}}>Your Messages</Text>
            <Divider style={{marginBottom: 30}} />
            {profile.map((p) => {
                if(p.data.messaging === true && p.data.userId !== currentUser.uid){
                    return <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('Message', {name: p.data.name, image: p.data.profileImage, userId: p.data.userId, senderName: name, avatar: image, senderId: currentUser.uid})
        }}>
            <View style={{flexDirection: 'row', marginBottom: 20, marginLeft: 20}}>
                <ImageBackground
                    source={{uri: p.data.profileImage}}
                    style={{height: 50, width: 50, marginRight: 10}}
                    imageStyle={{borderRadius: 50}}
                ></ImageBackground>
                <Text style={{alignSelf: 'center'}}>{p.data.name}</Text>
                {getLastMessage(p.data.userId)}
                {console.log(data)}
                {/* {data[data.length-1].text !== undefined ? <Text>{data[data.length-1].text}</Text> : null} */}
            </View>
        </TouchableWithoutFeedback>
                }
            })}
        </Layout>
    )
}

export default MessageList