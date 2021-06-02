import React, {useState, useEffect} from 'react';
import { StyleSheet, Switch, View, TouchableWithoutFeedback } from 'react-native';
import auth from "@react-native-firebase/auth";
import { Divider, TopNavigation, Layout, Text } from '@ui-kitten/components';
import LogoutIcon from "react-native-vector-icons/Feather"
import PasswordIcon from "react-native-vector-icons/Feather"
import NameIcon from "react-native-vector-icons/Ionicons"
import EmailIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { ThemeContext } from '../theme-context';
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const themeContext = React.useContext(ThemeContext);
  const [theme, setTheme] = useState('')
  const [data, setData] = useState([])
  const {currentUser} = auth()

  useEffect(() => {

    getData()

}, [])

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('theme')
    if(value !== null) {
      setTheme(value)
      if(value === 'dark'){
        setIsEnabled(true)
      }
    }
  } catch(e) {
    // error reading value
  }
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('theme', value)
  } catch (e) {
    // saving error
  }
}


const toggleSwitch = () => {
  setIsEnabled(previousState => !previousState)
  themeContext.toggleTheme()
  if(theme === 'light'){
    storeData('dark')
    setTheme('dark')
  }else{
    storeData('light')
    setTheme('light')
  }
}

  return (
    <Layout style={{flex: 1}}>
      <React.Fragment>
        <TopNavigation
          title={<Text category='h4'>Settings</Text>}
        />
        <Divider/>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.listStyle}>Dark mode</Text>
          <View style={{paddingTop: 20, paddingRight: 5}}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <Divider/>

        <TouchableWithoutFeedback onPress={() => auth().signOut()}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 20, paddingLeft: 10}}>
              <LogoutIcon name="power" size={25} color='#8F9BB3' />
            </View>
            <Text style={styles.listStyle}>Log out</Text>
          </View>
        </TouchableWithoutFeedback>

        <Divider/>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('ChangeCredentials', {type: 'name'})}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 20, paddingLeft: 10}}>
              <NameIcon name="person" size={25} color='#8F9BB3' />
            </View>
            <Text style={styles.listStyle}>Change name</Text>
          </View>
        </TouchableWithoutFeedback>

        <Divider/>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('ChangeCredentials', {type: 'email'})}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 20, paddingLeft: 10}}>
              <EmailIcon name="email" size={25} color='#8F9BB3' />
            </View>
            <Text style={styles.listStyle}>Update email</Text>
          </View>
        </TouchableWithoutFeedback>

        <Divider/>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('ChangeCredentials', {type: 'password'})}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingTop: 20, paddingLeft: 10}}>
              <PasswordIcon name="lock" size={25} color='#8F9BB3' />
            </View>
            <Text style={styles.listStyle}>Update password</Text>
          </View>
        </TouchableWithoutFeedback>

        <Divider />

      </React.Fragment>
    </Layout>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    paddingLeft: 10,
    paddingVertical: 20,
    fontSize: 18,
    flex: 1
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Settings