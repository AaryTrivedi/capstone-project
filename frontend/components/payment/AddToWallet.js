import { Button, Input, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react'
import { addToWallet, getPaymentMethods } from '../../api/stripe';

export default function AddToWallet({ navigation }) {

    const [amount, setAmount] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});

    useEffect(() => {
        getPaymentMethods()
            .then(result => {
                const [response, error] = result;
                if (error) {
                    console.error(error);
                    return;
                }
                const { methods } = response.data;
                setPaymentMethods(methods);
            })
    }, []);

    const handleSubmit = () => {
        const paymentMethodId = selectedPaymentMethod.id;
        const paymentAmount = Number(amount);
        addToWallet({
            amount: paymentAmount,
            paymentMethodId,
        })
        .then(result => {
            const [response, error] = result;
            if (error) {
                console.error(error);
                return;
            }
            navigation.navigate("Home");
        });
    }

    return (
        <View padding={"3"} flex={1}>
            <View>
                <Text fontSize={"md"}>Amount</Text>
                <Input
                    background={"white"}
                    placeholder={"$20.00"}
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>
            <View marginTop={"4"}>
                <Text>Payment Method List</Text>
                <ScrollView>
                    {paymentMethods.map((method, index) => (
                        <Button
                            key={index}
                            background={"white"}
                            flex={1}
                            flexDirection={"row"}
                            padding={"3"}
                            onPress={() => setSelectedPaymentMethod(method)}
                            borderWidth={"1"}
                            borderColor={
                                selectedPaymentMethod.card &&
                                method.card.id === selectedPaymentMethod.card.id
                                    ? "blue.300"
                                    : "white"
                            }
                        >
                            <Text>
                                {index + 1}
                                {") "}
                                {method.card.last4}
                            </Text>
                        </Button>
                    ))}
                </ScrollView>
            </View>
            <View marginTop={"4"}>
                <Button
                    isDisabled={selectedPaymentMethod.card === undefined}
                    onPress={handleSubmit}>Add To Wallet</Button>
            </View>
        </View>
    );
}
