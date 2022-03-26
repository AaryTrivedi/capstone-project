import React from 'react';
import { Text,View,StyleSheet } from 'react-native'
import { Button } from 'native-base';
import {getToken} from '../../helpers/Token'
import {getUser} from '../../helpers/user'
import DashBoard from './HomeComponent/Home.DashBoard';


export default function Home() {
    return (
        <View style={Styles.container}>
            <DashBoard/>
        </View>
    );
    }

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
