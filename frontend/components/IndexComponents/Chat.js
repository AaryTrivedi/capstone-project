import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

export default function Chat() {
    return (
        <View style={Styles.container}>
            <Text>Chat Screen </Text>
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
