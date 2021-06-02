import React, {useState, useEffect} from "react"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Layout, Text } from '@ui-kitten/components';
import { View, ScrollView, Dimensions, FlatList } from "react-native";
import AddIcon from "react-native-vector-icons/AntDesign"
import MessageIcon from "react-native-vector-icons/AntDesign"
import BlogComponent from "./BlogComponent"

const BlogPosts = ({navigation}) => {

  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([])
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {

    const {currentUser} = auth();

    firestore()
        .collection(`users/${currentUser.uid}/name`)
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

      firestore()
        .collection(`users/${currentUser.uid}/bookmarks`)
        .onSnapshot(docs => {
            let users = []
            if(docs!=null){
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setBookmarks(users)
                setLoading(false)
            }
        })

    firestore()
        .collection(`posts`)
        .onSnapshot(docs => {
            let posts = []
            if(docs!=null){
                docs.forEach(doc => {
                    posts.push({post: doc.data(), uid: doc.id})
                })
                setPosts(posts)
            }
        })

  }, [])

  const renderData = () => {
    return(
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <Text category='h1' style={{alignSelf: 'center', marginTop: 0, marginBottom: 5, marginLeft: windowWidth/2 - 50 ,flex: 1}}>Blogs</Text>
        <MessageIcon onPress={() => navigation.navigate('MessageList', {name: data[0].data.name, image: data[0].data.image})} name="message1" color='#8F9BB3' size={30} style={{alignSelf: 'center', marginRight: 20}} />
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