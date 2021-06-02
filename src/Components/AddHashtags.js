import React, {useState, useEffect} from "react"
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import firestore from "@react-native-firebase/firestore";
import {FlatList, ScrollView, View, Image} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PlusIcon from "react-native-vector-icons/AntDesign"


const Hashtags = ({navigation}) => {

    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    var types = []

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
                }
            })
    
      }, [])

    const getType = () => {
        data.map((individualData) => {
            types.push(individualData.data.type)
        })
        types = Array.from(new Set(types))
    }

    const onAdd = () => {
        firestore().
            collection(`hashtags`)
            .add({
                name: searchText,
                type: types[selectedIndex-1]
            })
        navigation.goBack()
    }

    return(
        <Layout style={{ flex: 1 }}>
            <Text category='h3' style={{alignSelf: 'center', padding: 30, paddingBottom: 0}}>Add more tags</Text>
            <Text category='h3' style={{alignSelf: 'center'}}>to the</Text>
            <Text category='h3' style={{alignSelf: 'center', marginBottom: 50}}>given categories</Text>
            {getType()}
            <Input 
                 placeholder='Tag'
                 style={{marginHorizontal: 20, marginBottom: 20}}
                 value={searchText}
                 onChangeText={(text) => setSearchText(text)}
                 size="large"
            />
            <Select
                style={{marginHorizontal: 20}}
                size="large"
                value={types[selectedIndex-1]}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                    {types.map((individualData) => {
                        return <SelectItem title={individualData} />

                    })}
            </Select>
            {searchText != ''
            ? <Button onPress={() => onAdd()} style={{marginHorizontal: 80, marginVertical: 40}}>Add tag</Button>
            : <Button disabled style={{marginHorizontal: 80, marginVertical: 40}}>Add tag</Button>}
        </Layout>
    )
}

export default Hashtags