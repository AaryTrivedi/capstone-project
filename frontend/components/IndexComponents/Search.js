import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import FilterRide from'./SearchComponent/FilterRide'
export default function Search({ navigation }){

    return (
        <View style={Styles.container}>
            <FilterRide navigation={navigation} />
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
