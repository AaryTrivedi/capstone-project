import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, Input, Spinner, Heading } from "native-base";
import { getRideById } from "../../../api/rides";
import { getUser } from "../../../helpers/user";
import DriverActions from "./StartRideComponents/DriverActions";
import PassengerActions from "./StartRideComponents/PassengerActions";

export default function StartRide({ route, navigation }) {

	const { rideId } = route.params;

	const [rideDetails, setRideDetails] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRideById(rideId)
			.then(response => {
				const [result, error] = response;
				if (error) {
					console.log(error);
					return;
				}
				setRideDetails(result.data.ride);
			})
			.finally(() => setLoading(false))
		getUser()
			.then(user => {
				setCurrentUser(user)
			})
	}, [])

	if (loading) {
		return (
			<View>
				<Spinner
					size="lg" />
			</View>
		)
	}

	return (
        <View>
            <View backgroundColor={"green.600"} padding={3}>
                <Heading fontSize={"lg"} color={"white"}>
                    {rideDetails.from.locationName}
                </Heading>
                <Heading fontSize={"lg"} color={"white"}>
                    {rideDetails.to.locationName}
                </Heading>
            </View>
			{
				currentUser._id === rideDetails.driver ?
				<DriverActions
					rideDetails={rideDetails} />
				:
				<PassengerActions
					currentUser={currentUser}
					rideDetails={rideDetails}
					navigation={navigation} />
			}
        </View>
    );
}