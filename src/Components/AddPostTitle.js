import React, {useState, useEffect, useRef} from "react"
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ImageBackground} from "react-native"
import { Layout, Text, Spinner, Button, Input } from '@ui-kitten/components'
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const AddPostTitile = ({navigation, route}) => {

    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const refRBSheet = useRef();

    async function getAlert(uri, name, firebasePath){
      const imageRef = storage().ref(`${firebasePath}/${name}`)
      await imageRef.putFile(uri, { contentType: 'image/jpg'}).catch((error) => { throw error })
      const url = await imageRef.getDownloadURL().catch((error) => { throw error });
      console.log(url)
      setImage(url)
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 350,
          compressImageMaxHeight: 350,
          cropping: true,
        }).then(image => {
          setImage(image.path)
          refRBSheet.current.close()
        });
      }
    
      const choosePhotoFromGallery = () => {   
        ImagePicker.openPicker({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 400,
          cropping: true
        }).then(image1 => {
            getAlert(image1.path, image1.path, "imageUrl")
            refRBSheet.current.close()
        });
      }

    const onButtonPress = () => {
        if(image && text != ''){
            navigation.replace('AddPost', {title: text, titleImage: image, content: ''})
        }else{
          null
        }
    }

    return(
        <Layout style={{ flex: 1}}>
            <Text category='h3' style={{margin: 15, marginTop: 50}}>Add title and title image here</Text>
            <Input 
              size='large'
              placeholder="Add title here..."  
              value={text}
              onChangeText={(text) => setText(text)}
              style={{textAlignVertical: 'top', fontSize: 18, color: '#8F9BB3', marginHorizontal: 20}} 
            />
            {image != '' 
            ?
            <ImageBackground 
                source={{uri: image}}
                style={{height: 350, width: 350, alignSelf: 'center', marginTop: 20, marginBottom: 10}}
              >
              </ImageBackground> 
            : null}
            <Button status='basic' style={{margin: 15, marginBottom: 5}} onPress={() => choosePhotoFromGallery()}>Add title image here</Button>
            {image != '' && text != '' 
            ? <Button status='basic' style={{margin: 15}} onPress={() => onButtonPress() }>Click here to add descriptions</Button>
            : null}
            <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
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
        <View style={{marginTop: 20}}>
          <Text style={{alignSelf: 'center', paddingBottom: 5, color: '#000'}} category='h4'>Upload Photo</Text>
          <Text style={{alignSelf: 'center', paddingBottom: 10, color: '#000'}}>Choose title image here</Text>
          <Button style={styles.button} size='medium' status='info' onPress={() => takePhotoFromCamera()}>Take Photo</Button>
          <Button style={styles.button} size='medium' status='info' onPress={() => choosePhotoFromGallery()}>Choose from Library</Button>
          <Button style={styles.button} size='medium' status='info' onPress={() => refRBSheet.current.close()}>Cancel</Button>
        </View>
      </RBSheet>
        </Layout>
    )
}

const styles = StyleSheet.create({
    button: {
      margin: 10,
      marginHorizontal: 15
    }
  })

export default AddPostTitile

