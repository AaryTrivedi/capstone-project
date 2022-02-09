import React, { useEffect } from 'react';
import { Button } from 'native-base';
import { View } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { getSetupIntentId } from '../../api/stripe';

export default function SetupCustomerCard() {

	const { confirmSetupIntent, loading } = useStripe();

	const onSubmit = async ({ navigation }) => {
		const billingDetails = {
			email: "aarytrivedi@gmail.com"
		}
		const [result, setupIntentError] = await getSetupIntentId()
		const { secret } = result.data;
		const { setupIntent, error } = await confirmSetupIntent(secret, {
			type: "Card",
			billingDetails
		})
		if (error) {
			console.error(error);
			return;
		}
		navigation.navigate("Dashboard",{screen:'Profile'});
	}

    return (
		<View>
			<CardField
				postalCodeEnabled={true}
				placeholder={{
					number: '4242 4242 4242 4242',
				}}
				cardStyle={{
					backgroundColor: '#FFFFFF',
					textColor: '#000000',
				}}
				style={{
					width: '100%',
					height: 50,
					marginVertical: 30,
				}} />
			<Button
                width={"sm"}
                backgroundColor={"#21A656"}
                onPress={onSubmit}>
                Submit
            </Button>
		</View>
	);
}
