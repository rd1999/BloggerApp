import React, {useState, useEffect} from "react"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Divider, Layout, Text } from '@ui-kitten/components';
import { ScrollView } from "react-native";
import BlogComponent from "./BlogComponent"

const BookmarkedBlogs = ({navigation}) => {

    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([])

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

    return(
        <Layout style={{ flex: 1 }}>
            <Text category='h4' style={{fontWeight: 'bold', marginVertical: 10, alignSelf: 'center'}}>Bookmarks</Text>
            <Divider />

            <ScrollView style={{flex: 1, marginBottom: 0}}>
                {bookmarks.map((bookmark) => {
                    console.log(bookmark.data.post)
                    return <BlogComponent post={bookmark.data} loading={loading} data={data} navigation={navigation} bookmarks={bookmarks} /> 
                })}
            </ScrollView>

        </Layout>
    )
}

export default BookmarkedBlogs