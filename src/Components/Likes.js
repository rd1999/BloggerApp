import React, {useState} from "react"
import { Layout, Text, Button, Input, Icon, Divider } from '@ui-kitten/components';
import {TouchableWithoutFeedback, FlatList, View, ImageBackground} from "react-native"

const Likes = ({route}) => {

    const {likedBy} = route.params
    const [filteredData, setFilteredData] = useState(likedBy);

    const renderIcon = (props) => (
        <TouchableWithoutFeedback>
          <Icon {...props} name={'search'}/>
        </TouchableWithoutFeedback>
      );

    const searchItem = (text) => {
        setFilteredData(likedBy.filter((el) => el.name.toLowerCase().includes(text.toLowerCase())))
    }

    return(
        <Layout style={{ flex: 1 }}> 
            <Text category='h4' style={{fontWeight: 'bold', marginLeft: 30, marginTop: 10}}>Likes</Text>
            <Input 
                placeholder='Search' 
                style={{marginHorizontal: 20, marginVertical: 20}}
                accessoryLeft={renderIcon}
                onChangeText={(text) => searchItem(text)}
            />
            <FlatList 
                data={filteredData}
                renderItem={({item}) => {
                    return (
                        <View>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <ImageBackground
                                source={{uri: item.profileImage}}
                                style={{height: 50, width: 50, marginBottom: 5, marginLeft: 20, marginRight: 15}}
                                imageStyle={{borderRadius: 50}}
                            ></ImageBackground>
                            <Text style={{alignSelf: 'center', marginTop: -10, flex: 1}}>{item.name}</Text>
                        </View>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.profileImage}
            />
        </Layout>
    )
}

export default Likes