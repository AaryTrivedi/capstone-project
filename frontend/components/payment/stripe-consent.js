import React from 'react';
import { Button } from 'native-base'
import { View, Text, StyleSheet,ImageBackground,Dimensions } from 'react-native';
import { createCustomer } from '../../api/stripe';
import { opacity } from 'styled-system';

export default function StripeConsent({ navigation }) {

    const onSubmit = () => {
        createCustomer()
            .then(response => {
                const [result, error] = response;
                if (error) {
                    alert(error);
                    return;
                }
                navigation.navigate("AddCard");
            });
    }

    return (
        <ImageBackground
                source={require('../../assets/login.png')}
                style={
                    { height: Dimensions.get('screen') }.height
                }
            >
               
        <View style={styles.container}>
        <Text style={styles.bold}> Terms & Conditions</Text>
           <Text>
           {"\n"}{"\n"}This app stores data card information securely on stripe.
                {"\n"} {"\n"}By clicking continue you grant us right to create register you as a customer of our service on stripe.
                You also consent to let us store your card information on stripe securely.
                {"\n"} {"\n"}
                <Text style={styles.bold}>Note: You must grant access to let us setup your credit card or debit card for payment.
                </Text>
            </Text>
            <View style={styles.button}>
            <Button
                width={"sm"}
                backgroundColor={"#21A656"}
                onPress={onSubmit}>
                Continue
            </Button>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        backgroundColor:'#fff',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
        marginLeft: "5%",
        marginRight: "10%",
        top:"30%"
    },
    button: {
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#21A656',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
         top:"40%"
    },
    bold: {fontWeight: 'bold'},
    Text:{
        justifyContent:"center"
    }
})
