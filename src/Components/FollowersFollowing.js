import React, {useState, useEffect} from 'react'
import {View, TouchableWithoutFeedback, ImageBackground, FlatList} from "react-native"
import {Layout, Text, Input, Icon} from "@ui-kitten/components"
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const FollowersFollwing = ({route}) => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState(data);
    const y = []

    useEffect(() => {

        firestore()
        .collection(`profile`)
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

    const {type, uid} = route.params

    const renderIcon = (props) => (
        <TouchableWithoutFeedback>
          <Icon {...props} name={'search'}/>
        </TouchableWithoutFeedback>
    );

    const searchItem = (text) => {
        data.filter((el) => {
            if(el.data.userId === uid){
                el.data.followers.map((x) => {
                    if(x.name.toLowerCase().includes(text.toLowerCase())){
                        y.push(el)
                        console.log(y)
                        setFilteredData(y)
                    }
                })
            }
        })
        // console.log(filteredData)
        // data.map((individualData) => {
        //     if(individualData.data.userId === currentUser.uid){
        //         setFilteredData(individualData.data.followers.filter((el) => {
        //             if(el.name.toLowerCase().includes(text.toLowerCase())){
        //                 return 
        //             }
        //         }))
        //     }
        // })
    }

    return(
        <Layout style={{flex: 1}}>
            <Text category='h4' style={{fontWeight: 'bold', marginLeft: 30, marginTop: 30, marginBottom: 10}}>{type}</Text>
            {/* <Input 
                placeholder='Search' 
                style={{marginHorizontal: 20, marginVertical: 20}}
                accessoryLeft={renderIcon}
                onChangeText={(text) => searchItem(text)}
            /> */}
            {type === 'Followers' 
            ? filteredData.map((individualData) => {
                if(individualData.data.userId === uid){
                    return <FlatList 
                        data={individualData.data.followers}
                        renderItem={({item}) => {
                            return <View>
                                <View style={{flexDirection: 'row', marginTop: 15}}>
                                    <ImageBackground
                                        source={{uri: item.profileImage}}
                                        style={{height: 50, width: 50, marginBottom: 5, marginLeft: 20, marginRight: 15}}
                                        imageStyle={{borderRadius: 50}}
                                    ></ImageBackground>
                                    <Text style={{alignSelf: 'center', marginTop: -10, flex: 1}}>{item.name}</Text>
                                </View>
                            </View>
                        }}
                        keyExtractor={(item) => item.userId}
                    />
                }
            })
            : filteredData.map((individualData) => {
                if(individualData.data.userId === uid){
                    return <FlatList 
                        data={individualData.data.following}
                        renderItem={({item}) => {
                            return <View>
                                <View style={{flexDirection: 'row', marginTop: 15}}>
                                    <ImageBackground
                                        source={{uri: item.profileImage}}
                                        style={{height: 50, width: 50, marginBottom: 5, marginLeft: 20, marginRight: 15}}
                                        imageStyle={{borderRadius: 50}}
                                    ></ImageBackground>
                                    <Text style={{alignSelf: 'center', marginTop: -10, flex: 1}}>{item.name}</Text>
                                </View>
                            </View>
                        }}
                        keyExtractor={(item) => item.userId}
                    />
                }
            })}
        </Layout>
    )
}

export default FollowersFollwing