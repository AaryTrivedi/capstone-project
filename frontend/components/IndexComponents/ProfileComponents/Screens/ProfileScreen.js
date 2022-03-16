
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { BackHandler,Alert,TouchableOpacity,Text,ImageBackground,StyleSheet, View, Platform, Button, Image, ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function ProfileScreen({navigation}) {
    
    const [image, setImage] = useState(null);
    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMedialibraryPermission
            const { status1 } = await DocumentPicker.requestMedialibraryPermission
            if (status !== 'granted' || status1 !== 'granted') {
                alert('Permisson denied!')
            }
        }
    }, [])
    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri)
        }
    }
   

    return (
        <View style={Styles.container}>
            {image && <Image source={{ uri: image }}
                style={{ width: 200, height: 200 }} />}
            <Button title="Choose Image" onPress={PickImage} />
            
           
            <StatusBar style="auto" />
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
          height:'70%',
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