import React, {useState, useEffect} from "react"
import { Layout, Text, Button, Input, Icon } from '@ui-kitten/components';
import {View, Dimensions, TouchableWithoutFeedback, StyleSheet} from "react-native"
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const ChangeCredentials = ({navigation, route}) => {

    const [text, setText] = useState('')
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [newPassword, setNewPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [newsecureTextEntry, setNewSecureTextEntry] = useState(true);
    const [error, setError] = useState('')
    const [posts, setPosts] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const [profile, setProfile] = useState([])

    const {type} = route.params
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
                    if(type === 'name'){
                        setText(users[0].data.name)
                    }

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
                        users.push({data: doc.data(), uid: doc.id})
                    })
                    setPosts(users)
                    setLoading(false)

                }
            })
            
            firestore()
            .collection(`profile`)
            .onSnapshot(docs => {
                let users = []
                if(docs!=null){
                    docs.forEach(doc => {
                        users.push({data: doc.data(), uid: doc.id})
                    })
                    setProfile(users)
                }
            })
    
    }, [])

    const toggleSecureEntry = () => {
        if(text){
            setSecureTextEntry(!secureTextEntry);
        }
    };

    const newtoggleSecureEntry = () => {
        if(newPassword){
            setNewSecureTextEntry(!newsecureTextEntry);
        }
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const newrenderIcon = (props) => (
        <TouchableWithoutFeedback onPress={newtoggleSecureEntry}>
          <Icon {...props} name={newsecureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const onChangeName = () => {
        if(loading === false){

            const {currentUser} = auth();

            bookmarks.map((bookmark) => {
                if(bookmark.data.post.profileImage === data[0].data.image){
                  // console.log(bookmark.uid)
                  var post = bookmark.data.post
                  post.name = text
                  firestore().
                  collection(`users/${currentUser.uid}/bookmarks`)
                  .doc(`${bookmark.uid}`)
                    .update({
                        post: post,
                      })
                }
              })

            posts.map((post) => {
                if(post.data.userId === data[0].uid){
                  firestore().
                  collection(`posts`)
                  .doc(`${post.uid}`)
                    .update({
                        name: text,
                      })
                }
              })

              if(loading === false){
                profile.map((post) => {
                  if(post.data.userId === data[0].uid){
                    firestore().
                      collection(`profile`)
                      .doc(`${post.uid}`)
                        .update({
                            name: text,
                          })
                  }
                })
              }

            firestore().
                collection(`users/${currentUser.uid}/name`)
                .doc(`${data[0].uid}`)
                .update({
                    name: text,
                    })
            setText('')
            navigation.goBack()
        }
    }

    const reauthenticate = (currentPassword) => {
        var user = auth().currentUser
        var cred = auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential(cred)
    }

    const onChangePassword = () => {

        reauthenticate(text).then(() => {
            var user = auth().currentUser
            user.updatePassword(newPassword).then(() => {
                alert("password was changed")
                setText('')
                setNewPassword('')
                setError('')
                navigation.goBack()
            }).catch((error) => {
                alert(error.message)
            })
        }).catch((error) => {
            setError(error.message)
        })

    }

    const onChangeEmail = () => {

        reauthenticate(newPassword).then(() => {
            var user = auth().currentUser
            user.updateEmail(text).then(() => {
                alert("email was changed")
                setText('')
                setNewPassword('')
                setError('')
                navigation.goBack()
            }).catch((error) => {
                alert(error.message)
            })
        }).catch((error) => {
            setError(error.message)
        })

    }

    const renderName = () => {
        return(
            <View style={{flex: 1}}>
                {text !== ''
                ? <Button onPress={() => onChangeName()} style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>Save</Button>
                : <Button disabled style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>Save</Button>}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
                    <Text category='h4' style={{marginBottom: 15}}>Change {type}</Text>
                    <View style={{width: windowWidth - 40}}>
                        <Input 
                            placeholder='Name'
                            style={{marginBottom: 20}}
                            size="large"
                            value={text}
                            onChangeText={(text) => setText(text)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const renderEmail = () => {
        return(
            <View style={{flex: 1}}>
                {text !== '' && newPassword !== ''
                ? <Button onPress={() => onChangeEmail()} style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>Save</Button>
                : <Button disabled style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>Save</Button>}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
                    <Text category='h4' style={{marginBottom: 15}}>Change {type}</Text>
                    <View style={{width: windowWidth - 40}}>
                        <Input 
                            placeholder='New email'
                            style={{marginBottom: 20}}
                            size="large"
                            value={text}
                            onChangeText={(text) => setText(text)}
                        />

                        <Input 
                            accessoryRight={newrenderIcon}
                            placeholder='Password'
                            style={{marginBottom: 20}}
                            size="large"
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            secureTextEntry={newsecureTextEntry}
                        />

                    </View>
                </View>
            </View>
        )
    }

    const renderPassword = () => {
        return(
            <View style={{flex: 1}}>
                {text !== '' && newPassword !== ''
                ? <Button onPress={() => onChangePassword()} style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>Save</Button>
                : <Button disabled style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>Save</Button>}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
                    <Text category='h4' style={{marginBottom: 15}}>Change {type}</Text>
                    <View style={{width: windowWidth - 40}}>
                        <Input 
                            accessoryRight={renderIcon}
                            placeholder='Current password'
                            style={{marginBottom: 20}}
                            size="large"
                            value={text}
                            onChangeText={(text) => setText(text)}
                            secureTextEntry={secureTextEntry}
                        />

                        <Input 
                            accessoryRight={newrenderIcon}
                            placeholder='New password'
                            size="large"
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            secureTextEntry={newsecureTextEntry}
                        />
                    </View>
                    {error !== '' ? <Text style={styles.errorStyle}>{error}</Text> : null}
                </View>
            </View>
        )
    }

    return(
        <Layout style={{ flex: 1 }}>
            {type === 'name' ? renderName() : null}
            {type === 'email' ? renderEmail() : null}
            {type === 'password' ? renderPassword() : null}
        </Layout>
    )
}

const styles = StyleSheet.create({
    errorStyle: {
        marginHorizontal: 20,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 20
    }
})

export default ChangeCredentials