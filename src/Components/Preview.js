import React from "react"
import {View, StyleSheet, ScrollView, ImageBackground, useWindowDimensions} from "react-native"
import { Layout, Text, Button } from '@ui-kitten/components';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import HTML from "react-native-render-html"

const Preview = ({route, navigation}) => {

    const {title, titleImage, html, name, type, profileImage, hashtags} = route.params
    const contentWidth = useWindowDimensions().width;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    const onPuublish = () => {
        const {currentUser} = auth();
        firestore().
            collection(`posts`)
            .add({
                name: name,
                title: title,
                titleImage: titleImage,
                datePublished: `${date}-${month}-${year}`,
                content: html,
                profileImage: profileImage,
                hashtags: hashtags,
                likes: 0,
                likedBy: [],
                comments: [],
                userId: currentUser.uid
            })
        firestore().
            collection(`users/${currentUser.uid}/posts`)
            .add({
                name: name,
                title: title,
                titleImage: titleImage,
                datePublished: `${date}-${month}-${year}`,
                content: html,
                profileImage: profileImage,
                hashtags: hashtags,
                likes: 0,
                likedBy: [],
                comments: [],
                userId: currentUser.uid
            })

        navigation.navigate('AddPostTitle')
    }

    return(
        <Layout style={{flex: 1}}>
            {type==='preview' ? <Text category='h2' style={{alignSelf: 'center', margin: 20}}>Preview</Text> : null}
            <ScrollView style={styles.containerStyle} showsVerticalScrollIndicator={false}>
                <Text category='h1'>{title}</Text>
                <ImageBackground 
                    source={{uri: titleImage}}
                    style={{height: 350, width: 350, alignSelf: 'center', marginTop: 20, marginBottom: 20}}
                    imageStyle={{}}
                >
                </ImageBackground>
                {type==='preview'?<Text style={{fontSize: 13}}>Created by: {name}</Text>:null}
                {type==='preview'?<Text style={{fontSize: 13, marginBottom: 10}}>{date}-{month}-{year}</Text>:null}
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                {hashtags.map((hashtag) => {
                    return <Text style={{fontStyle: 'italic', fontWeight: 'bold', marginRight: 5}}>#{hashtag}</Text>
                })}
                </View>
                <View style={{backgroundColor: '#fff', padding: 15, marginTop: 20}}>
                    <HTML source={{ html: html }} contentWidth={contentWidth} />
                </View>
            </ScrollView>
            {type==='preview'?<Button onPress={() => onPuublish()} style={styles.buttonStyle}>Publish</Button>:null}
        </Layout>
    );
}

const styles = StyleSheet.create({

    containerStyle: {
        margin: 15, 
        marginTop: 30
    },
    buttonStyle: {
        marginHorizontal: 100,
        marginVertical: 25,
        marginTop: 15
    }

})

export default Preview