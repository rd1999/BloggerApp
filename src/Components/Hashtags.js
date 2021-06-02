import React, {useState, useEffect} from "react"
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import firestore from "@react-native-firebase/firestore";
import {FlatList, ScrollView, View, Image} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PlusIcon from "react-native-vector-icons/AntDesign"


const Hashtags = ({navigation, route}) => {

    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([]);
    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const [filteredData, setFilteredData] = useState(data);

    const {title, titleImage} = route.params

    useEffect(() => {
    
        firestore()
            .collection(`hashtags`)
            .onSnapshot(docs => {
                let users = []
                if(docs!=null){
                    docs.forEach(doc => {
                        users.push({data: doc.data(), uid: doc.id})
                    })
                    setData(users)
                    setFilteredData(users)
                }
            })
    
      }, [])

    const searchItem = (text) => {
        setFilteredData(data.filter((el) => el.data.name.toLowerCase().includes(text.toLowerCase()) || el.data.type.toLowerCase().includes(text.toLowerCase())))
    }

    return(
        <Layout style={{ flex: 1}}>
            <Text category='h3' style={{alignSelf: 'center', padding: 30, paddingBottom: 0}}>Add tags to help</Text>
            <Text category='h3' style={{alignSelf: 'center'}}>people</Text>
            <Text category='h3' style={{alignSelf: 'center', marginBottom: 50}}>find your post</Text>
            <View style={{flexDirection: 'row'}}>
            <Input 
                placeholder='Search'
                style={{marginHorizontal: 20, marginBottom: 20, flex: 1}}
                // value={searchText}
                onChangeText={(text) => searchItem(text)}
            />
            <PlusIcon onPress={() => navigation.navigate('AddHashtags')} name="pluscircleo" style={{alignSelf: 'center', marginTop: -20, marginRight: 20, color: '#8F9BB3'}} size={50} />
            </View>
            <FlatList
                data={filteredData}
                renderItem={({item}) => {
                    return <View style={{margin: 10, marginLeft: 20}}>
                                <BouncyCheckbox
                                    size={25}
                                    fillColor="blue"
                                    unfillColor="#FFFFFF"
                                    text={item.data.name}
                                    iconStyle={{ borderColor: "blue" }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: 'none' }}
                                    onPress={(isChecked) => {
                                        if(isChecked === true){
                                            setSelectedHashtags([...selectedHashtags,item.data.name])
                                        }else{
                                            var array = [...selectedHashtags]
                                            var index = array.indexOf(item.data.name)
                                            if (index !== -1) {
                                                array.splice(index, 1);
                                                setSelectedHashtags(array)
                                            }
                                        }
                                    }}
                                />
                            </View>
                }}
                keyExtractor={item => item.uid}
                style={{backgroundColor: '#fff', marginHorizontal: 20}}
            />
            
            <Button onPress={() => navigation.navigate('AddPost', {title: title, titleImage: titleImage, hashtags: selectedHashtags})} style={{marginHorizontal: 80, marginVertical: 20}}>Add tags</Button>
        </Layout>
    )
}

export default Hashtags