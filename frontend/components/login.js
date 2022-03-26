import React, { useContext, useState } from 'react'
import { Button } from 'native-base'
import axios from 'axios';
import { Alert, View, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native'
import Loading from './Loading';
import { setToken } from "../helpers/Token";
import { setUser } from "../helpers/user"
import { AuthContext } from '../context/AuthContext';


const API_URL =
    Platform.OS === "android"
        ? "http://192.168.0.158:4000"
        : "http://localhost:4000";


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidate, setEmailValidate] = useState(false);
    const [passValidate, setPassValidate] = useState(false);
    const [error, setError] = useState();
    const [submitBtn, setSubmitBtn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const authContext = useContext(AuthContext);

    // useEffect(()=>{
    //     delete_Token_user(navigation);
    // },[navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Screen was focused
            // Do something
            setEmail(email)
            setPassword(password)
            setEmailValidate(emailValidate)
            setPassValidate(passValidate)
            setError(error)
            setSubmitBtn(submitBtn)

        });

        return unsubscribe;
    }, [navigation]);

    const handleEmail = (text) => {
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(text)) {
            setError("Please enter valid email"),
                setEmailValidate(false),
                setSubmitBtn(true)
            return false
        }
        else {
            setEmail(text)
            setEmailValidate(true)
            setSubmitBtn(false)
            setError('')
            return true
        }
    }
    const handlePassword = (text) => {
        if (text.trim() === "") {
            setError("Password field can not be empty"),
                setPassValidate(false)
            setSubmitBtn(true)
            return false
        }
        else if (emailValidate) {
            setPassword(text)
            setSubmitBtn(false)
            setPassValidate(true)
            setError('')
            return true
        }
    }
    const handleSubmit = async (e) => {
        if (emailValidate && passValidate) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                setIsLoading(true);
                const { data } = await axios.post(
                    `${API_URL}/users/login`,
                    {
                        email, // R@P.com
                        password, // Rutik123
                    },
                    config
                );
                await setToken(data.data.token);
                await setUser(data.data.user);
                authContext.signInUser();
                // setIsLoading(false);
            } catch (e) {
                if (e.response === undefined || e.response === null || e.response === ""){
                    setIsLoading(false)
                    Alert.alert(e.message) 
                }
                else {
                    setIsLoading(false)
                    Alert.alert(JSON.stringify(e.response.data.error))
                    return
                }
                setIsLoading(false)
            }
        }
        else {
            setIsLoading(false)
           
        }
    }
    return (
        <>
            <ImageBackground
                source={require('../assets/login.png')}
                style={
                    { height: Dimensions.get('screen') }.height
                }
            >
                <View style={styles.container}>
                    <Text style={styles.heading}>Login</Text>
                    <TextInput placeholder={"Enter your Email"}
                        returnKeyType="next"
                        autoCapitalize='none'
                        style={[styles.input,
                        !emailValidate ? null : styles.success]}
                        onChangeText={(text) => handleEmail(text)}
                    />
                    <TextInput placeholder={"Enter your password"}
                        returnKeyType="go"
                        secureTextEntry={true}
                        onChangeText={(text) => handlePassword(text)}
                        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%" }}
                    />
                    <Text style={styles.errMsg}>{error}</Text>
                    <Text></Text>
                    <View style={{ width: "80%" }}>
                        <Button disabled={submitBtn} // submitbtn value is true then the button will be disabled
                            style={passValidate && emailValidate ? styles.enabled : styles.disabled}//passBtn and emailBtn helps the button to define the css to use if both are true then and then the css of enable will be applied
                            onPress={() => handleSubmit()}
                        >Login</Button>
                        <Text></Text>

                        <Button style={styles.btn2}>forgot password </Button>
                        
                        <View style={styles.signupTextCont}>
                            <Text style={styles.signupText}>Don't have account yet?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={styles.signupButton}> Sign Up</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                {isLoading ? <Loading /> : null}
            </ImageBackground>
        </>
    )
}
const styles = StyleSheet.create({
    enabled: {
        backgroundColor: '#21A656',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        alignSelf: "center",
        textAlign: "center",
    },
    disabled: {
        backgroundColor: '#90d3ab',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        alignSelf: "center",
        textAlign: "center",
        opacity: 0.5,
        color: 'black'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 20,
        alignSelf: "center",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    signupText: {
        fontSize: 16,
    },
    signupButton: {
        fontSize: 20,
        justifyContent: "center",
        alignSelf: "center",
        fontWeight: '500',
    },
    input: {
        borderColor: 'black',
        height: 42,
        width: "80%",
        borderBottomWidth: 1,
        marginTop: "5%"
    },
    btn2: {
        backgroundColor: '#010101',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        color: 'black',
        alignSelf: "center",
        textAlign: "center"
    },

    heading: {
        color: '#000000',
        fontSize: 42,
        alignSelf: "center",
        textAlign: "center"
    },
    error: {
        borderColor: 'red',
        height: 42,
        width: "80%",
        borderBottomWidth: 1,
        marginTop: "5%"
    },
    success: {
        borderColor: '#006400',
        height: 42,
        width: "80%",
        borderBottomWidth: 1,
        marginTop: "5%"
    },
    errMsg: {
        fontWeight: 'bold',
        color: 'red'
    }
})