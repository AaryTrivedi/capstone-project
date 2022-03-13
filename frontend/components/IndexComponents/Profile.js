import React, { Component, useContext } from 'react';
<<<<<<< HEAD
import { View, ScrollView,StyleSheet,Text,Button,Image,TouchableOpacity } from 'react-native';
=======
import { ScrollView,View,StyleSheet,Text,Button,Image,TouchableOpacity } from 'react-native';
>>>>>>> CP-114-admin-panel-endpoints
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import DocumentUpload from './ProfileComponent/DocumentUpload';


export default function Profile({navigation}){

  const authContext = useContext(AuthContext);

  const logout = async () => {
      AsyncStorage.removeItem("user");
      await SecureStore.deleteItemAsync("token");
      authContext.logoutUser();
  };

    return (
        <ScrollView>
<<<<<<< HEAD
            <View style={Styles.container}>
                <Text>Profile</Text>
            <TouchableOpacity onPress={logout}><Text style={Styles.icon}> Sign out</Text></TouchableOpacity>
            </View>
=======
        <View style={Styles.container}>
            <Text>Profile</Text>
           
        <TouchableOpacity onPress={logout}><Text style={Styles.icon}> Sign out</Text></TouchableOpacity>
        </View>
         <DocumentUpload/>
>>>>>>> CP-114-admin-panel-endpoints
        </ScrollView>
    );
  }
const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
})


