import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert,TouchableOpacity,Text,ImageBackground,StyleSheet, View, Platform, Button, Image,Document, ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { createStackNavigator } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function DocumentScreen({navigation}) { 
        return (
        
            <View>
                <ImageBackground source={require('../../../assets/login.png')}
                    style={
                        [Styles.imgBackground, { height: '100%', opacity: 0.5, width: '100%' }]
                    }>
                    <ScrollView style ={Styles.scrollView}>
    
                        <View style={Styles.container} >
                            <Image resizeMode={'contain'} source={require('../../../assets/document.png')}
                                style={Styles.img} />
                        
                            <Text style={Styles.titleText} >Documents</Text>
                            
                            <TouchableOpacity  onPress= { () => navigation.navigate('Profile Screen')}  style={Styles.btn}><Text style={Styles.text}>Profile Photo</Text></TouchableOpacity>
                            
                            <TouchableOpacity onPress= { () => navigation.navigate('ProofOfWorkEligibility')}  style={Styles.btn}><Text style={Styles.text}>Prood of Work Eligibility</Text></TouchableOpacity>
                            <TouchableOpacity onPress= { () => navigation.navigate('Drivers License')}  style={Styles.btn}><Text style={Styles.text}>Driver's License</Text></TouchableOpacity>

                            <TouchableOpacity  onPress= { () => navigation.navigate('Legal Agreement')} style={Styles.btn}><Text style={Styles.text}>Legal Agreemnets</Text></TouchableOpacity>
                            <TouchableOpacity  onPress= { () => navigation.navigate('Vehical Insepection')} style={Styles.btn}><Text style={Styles.text}>Vehical Inspection</Text></TouchableOpacity>
                            <TouchableOpacity  onPress= { () => navigation.navigate('Vehical Insurance')} style={Styles.btn}><Text style={Styles.text}>Vehical Insurace</Text></TouchableOpacity>
                            <TouchableOpacity  onPress= { () => navigation.navigate('Vehical Registration')} style={Styles.btn}><Text style={Styles.text}>Vehical Registration</Text></TouchableOpacity>


                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }


const Styles = StyleSheet.create({
      container: {
          fontSize: 30,
          flex: 2,
          justifyContent:'center',
          alignItems:'center'
      },
      imgBackground:{
          alignSelf:'center',
      },
      img:{
          marginTop:'35%',
          marginRight:'1%',
          alignSelf:'center',
          height:'40%',
          width:'100%'
      },
      titleText: {
          flex: 3,
          fontSize: 30,
          fontWeight: "bold"
      },
      btn: {
          borderColor:'rgba(0,0,0,0.2)',        
          height: 70,
          marginBottom: '5%',
          backgroundColor: 'white',  
          width: "100%",
          borderRadius: 20,
          elevation: 3,
          paddingHorizontal: 32,
          borderWidth: 1,
          justifyContent: 'center',
          
          
      },
      textStyle: {
          backgroundColor: '#fff',
          fontSize: 15,
          marginTop: 16,
          marginLeft: 35,
          marginRight: 35,
          textAlign: 'center',
        },
      text:{
          paddingVertical:'0%',
          opacity: 0.5,
          fontSize: 20,
          letterSpacing: 0.25,
          fontWeight: "bold"

          
      },
  
    scrollView: {
        height: '100%',
        width: '100%',
        margin: 20,
        alignSelf: 'center',
        padding: 20,
        borderRadius: 5,
        marginHorizontal: 10,
      }
  })