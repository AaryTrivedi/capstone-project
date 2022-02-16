import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native';
import { Button , AppRegistry} from 'react-native-paper';
import { Alert,ImageBackground,Image,Linking,TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import DocumentPicker from "react-native-document-picker";
import axios from 'axios';

export default class  Document extends Component {
  async openDoc(){
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type,
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        
      } else {
        throw err;
      }
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
                        <TouchableOpacity  onPress ={() => this.openDoc()} style={Styles.btn}><Text style={Styles.text}>Profile Photo</Text></TouchableOpacity>

                        {/* <TouchableOpacity  onPress ={selectFile} style={Styles.btn}><Text style={Styles.text}>Prood of Work Eligibility</Text></TouchableOpacity>
                        <TouchableOpacity  onPress ={selectFile} style={Styles.btn}><Text style={Styles.text}>Driver's License</Text></TouchableOpacity>

                        <TouchableOpacity   onPress ={selectFile} style={Styles.btn}><Text style={Styles.text}>Legal Agreemnets</Text></TouchableOpacity>
                        <TouchableOpacity  onPress ={selectFile} style={Styles.btn}><Text style={Styles.text}>Vehical Inspection</Text></TouchableOpacity>
                        <TouchableOpacity  onPress ={selectFile} style={Styles.btn}><Text style={Styles.text}>Vehical Insurace</Text></TouchableOpacity>
                        <TouchableOpacity  onPress ={selectFile} style={Styles.btn}><Text style={Styles.text}>Vehical Registration</Text></TouchableOpacity> */}


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