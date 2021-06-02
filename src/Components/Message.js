import React, {useState, useEffect, useCallback} from "react"
import {View} from "react-native"
import {Layout, Text, Divider} from "@ui-kitten/components"
import { GiftedChat } from 'react-native-gifted-chat'
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Message = ({route}) => {

    const {name, userId, senderName, avatar, image, senderId} = route.params
    const {currentUser} = auth();
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState([])

    var sortAlphabets = function(text) {
        return text.split('').sort().join('');
    };

  useEffect(() => {


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
                    if(item.user.name != senderName){
                        item.user._id = 2
                    }else{
                        item.user._id = 1
                    }
                })
                documentSnapshot.data().messageInfo.sort((a, b) => {
                    return b.createdAt - a.createdAt
                })
                setData(documentSnapshot.data().messageInfo)
                setMessages(documentSnapshot.data().messageInfo)
              }
        }
    );

  }, [])

  useEffect(() => {

    var id = currentUser.uid + userId
    id = sortAlphabets(id)
    firestore().
        collection(`messages`)
        .doc(id)
        .set({
            messageInfo: data,
            names: [name, senderName],
            avatars: [image, avatar],
            ids: [userId, senderId]
        })

  }, [data])

//   const addMessage = () => {
//         console.log(data)
//   }

  const onSend = (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    messages[0].user.name = senderName
    messages[0].user.avatar = avatar
    console.log(messages[0])
    setData([...data, messages[0]])
  }

    return(
        <Layout style={{flex: 1}}>
            <Text category='h4' style={{fontWeight: 'bold', marginTop: 10, alignSelf: 'center', marginBottom: 10}}>{name}</Text>
            <Divider />
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
    />
        </Layout>
    )
}

export default Message