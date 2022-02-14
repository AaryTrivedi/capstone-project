import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { Alert,ImageBackground,Image,Linking,TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { androidCameraPermission } from './permission';

export default function Document(){

   const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert(
        'Choose PDF file',
        'Choose an option',
        [
          { text: 'Camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => { } }
        ]
      )
    }
  }

  const onCamera = () => {
   
  }

  const onGallery = () => {
    DocumentPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("selected Image", image)
      imageUpload(image.path)
    });
  }

  const imageUpload = (imagePath) => {
    const imageData = new FormData()
    imageData.append("file", {
      uri: imagePath,
      name: 'image.png',
      fileName: 'image',
      type: 'file/pdf'
    })
    console.log("form data", imageData)
    axios({
      method: 'post',
      url: '',
      data: imageData
    })
      .then(function (response) {
        console.log("image upload successfully", response.data)
      }).then((error) => {
        console.log("error riased", error)
      })
  }


    return (
        <View >
            <ImageBackground source={require('../../../assets/login.png')}
                    style={
                        [Styles.imgBackground, { height: '100%',opacity:0.5, width: '100%' }]
                    }>
                <ScrollView>
    
                <View style={Styles.container} >
                        <Image resizeMode={'contain'} source={require('../../../assets/document.png')}
                        style={Styles.img} />
                        
                        <Text style={Styles.titleText} >Documents</Text>
                        <TouchableOpacity  onPress ={onSelectImage} style={Styles.btn}><Text style={Styles.text}>Profile Photo</Text></TouchableOpacity>

                        <TouchableOpacity   style={Styles.btn}><Text style={Styles.text}>Prood of Work Eligibility</Text></TouchableOpacity>
                        <TouchableOpacity  style={Styles.btn}><Text style={Styles.text}>Driver's License</Text></TouchableOpacity>

                        <TouchableOpacity   style={Styles.btn}><Text style={Styles.text}>Legal Agreemnets</Text></TouchableOpacity>
                        <TouchableOpacity   style={Styles.btn}><Text style={Styles.text}>Vehical Inspection</Text></TouchableOpacity>
                        <TouchableOpacity   style={Styles.btn}><Text style={Styles.text}>Vehical Insurace</Text></TouchableOpacity>
                        <TouchableOpacity   style={Styles.btn}><Text style={Styles.text}>Vehical Registration</Text></TouchableOpacity>


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
        height:'50%',
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
    },

    scrollView: {
        marginHorizontal: 60,
    }
})