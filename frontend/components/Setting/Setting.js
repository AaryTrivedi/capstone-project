import React, { useEffect } from 'react';
import {View,StyleSheet,Text, ImageBackground,Dimensions,ScrollView,Image, Switch,TouchableOpacity,} from 'react-native';
import { Icon } from 'react-native-elements';
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton, Colors } from 'react-native-paper';
import { getUser } from '../../helpers/user';

export default function Setting({ navigation }) {
    const [user, setUser] = useState('John Doe');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

   
    const set = <Icon name='settings' size={40} color="white"/>;
    const setq = <Icon name='chevron-right' size={25} />;
    const plus = <Ionicons name = 'plus' size={20}/>;

    useEffect(() => {
        getUser()
            .then(user => {
                setUser(user.firstName + " " + user.lastName)
            })
    }, [])

    const navigateToDocuments = () => {
        navigation.navigate("DocumentUpload")
    }

    const navigateToResetPassword = () => {
        navigation.navigate("ResetPassword");
    }

    const navigateToAddCard = () => {
        navigation.navigate("AddCard");
    }

    const navigateToTerms = () => {
        navigation.navigate("Terms");
    }

    const navigateToAbout = () => {
        navigation.navigate("AboutUs");
    }

   
      return(
        <ScrollView>
        <ImageBackground    source={require('../../assets/export.png')}
                            style={{ height: Dimensions.get('screen') }.height
                            }>
            <View style={Styles.container}>
                <View style={Styles.flexA}>
                    <Text style={Styles.fText}>Settings</Text>
                </View>
                <View style={Styles.parentContainer}>
                    <View style={Styles.profileContainer}>
                    <Text style={{fontSize : 25}}><Image source={require('../../assets/user.png')} style={{width: 40, height: 40, borderRadius: 40/ 2}}/>  {user}</Text>
                    </View>
                    <View
                            style={{
                                borderBottomColor: "#CCCCCC",
                                borderBottomWidth: 1,
                            }}
                    />
                    <View style={Styles.setContainer}>
                        <View style={Styles.label}>
                            <Text style={{fontSize : 20 , color : '#ADADAD'}}>Account Settings</Text>
                        </View>
                        <View style={Styles.label}>
                            <Text style={{fontSize : 20 }}>Change email </Text>
                            <IconButton
                                        icon="chevron-right"
                                        color={Colors.black500}
                                        size={25}
                                        onPress={() => console.log('Pressed')}
                            />
                        </View>
                        <TouchableOpacity onPress={navigateToResetPassword} style={Styles.label}>
                            <Text style={{fontSize : 20 }}>Change password </Text>
                            <IconButton
                                        icon="chevron-right"
                                        color={Colors.black500}
                                        size={25}
                                        onPress={() => console.log('Pressed')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToDocuments} style={Styles.label}>
                            <Text style={{fontSize : 20 }}>Become a driver </Text>
                            <IconButton
                                        icon="chevron-right"
                                        color={Colors.black500}
                                        size={25}
                                        onPress={() => console.log('Pressed')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToAddCard} style={Styles.label}>
                            <Text style={{fontSize : 20 }}>Add a payment method </Text>
                            <IconButton
                                        icon="plus"
                                        color={Colors.black500}
                                        size={25}
                                        onPress={() => console.log('Pressed')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                            style={{
                                borderBottomColor: "#CCCCCC",
                                borderBottomWidth: 1,
                            }}
                    />
                    <View style={Styles.setContainer}>
                        <View style={Styles.label}>
                            <Text style={{fontSize : 20 , color : '#ADADAD'}}>More</Text>
                        </View>
                        <TouchableOpacity onPress={navigateToAbout} style={Styles.label}>
                            <Text style={{fontSize : 20 }}>About Us </Text>
                            <IconButton
                                        icon="chevron-right"
                                        color={Colors.black500}
                                        size={25}
                                        onPress={() => console.log('Pressed')}
                            />
                        </TouchableOpacity>
                        <View style={Styles.label}>
                            <Text style={{fontSize : 20 }}>Privacy policy </Text>
                            <IconButton
                                        icon="chevron-right"
                                        color={Colors.black500}
                                        size={25}
                                        onPress={() => console.log('Pressed')}
                            />
                        </View>
                        <TouchableOpacity onPress={navigateToTerms} style={Styles.label}>
                            <Text style={{fontSize : 20 }}>Terms and conditions </Text>
                            <IconButton
                                        icon="chevron-right"
                                        color={Colors.black500}
                                        size={25}
                                        onPress={() => console.log('Pressed')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                          
            </View>
        </ImageBackground>
        </ScrollView>
  )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    flexA:{
        marginTop : "5%",
        marginLeft : "10%",
        alignItems: 'stretch'

    },
    fText:{
        fontSize : 35,
        color : "white"
    },
    profileContainer : {
        marginLeft :'5%',
        marginBottom : '5%',
        marginTop : '5%'
      
    },
    parentContainer: {
        flex:2,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        marginLeft: '4%',
        marginRight: '4%',
        marginTop: '4%',
    },
    setContainer:{
        marginLeft :'5%',
        marginBottom : '5%',
        marginTop : '5%'
    },
    label:{
        marginRight : '5%',
        marginLeft :'3%',
        marginBottom : '2%',
        marginTop : '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    }
})
