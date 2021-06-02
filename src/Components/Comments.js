import React, { useState } from "react"
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { View, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import firestore from "@react-native-firebase/firestore";

const Comments = ({route}) => {

    const [comment, setComment] = useState('')
    const {name, profileImage, post} = route.params
    const [previousComments, setPreviousComments] = useState(post.post.comments)

    const onCommentPost = () => {
        firestore().
            collection(`posts`)
            .doc(`${post.uid}`)
              .update({
                  comments: [...previousComments, {
                    name: name,
                    profileImage: profileImage,
                    comment: comment
                  }]
                })
        setComment('')
        setPreviousComments([...previousComments, {name: name, profileImage: profileImage, comment: comment}])
    }

    const renderPost = () => {
        if(comment !== ''){
            return(
                <TouchableOpacity onPress={() => onCommentPost()}>
                    <Text style={{ marginRight: 10, color: "#3edbf0"}}>Post</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }

    return(
        <Layout style={{ flex: 1 }}>
            <Text category='h4' style={{fontWeight: 'bold', marginLeft: 30, marginTop: 10}}>Comments</Text>
            <View style={{flexDirection: 'row'}}>
                <Input 
                    placeholder='Add a comment...' 
                    style={{marginHorizontal: 20, marginVertical: 20, flex: 1}}
                    accessoryRight={renderPost}
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                />
            </View>
            <FlatList 
                data={previousComments}
                renderItem={({item}) => {
                    return <View style={{flexDirection: 'row', marginBottom: 20, flexWrap: 'wrap', alignItems: 'flex-start'}}>
                        <ImageBackground 
                            source={{uri: item.profileImage}}
                            style={{height: 50, width: 50, marginBottom: 5, marginLeft: 20, marginRight: 15}}
                            imageStyle={{borderRadius: 50}}
                        ></ImageBackground>
                        <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{item.name}</Text>
                        <Text style={{alignSelf: 'center', marginHorizontal: 20}}>{item.comment}</Text>
                    </View>
                }}
                keyExtractor={(item) => item.comment}
            />
        </Layout>
    )
}

export default Comments