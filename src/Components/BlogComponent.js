import React, {useState} from "react"
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Text, Divider } from '@ui-kitten/components';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import LikeIcon from "react-native-vector-icons/EvilIcons"
import LikeIconFill from "react-native-vector-icons/FontAwesome"
import CommentIcon from "react-native-vector-icons/EvilIcons"
import BookMarkIcon from "react-native-vector-icons/FontAwesome"

const BlogComponent = ({post, loading, data, navigation, bookmarks}) => {

    const [isLike, setIsLike] = useState('black')
    const windowWidth = Dimensions.get('window').width;

    var x = []

    const renderFollow = (post) => {
        if(loading === false){
          if(data[0].data.name !== post.post.name){
            return(
              <TouchableOpacity onPress={() => {}}>
                <Text style={{color: '#3edbf0', alignSelf: 'center', marginTop: 20, marginRight: 30}}>Follow</Text>
              </TouchableOpacity>
            )
          }
        }else{
          return(
            null
          )
        }
      }

    function like(post){
        setIsLike('red')
        if(loading === false){
            firestore().
            collection(`posts`)
            .doc(`${post.uid}`)
              .update({
                  likes: post.post.likes + 1,
                  likedBy: [...post.post.likedBy, {name: data[0].data.name, profileImage: data[0].data.image}]
                })
          }
      }
    
      function dislike(post){
        var array = [...post.post.likedBy]        
        if(loading === false){
            var index = array.findIndex(x => x.name === data[0].data.name && x.profileImage === data[0].data.image)
        }  
        if (index !== -1) {
            array.splice(index, 1);
        }
        setIsLike('black')
        firestore().
            collection(`posts`)
            .doc(`${post.uid}`)
              .update({
                  likes: post.post.likes - 1,
                  likedBy: array
                })
      }

    function renderIcon(post){
        if(isLike === 'black'){
            if(loading === false){
              var array = [...post.post.likedBy]
              var index = array.findIndex(x => x.name === data[0].data.name && x.profileImage === data[0].data.image)
                if(index === -1){
                    return(
                        <TouchableOpacity onPress={() => like(post)}>
                            <LikeIcon size={40} name="heart" style={styles.iconStyle} color='black' />
                        </TouchableOpacity>
                    )
                }else{
                  return(
                    <TouchableOpacity onPress={() => dislike(post)}>
                        <LikeIconFill size={30} name="heart" style={[styles.iconStyle, {marginLeft: 20}]} color='red' />
                    </TouchableOpacity>
                )
                }
            }else{
              return(
                null
              )
            }
        }else{
          return(
            <TouchableOpacity onPress={() => dislike(post)}>
                <LikeIconFill size={30} name="heart" style={[styles.iconStyle, {marginLeft: 20}]} color='red' />
            </TouchableOpacity>
        )
        }
    }

    const renderBookmark = (post) => {

          bookmarks.map((bookmark, index) => {
            index = bookmark.data.uid
            x.push(bookmark.data.uid === post.uid)
          })
          if(x.includes(true)){
            return <BookMarkIcon onPress={() => onBookmarkRemove(post)} name="bookmark" size={30} style={{alignSelf: 'center', marginRight: 20, color: 'red'}} />
          }else{
            return <BookMarkIcon onPress={() => onBookmark(post)} name="bookmark-o" size={30} style={{alignSelf: 'center', marginRight: 20, color: 'black'}} />
          }
      
    }

    const onBookmarkRemove = (post) => {
      var array = [...bookmarks]
      var index = array.findIndex(x => x.data.uid === post.uid)
      if (index !== -1) {
        var uid = (bookmarks[index].uid)
      }
      const {currentUser} = auth()
      firestore()
        .collection(`users/${currentUser.uid}/bookmarks`)
        .doc(`${uid}`)
        .delete()
        .then(() => {
        });
    }

    const onBookmark = async (post) => {

      const {currentUser} = auth()

      await firestore().
        collection(`users/${currentUser.uid}/bookmarks`)
        .add({
          post: post.post,
          uid: post.uid
        })

    };

    const onClickProfile = (post) => {
      // alert(post.post.name)
      if(post.post.profileImage === data[0].data.image){
        navigation.navigate('Profile')
      }else{
        navigation.navigate('OtherProfile', {name: post.post.name, profileImage: post.post.profileImage, userId: post.post.userId})
      }
    }

    return(
        <View style={{marginVertical: 15, marginHorizontal: 0, backgroundColor: '#fff', marginTop: -0}}>
            <Divider />
            <TouchableWithoutFeedback onPress={() => onClickProfile(post)}>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <ImageBackground
                  source={{uri: post.post.profileImage}}
                  style={{height: 30, width: 30, marginTop: 20, marginBottom: 5, marginLeft: 15}}
                  imageStyle={{borderRadius: 50}}
                ></ImageBackground>
                <Text style={{alignSelf: 'center', marginLeft: 10, marginTop: 15, color: '#000', fontWeight:'bold', flex: 1}}>{post.post.name}</Text>
                {renderFollow(post)}
              </View>
            </TouchableWithoutFeedback>
            <Divider style={{borderWidth: 0.5, borderColor: '#eee'}} />
            <Text style={{color: '#000', marginHorizontal: 15, marginTop: 20}} category='h4'>{post.post.title}</Text>
            <ImageBackground 
              source={{uri: post.post.titleImage}}
              style={{height: 350, width: windowWidth, marginTop: 10, marginBottom: 20}}
            >
            </ImageBackground>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginLeft: 15}}>
            {post.post.hashtags.map((hashtag, index) => {
              index=hashtag
              return <Text style={{fontStyle: 'italic', fontWeight: 'bold', marginRight: 5, color: '#000'}}>#{hashtag}</Text>
            })}
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('IndividualPost', {title: post.post.title, titleImage: post.post.titleImage, html: post.post.content, name: post.post.name, type: 'view', hashtags: post.post.hashtags})}>
              <Text style={{color: '#3edbf0', marginLeft: 15, marginBottom: 20, marginTop: 10}}>Read the whole blog</Text>
            </TouchableOpacity>
            <Divider style={{borderWidth: 0.5, borderColor: 'gray'}} />
            <View style={{flexDirection: 'row'}}>
                {renderIcon(post)}
                {loading === false 
                ? <CommentIcon onPress={() => navigation.navigate('Comments', {name: data[0].data.name, profileImage: data[0].data.image, post: post})} name="comment" style={{alignSelf: 'center', marginTop: -5, marginLeft: 15, flex: 1}} size={40} />
                : null}
                {renderBookmark(post)}
            </View>
            <View>
                <Text onPress={() => navigation.navigate('Likes', {likedBy: post.post.likedBy})} style={{color: '#000', fontWeight: 'bold', marginLeft: 20, marginBottom: 3}}>{post.post.likes} likes</Text>
            </View>
            {loading === false && post.post.comments.length > 0
            ? <Text onPress={() => navigation.navigate('Comments', {name: data[0].data.name, profileImage: data[0].data.image, post: post})} style={{color: 'gray', marginBottom: 10, marginLeft: 20}}>View all {post.post.comments.length} comments...</Text>
            : <Text></Text>}
            
          </View>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
      marginVertical: 10,
      marginLeft: 15,
      marginBottom: 10
    }
  })

export default BlogComponent