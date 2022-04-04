import { Button, Divider, Heading, Input, Spinner, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { markPresent } from '../../../../api/rides';
import { getCustomerAccount, getPaymentMethods } from '../../../../api/stripe';
import { BarCodeScanner } from "expo-barcode-scanner";

export default function PassengerActions({ currentUser, rideDetails ,navigation}) {

    const [code, setCode] = useState("");
    const [customer, setCustomer] = useState({});
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [customerLoading, setCustomerLoading] = useState(true);
    const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(true);
    const [paymentMethodIndex, setPaymentMethodIndex] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        getCustomerAccount()
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.log(error);
                    return;
                }
                setCustomer(result.data.customer.data[0]);
            })
            .finally(_ => setCustomerLoading(false));
        getPaymentMethods()
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.log(error);
                    return;
                }
                setPaymentMethods(result.data.methods);
            })
            .finally(_ => setPaymentMethodsLoading(false));
    }, []);

    if (customerLoading || paymentMethodsLoading) {
        return (
            <View>
                <Spinner
                    size="lg" />
            </View>
        )
    }

    const payAndMarkPresent = () => {
        const method = paymentMethodIndex === -1 ? "wallet" : "card"
        const paymentMethodId = method === "card" ? paymentMethods[paymentMethodIndex].id : "";
        const { pricePerSeat: amount } = rideDetails;
        const paymentDetails = {
            method,
            paymentMethodId,
            amount,
        };
        markPresent(paymentDetails, rideDetails)
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.log(error);
                    return;
                }
                navigation.navigate("Home")
                console.log("Done");
            })
    }

    const handleBarcode = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    const handleBarCodeScan = ({ type, data }) => {
        console.log(data);
        setScanned(true)
    }

    if (hasPermission && !scanned) {
        return (
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScan}
                style={{
                    height: "70%"
                }}
            />
        );
    }

    return (
        <View padding={4}>
            <Heading>1) Select Payment Method</Heading>
            <View>
                <Button
                    onPress={() => setPaymentMethodIndex(-1)}
                    padding={3}
                    backgroundColor={"white"}
                    marginY={2}
                    borderWidth={1}
                    borderColor={
                        paymentMethodIndex === -1 ? "blue.500" : "white"
                    }
                >
                    <Text>Wallet - ${customer.metadata.amountInWallet}</Text>
                </Button>
                {paymentMethods.map((method, idx) => (
                    <Button
                        key={idx}
                        padding={3}
                        backgroundColor={"white"}
                        marginY={2}
                        onPress={() => setPaymentMethodIndex(idx)}
                        borderWidth={1}
                        borderColor={
                            paymentMethodIndex === idx ? "blue.500" : "white"
                        }
                    >
                        <Text>
                            {idx + 1}
                            {") ...."} {method.card.last4}
                        </Text>
                    </Button>
                ))}
            </View>
            <Divider />
            <Heading>2) Add Code</Heading>
            <Input
                placeholder="Ride Code"
                onChangeText={(text) => setCode(text)}
                value={code}
                background={"white"}
                marginY={2}
            />
            <Divider />
            <Heading>2) Or Scan and go</Heading>
            <Button
                onPress={handleBarcode}>
                Scan and go
            </Button>
            <Divider />
            <Heading>3) Pay and Ride!</Heading>
            <Button
                marginY={2}
                colorScheme={"green"}
                isDisabled={
                    paymentMethodIndex === null || code !== rideDetails.code
                }
                onPress={payAndMarkPresent}
            >
                Pay & Ride
            </Button>
        </View>
    );
}
