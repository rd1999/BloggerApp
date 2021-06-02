import React, {useState} from "react"
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native"
import auth from "@react-native-firebase/auth";
import { Icon, Text, Input, Button, Layout, Spinner } from '@ui-kitten/components';

const SignUp = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function onButtonPress() {
        setLoading(true)

        if(email && password){
            setError("");

            await auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    setEmail('');
                    setPassword('');
                    setError('')
                })
                setLoading(false)
                .catch(() => {
                    setLoading(false)
                    setError("Invalid Email or Password!!!")
                })
        }else{
            setLoading(false)
            setError("Please fill all the fields");
        } 
    }
    
    var colour = '#1d2447'

    const toggleSecureEntry = () => {
        if(password){
            setSecureTextEntry(!secureTextEntry);
        }
    };
    
    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    return(
        <Layout style={{flex: 1}}>
            <View style={[styles.containerStyle]}>
                <Text style={styles.textStyle} category='h2'>Welcome to Blogger</Text>
                <Text style={styles.subtextStyle} category='h5'>Post anything:</Text>
                <Text style={styles.subtextStyle} category='h5'>Text, GIFs, Photos,</Text>
                <Text style={styles.subtextStyle} category='h5'>whatever.</Text>

                <View style={styles.formStyle}>
                    <Input
                        style={styles.textInputStyle}
                        size='large'
                        placeholder='Email'
                        value={email}
                        onChangeText={nextValue => setEmail(nextValue)}
                    />
                    <Input
                        value={password}
                        placeholder='Password'
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                        style={styles.textInputStyle}
                        size="large"
                    />
                </View>

                {loading === false 
                ? <Button style={styles.button} size='medium' status='basic' appearance="outline" onPress={onButtonPress}>Login</Button>
                : <View style={{alignItems: 'center', margin: 40, marginBottom: 40}}><Spinner size="large" style={{alignSelf: 'center'}} /></View>}
                <Text style={styles.errorTextStyle} category='h6'>{error}</Text>
                <Text style={styles.linkStyle}>Don't have an account?</Text>
                <Text style={styles.linkStyle} onPress={() => navigation.navigate('signup')}>Signup</Text>

            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        paddingHorizontal: 30,
        marginBottom: 10,
        alignSelf: 'center'
    },
    containerStyle: {
        paddingTop: 70,
        flex: 1
    },
    subtextStyle: {
        marginTop: 3,
        alignSelf: 'center',
        letterSpacing: 1,
    },
    formStyle: {
        marginTop: 80,
        paddingHorizontal: 30
    },
    textInputStyle: {
        marginVertical: 10
    },
    button: {
        margin: 40,
        marginBottom: 20
    },
    linkStyle: {
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },
    errorTextStyle: {
        color: 'red',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 50

    }
})

export default SignUp