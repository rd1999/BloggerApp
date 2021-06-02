import React, {useState, useEffect} from "react"
import { Layout, Text, Button, Divider } from '@ui-kitten/components';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {ImageBackground, View, Dimensions, useWindowDimensions, ScrollView} from "react-native"
import HTML from "react-native-render-html"

const Drafts = ({navigation}) => {

    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const windowWidth = Dimensions.get('window').width;
    const contentWidth = useWindowDimensions().width;

    useEffect(() => {

        const {currentUser} = auth();
    
        firestore()
            .collection(`users/${currentUser.uid}/drafts`)
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

    }, [])

    const onEdit = (individualData) => {

        const {currentUser} = auth()
        firestore()
            .collection(`users/${currentUser.uid}/drafts`)
            .doc(`${individualData.uid}`)
            .delete()
            .then(() => {
                navigation.navigate('AddPost', {
                    title: individualData.data.title, 
                    titleImage: individualData.data.titleImage,
                    hashtags: individualData.data.hashtags,
                    content: individualData.data.content
            }); 
        })
    }

    return (
        <Layout style={{ flex: 1 }}>
          <Text category='h4' style={{fontWeight: 'bold', marginVertical: 10, alignSelf: 'center'}}>Drafts</Text>
          <Divider />
          <ScrollView>
          {data.map((individualData) => {
            return (
                <View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Text category='h4' style={{marginHorizontal: 15, marginTop: 20, flex: 1}}>{individualData.data.title}</Text>
                        <Button onPress={() => onEdit(individualData)} style={{marginVertical: 5, alignSelf: 'center', marginRight: 10, marginTop: 10}}>Edit</Button>
                    </View>
                    <Divider />
                    <ImageBackground
                        source={{uri: individualData.data.titleImage}}
                        style={{height: 350, width: windowWidth, marginTop: 10, marginBottom: 20}}
                    ></ImageBackground>
                    <Divider />
                    {individualData.data.hashtags != undefined
                    ? <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                        <Text style={{fontStyle: 'italic', fontWeight: 'bold', marginRight: 5}}>#{individualData.data.hashtags}</Text>
                    </View>
                    : null}
                    
                    <View style={{backgroundColor: '#fff', padding: 15, marginTop: 20}}>
                        <HTML source={{ html: individualData.data.content }} contentWidth={contentWidth} />
                    </View>
                    <Divider />
                </View>
            )
          })}
          </ScrollView>
        </Layout>
    );
}

export default Drafts