import React from 'react';
import { Button } from 'native-base'
import { View, Text, StyleSheet } from 'react-native';
import { createCustomer } from '../../api/stripe';

export default function StripeConsent({ navigation }) {

    const onSubmit = () => {
        createCustomer()
            .then(response => {
                const [result, error] = response;
                if (error) {
                    alert(error);
                    return;
                }
                navigation.navigate("SetupCard");
            });
    }

    return (
        <View style={styles.container}>
            <Text>
                This app stores data card information securely on stripe.
            </Text>
            <Text>
                By clicking continue you grant us right to create register you as a customer of our service on stripe.
            </Text>
            <Text>
                You also consent to let us store your card information on stripe securely.
            </Text>
            <Text>
                Note: you must grant access to let us setup your credit card or debit card for payment.
            </Text>
            <Text>   </Text>
            <Button
                width={"sm"}
                backgroundColor={"#21A656"}
                onPress={onSubmit}>
                Continue
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }
})
