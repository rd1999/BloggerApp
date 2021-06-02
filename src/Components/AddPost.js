import React, {useState, useEffect, useRef} from "react"
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ImageBackground} from "react-native"
import { useIsFocused } from '@react-navigation/native'
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Layout, Text, Spinner, Button } from '@ui-kitten/components';
import RBSheet from "react-native-raw-bottom-sheet";
import HashTagIcon from "react-native-vector-icons/Fontisto"
import GifIcon from "react-native-vector-icons/MaterialIcons"
import PhotoIcon from "react-native-vector-icons/FontAwesome"
import AudioIcon from "react-native-vector-icons/FontAwesome5"
import LinkIcon from "react-native-vector-icons/Entypo"
import ImagePicker from 'react-native-image-crop-picker';
import Hello from "./Hello"

const AddPost = ({route, navigation}) => {

  const [data, setData] = useState([]);
  const [text, setText] = useState(false)
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState('')
  const refRBSheet = useRef();
  const childRef = useRef();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const {title, titleImage, hashtags, content} = route.params
  const isFocused = useIsFocused()

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

  }, [isFocused])

  const choosePhotoFromGallery = () => {   
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true
    }).then(image => {
      childRef.current.getAlert(image.path, image.path, "imageUrl")
    });
  }

  const chooseTitlePhotoFromGallery = () => {   
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true
    }).then(image => {
      setImage(image.path)
    });
  }

  function setTrue(){
    setText(true)
  }

  function setFalse(){
    setText(false)
  }

  function onPreview(){
    // alert(hashtags)
    if(hashtags !== undefined && hashtags != null){
      if(hashtags.length > 0){
        navigation.navigate('Preview', {title: title, titleImage: titleImage, html: html, name: data[0].data.name, profileImage: data[0].data.image, type: 'preview', hashtags: hashtags})
      }else{
        alert("Please add atleast one hashtag for people to find your post")
      }
    }else{
      alert("Please add atleast one hashtag for people to find your post")
    }
    
  }

  function onSave(){
    const {currentUser} = auth();
    firestore().
      collection(`users/${currentUser.uid}/drafts`)
      .add({
        title: title,
        titleImage: titleImage,
        content: html,
        hashtags: hashtags,
      })
      alert("saved as draft")
  }

  const renderData = () => {
    if(loading === false){
      // var str = data[0].data.name
      // str = str.split(" ").join("")
      return(
        <View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <HashTagIcon size={20} style={{paddingLeft: 20, alignSelf: 'center', paddingRight: 5, color: '#8F9BB3', marginTop: 20}} name='hashtag' onPress={() => navigation.navigate('Hashtags', {title: title, titleImage: titleImage})} />
            {/* <GifIcon size={50} style={{alignSelf: 'center', marginRight: 5, color: '#8F9BB3', marginTop: 20}} name='gif' /> */}
            <PhotoIcon size={20} style={{alignSelf: 'center', marginRight: 20, color: '#8F9BB3', marginTop: 20, marginLeft: 10}} name='photo' onPress={() => choosePhotoFromGallery()} />
            <AudioIcon size={20} style={{alignSelf: 'center', marginRight: 18, color: '#8F9BB3', marginTop: 20}} name='headphones' />
            <LinkIcon size={22} style={{alignSelf: 'center', marginRight: 5, color: '#8F9BB3', marginTop: 20}} name='link' />
            <Button onPress={() => onSave()} style={styles.button}>SAVE</Button>
            {text === true ? <Button onPress={() => onPreview()} style={styles.button}>PREVIEW</Button> : <Button style={styles.button} disabled={true}>PREVIEW</Button>}
          </View>
          <Text category='h5' style={{marginBottom: 10, marginLeft: 15}}>Add Description here...</Text>

          <View style={{borderWidth: 1, alignSelf: 'center', width: windowWidth-25, height: windowHeight-180, borderColor: '#fff'}}>
            <Hello ref={childRef} setTrue = {() => setTrue()} setFalse = {() => setFalse()} onChange = {(html) => setHtml(html)} content={content}/>
          </View>
        </View>
      )
    }else{
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner size='giant'/>
        </View>
      )
    }
  }

  return(
    <Layout style={{ flex: 1}}>
      {renderData()}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={200}
        animationType="fade"
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            borderColor: '#8F9BB3',
            borderTopWidth: 1,
            borderRadius: 20,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }
        }}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: '#000', fontSize: 18, paddingTop: 10, flex: 1, paddingLeft: windowWidth/2-40}}>Add tags</Text>
          <TouchableOpacity>
            <Text style={{color: '#51c4d3', fontWeight: 'bold', fontSize: 16, paddingRight: 10, paddingTop: 10}}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          {/* <Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 20, alignSelf: 'center', paddingRight: 5, color: '#000'}}>#</Text> */}
          <HashTagIcon size={20} style={{paddingLeft: 20, alignSelf: 'center', paddingRight: 5, color: '#000'}} name='hashtag' />
          <TextInput 
            placeholder="Add tags..." 
            style={{flex: 1, fontSize: 18}}
          />
        </View>
      </RBSheet>
    </Layout>
  )
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    marginTop: 20
  },
});

export default AddPost