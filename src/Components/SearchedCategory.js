import React from "react"
import { Layout, Text } from '@ui-kitten/components';
import { View, Dimensions, FlatList } from "react-native";
import AddIcon from "react-native-vector-icons/AntDesign"
import BlogComponent from "./BlogComponent"

const BlogPosts = ({route}) => {

  const windowWidth = Dimensions.get('window').width;

  const {name, posts, loading, data, navigation, bookmarks} = route.params

  const renderData = () => {
    return(
      <View style={{flexDirection: 'column'}}>
        {/* <AddIcon onPress={() => navigation.navigate('AddPost')} name="plussquareo" color='#8F9BB3' size={35} style={{alignSelf: 'center', marginRight: windowWidth/2 - 125, marginLeft: 20}} /> */}
        <Text category='h1' style={{alignSelf: 'center', margin: 20, marginTop: 5, marginBottom: 5}}>{name}</Text>
      </View>
    )
  }

  return(
    <Layout style={{ flex: 1}}>
      {renderData()}
      <FlatList 
        data={posts}
        renderItem={({item})=> {
          return <BlogComponent post={item} loading={loading} data={data} navigation={navigation} bookmarks={bookmarks} />
        }}
        keyExtractor={(item) => item.uid}
      />
    </Layout>
  )
}

export default BlogPosts