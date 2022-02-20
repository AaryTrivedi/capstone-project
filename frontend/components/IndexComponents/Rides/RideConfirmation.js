import React from 'react';
import { View, Text,} from 'native-base';
import {StyleSheet,SafeAreaView,ScrollView,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";

export default function RideConfirmation() {
    const [date, setDate] = useState('Nov 22,2023');
    const [price,setPrice] = useState('$20');
    const [fromLocation,setFromLocation] = useState('160 Kendal Ave Toronto, ON M5R 1M3');
    const [toLocation,setToLocation] = useState('1550 Vine St 302 Vancouver, BC V6K 3J2');
    const [user,setUser] = useState('John');


    
    circle = <Ionicons name="circle" size={15} color='#C4C4C4' />;
    square = <Ionicons name="square" size={15} color='#C4C4C4' />;

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView>
               <View>
                <View style={Styles.container}>
                    <Text fontSize={30} alignItems='center' fontWeight='bold'>Ride Confirmation</Text>
                    <Text fontSize={20} fontWeight='medium' marginTop={'7%'}>Confirmation Code : ABCDEF</Text>
                    <Image source={require('../../../assets/rideconfirm.png')}  style={{width: 420, height: 284,marginTop:'10%'}}></Image>
                </View>
                <View style={Styles.container}>
                    <Text fontSize={20} marginTop='5%' marginRight='55%' fontWeight='bold'>Ride Details</Text>
                    <View style={Styles.confirmation}>
                        <View style={Styles.space}>
                            <Text color={'#666666'} fontWeight='medium' style={{fontSize:20}}>{date}</Text>
                            <Text color={'#666666'} fontWeight='medium' style={{fontSize:20}}>{price}</Text>
                        </View>
                        <Text paddingLeft={5} paddingTop={5} fontWeight='bold'>{circle}  {fromLocation}</Text>
                        <View style={Styles.verticleLine}></View>  
                        <Text paddingLeft={5} paddingBottom={5} fontWeight='bold' marginBottom={'5%'}>{square}  {toLocation}</Text>
                        <Text fontWeight='bold' style={{ position: 'absolute', bottom: '2%', right: '5%',}}>Your Trip With {user}</Text>

                    </View>
                </View>
                
                </View> 
            </ScrollView>
        </SafeAreaView>
    );
    }

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    confirmation:{
        width:'90%',
        backgroundColor:'#fff',
        borderColor: '#fff',
        shadowColor: '#000',
        borderWidth: 3,
        borderRadius: 5,
       
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 20,
        marginLeft: 5,
        marginRight: 5,
        marginTop:'3%',
    },
    space:{
        padding:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    verticleLine:{
        marginLeft:'7%',
        height: '30%',
        width: 2,
        backgroundColor: '#909090',
      },
})
