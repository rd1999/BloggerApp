import React, {useState, useEffect} from "react"
import { Layout, Text, Icon, Input } from '@ui-kitten/components';
import {TouchableWithoutFeedback, FlatList, View, ImageBackground} from "react-native"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const SearchProfile = ({navigation}) => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState(data);
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState('')
    const [name, setName] = useState([])

    useEffect(() => {

        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/name`)
            .onSnapshot(docs => {
                let users = []
                console.log(docs)
                if(docs!=null){
                    docs.forEach(doc => {
                        users.push({data: doc.data(), uid: doc.id})
                    })
                    setName(users)
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
                    setData(users)
                    setFilteredData(users)
                }
            })
    
      }, [])

    const renderIcon = (props) => (
        <TouchableWithoutFeedback>
          <Icon {...props} name={'search'}/>
        </TouchableWithoutFeedback>
    );

    const searchItem = (text) => {
        setFilteredData(data.filter((el) => el.data.name.toLowerCase().includes(text.toLowerCase())))
    }

    const onClickProfile = (image, n, userId) => {
        if(image === name[0].data.image){
          navigation.navigate('Profile')
        }else{
          navigation.navigate('OtherProfile', {name: n, profileImage: image, userId: userId})
        }
      }

    return(
        <Layout style={{ flex: 1 }}>
            <Text category='h1' style={{marginTop: 20, marginLeft: 20, marginBottom: 10}}>Search</Text>
            <Input 
                placeholder='Search' 
                style={{marginHorizontal: 20, marginVertical: 20}}
                accessoryLeft={renderIcon}
                size="large"
                onChangeText={(text) => {
                    searchItem(text)
                    setText(text)
                }}
            />
            {text != ''
            ? <FlatList 
                data={filteredData}
                renderItem={({item}) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => onClickProfile(item.data.profileImage, item.data.name, item.data.userId)}>
                            <View style={{flexDirection: 'row', marginTop: 15}}>
                                <ImageBackground
                                    source={{uri: item.data.profileImage}}
                                    style={{height: 50, width: 50, marginBottom: 5, marginLeft: 20, marginRight: 15}}
                                    imageStyle={{borderRadius: 50}}
                                ></ImageBackground>
                                <Text style={{alignSelf: 'center', marginTop: -10, flex: 1}}>{item.data.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
                keyExtractor={(item) => item.data.profileImage}
            />
            : null}
        </Layout>
    )
}

export default SearchProfile