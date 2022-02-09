import React from 'react';
import { Text,View,StyleSheet } from 'react-native'
import { Button } from 'native-base';
import {getToken} from '../../helpers/token'

export default function Home() {
    return (
        <View style={Styles.container}>
            <Text>Home screen</Text>
            <Button onPress={() => getToken().then((value) => alert(value))}>click me</Button>
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
