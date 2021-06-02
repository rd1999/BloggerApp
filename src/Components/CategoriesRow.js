import React, {useState, useEffect} from "react"
import { Text } from '@ui-kitten/components';
import {ImageBackground, TouchableWithoutFeedback, Dimensions, View} from "react-native"
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import BlogComponent from "./BlogComponent"

const CategoriesRow = ({uri1, uri2, text1, text2, navigation}) => {

    const width = Dimensions.get('window').width;
    const [posts, setPosts] = useState([])
    const [hashtags, setHashtags] = useState([])
    const [data,setData] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const [loading, setLoading] = useState(true)
    var blogpost = []
    var tags = []

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
                let users = []
                if(docs!=null){
                    docs.forEach(doc => {
                        users.push({post: doc.data(), uid: doc.id})
                    })
                    setPosts(users)
                }
            })

            firestore()
            .collection(`hashtags`)
            .onSnapshot(docs => {
                let users = []
                if(docs!=null){
                    docs.forEach(doc => {
                        users.push({data: doc.data(), uid: doc.id})
                    })
                    setHashtags(users)
                }
            })
    
      }, [])

    const onClickCategory1 = () => {
        hashtags.map((individualData) => {
            if(individualData.data.type.toLowerCase() === text1.toLowerCase()){
                tags.push(individualData.data.name.toLowerCase())
            }
        })
        tags = Array.from(new Set(tags))
        posts.map((post) => {
            const filteredArray = post.post.hashtags.filter(value => tags.includes(value));
            if(filteredArray.length > 0){
                // // alert(filteredArray.length)
                // return <BlogComponent post={post} loading={loading} data={data} navigation={navigation} book={bookmarks} />
                blogpost.push(post)   
            }
        })
        if(blogpost.length > 0){
            navigation.navigate('SearchedCategory', {name: text1, posts: blogpost, loading: loading, data: data, navigation: navigation, bookmarks: bookmarks})
            blogpost = []
        }else{
            alert('no posts in this category')
        }
    }

    const onClickCategory2 = () => {
        hashtags.map((individualData) => {
            if(individualData.data.type.toLowerCase() === text2.toLowerCase()){
                tags.push(individualData.data.name.toLowerCase())
            }
        })
        tags = Array.from(new Set(tags))
        posts.map((post) => {
            const filteredArray = post.post.hashtags.filter(value => tags.includes(value));
            if(filteredArray.length > 0){
                blogpost.push(post)   
            }
        })
        if(blogpost.length > 0){
            navigation.navigate('SearchedCategory', {name: text2, posts: blogpost, loading: loading, data: data, navigation: navigation, bookmarks: bookmarks})
            blogpost = []
        }else{
            alert('no posts in this category')
        }
    }

    var x = ''
    var y = ''

    switch (text1) {
        case 'Food':
            x = require('../images/Food.jpg')
            break
        case 'Lifestyle':
            x = require('../images/Lifestyle.jpg')
            break
        case 'SEO':
            x = require('../images/SEO.jpg')
            break
        case 'Blogging':
            x = require('../images/Blogging.jpg')
            break
        case 'Fitness':
            x = require('../images/Fitness.jpg')
            break
        case 'Photography':
            x = require('../images/Photography.jpg')
            break
        case 'Sports':
            x = require('../images/Sports.jpg')
            break
        case 'Travel':
            x = require('../images/Travel.jpg')
            break
        case 'Cars':
            x = require('../images/Car.jpg')
            break
        case 'News':
            x = require('../images/News.png')
            break
    }

    switch (text2){
        case 'Fashion':
            y = require('../images/Fashion.jpg')
            break
        case 'Political':
            y = require('../images/Political.jpg')
            break
        case 'Music':
            y = require('../images/Music.jpg')
            break
        case 'Gaming':
            y = require('../images/Gaming.jpg')
            break
        case 'Finance':
            y = require('../images/Finance.jpg')
            break
        case 'Parenting':
            y = require('../images/Parenting.jpg')
            break
        case 'Design':
            y = require('../images/Design.jpg')
            break
        case 'Movie':
            y = require('../images/Movie.jpg')
            break
        case 'DIY':
            y = require('../images/DIY.jpg')
            break
        case 'Business':
            y = require('../images/Business.jpg')
            break
    }
    


    return(
        <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={() => onClickCategory1()}>
                <ImageBackground
                    source={x}
                    style={{height: width/2 - 25, width: width/2 - 25, marginTop: 20, marginBottom: 5, marginLeft: 15}}
                    imageStyle={{borderRadius: 15}}
                >
                    {text1 === 'Photography'
                    ? <Text category='h4' style={{ color: '#fff' ,fontWeight: 'bold', alignSelf: 'center', marginTop: width/4-40}}>{text1}</Text>
                    : <Text category='h3' style={{ color: '#fff' ,fontWeight: 'bold', alignSelf: 'center', marginTop: width/4-40}}>{text1}</Text>}
                </ImageBackground>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => onClickCategory2()}>
                <ImageBackground
                    source={y}
                    style={{height: width/2 - 25, width: width/2 - 25, marginTop: 20, marginBottom: 5, marginLeft: 15}}
                    imageStyle={{borderRadius: 15}}
                >
                    <Text category='h3' style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center', marginTop: width/4-40}}>{text2}</Text>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default CategoriesRow