import React from 'react';
import { View, Text, StyleSheet,ImageBackground,Dimensions } from 'react-native';


export default function AboutUs() {
    
    return (
        <ImageBackground
                source={require('../../assets/login.png')}
                style={
                    { height: Dimensions.get('screen') }.height
                }
            >
            <View style={styles.container}>
                    <Text style={styles.bold}>  {"\n"} About Us </Text> 
                    <Text>  {"\n"}Project Name : <Text style={styles.bold}> Car Pooling </Text> </Text> 
                    <Text> Team Number : <Text style={styles.bold}> 11  {"\n"}</Text> </Text> 
                    </View>
                    <View style={styles.container}>     
                    <Text><Text style={styles.bold}> {"\n"} Team Members </Text>
                    <Text>  {"\n"}{"\n"} Aary Trivedi </Text>
                    <Text>  {"\n"} Afshan Momin </Text>
                    <Text>  {"\n"} Chintan Ghevariya </Text>
                    <Text>  {"\n"} Nishtha Patel </Text>
                    <Text>  {"\n"} Rutik Patel </Text>
                    <Text>  {"\n"} Shrey Patel {"\n"}</Text> 
                    </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width:"80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#fff',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#21A656',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 1,
        marginLeft: "10%",
        marginBottom : "5%",
        marginRight: "10%",
        top:"30%"
    },
    bold: {fontWeight: 'bold'},
    Text:{
        justifyContent:"center"
    }
})
