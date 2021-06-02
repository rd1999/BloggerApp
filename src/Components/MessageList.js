import React, {useState, useEffect} from "react"
import {ImageBackground, TouchableWithoutFeedback, View} from "react-native"
import {Layout, Text, Divider} from "@ui-kitten/components"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const MessageList = ({route, navigation}) => {

    const [messages, setMessages] = useState([])
    const [data, setData] = useState([])
    const {name} = route.params
    const {currentUser} = auth()

    useEffect(() => {

        firestore()
        .collection(`messages`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setMessages(users)
            }
        })

        firestore()
        .collection(`users/${currentUser.uid}/name`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setData(users)
            }
        })

    })

    return(
        <Layout style={{flex: 1}}>
            <Text category='h4' style={{fontWeight: 'bold', marginTop: 10, alignSelf: 'center', marginBottom: 10}}>Your Messages</Text>
            <Divider style={{marginBottom: 30}} />
            {messages.map((message) => {
                var n = message.data.names[0] === name ? message.data.names[1] : message.data.names[0]
                var i = message.data.names.indexOf(n)
                var a = message.data.avatars[i]
                var id = message.data.ids[i]
                return(
                    <TouchableWithoutFeedback onPress={() => {
                        // navigation.navigate('Message', {name: n, image: a, userId: id, senderName: data[0].data.name, avatar: data[0].data.image, senderId: currentUser.uid})
                    }}>
                        <View style={{flexDirection: 'row', marginBottom: 20, marginLeft: 20}}>
                            <ImageBackground
                                source={{uri: a}}
                                style={{height: 50, width: 50, marginRight: 10}}
                                imageStyle={{borderRadius: 50}}
                            ></ImageBackground>
                            <Text style={{alignSelf: 'center'}}>{n}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
        </Layout>
    )
}

export default MessageList