import React, {useEffect, useState} from "react"
import {StatusBar} from "react-native"
import { ApplicationProvider, Layout, Spinner, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AuthRouter from "./AuthRouter"
import MainRouter from "./MainRouter"
import { ThemeContext } from './theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'core-js/es/array';

// // symbol polyfills
// global.Symbol = require('core-js/es6/symbol');
// require('core-js/fn/symbol/iterator');

// // collection fn polyfills
// require('core-js/fn/map');
// require('core-js/fn/set');
// require('core-js/fn/array/find');

const App = () => {

    const [loggedIn, setLoggedIn] = useState(null);
    const [theme, setTheme] = useState('light') 


    useEffect(() => {

        var firebaseConfig = {
            apiKey: "AIzaSyAVj6Y_k4glVtswGH-tYwfso2Cu1kzaq9s",
            authDomain: "blog-d5f37.firebaseapp.com",
            databaseURL: "https://blog-d5f37.firebaseio.com",
            projectId: "blog-d5f37",
            storageBucket: "blog-d5f37.appspot.com",
            messagingSenderId: "89170430754",
            appId: "1:89170430754:web:33247b511fee6da81bf37b"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // auth().signOut()

        auth().onAuthStateChanged((user) => {
            if(user){
                setLoggedIn(true);
            }else{
                setLoggedIn(false);
            }
        })

        getData()
    
    }, [])

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('theme', value)
        } catch (e) {
          console.log(e)
        }
      }

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('theme')
          if(value !== null) {
            setTheme(value)
          }else{
            storeData('light')
          }
        } catch(e) {
          console.log(e)
        }
      }

    const renderContent = () => {
        switch(loggedIn){
            case true:
                return(
                    <>
                        <StatusBar backgroundColor="#222B45" />
                        {/* {loading === false? setTheme(data[0].data.theme):null}  */}
                        <MainRouter />
                    </>
                )
            case false:
                return(
                    <>
                        {/* <StatusBar backgroundColor="#1d2447" /> */}
                        <AuthRouter />
                    </>
                )
            default:
                return(
                    <>
                        <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Spinner size='giant' />
                        </Layout>
                    </>
                )
        }
    }

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'; 
        setTheme(nextTheme);
      };

    return(
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider {...eva} theme={eva[theme]}>
                    <Layout style={{ flex: 1}}>
                        {renderContent()}
                    </Layout>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </React.Fragment>
    )
}

export default App