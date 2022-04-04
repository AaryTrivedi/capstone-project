import { Button, View } from 'native-base'
import React from 'react'
import { getLocationDetails } from '../../../api/map';
import { RideContainer } from '../Rides/RideContainer';

export default function AllRides({ route, navigation }) {
    const { rides, fromFilter, from, to } = route.params;

    const handleRideSelect = (rideId) => {
        navigation.navigate("RideDetail", {
            rideId,
        });
    };

    const showConnectingRide = async () => {
        const [
            fromDetails, fromError
        ] = await getLocationDetails(from.place_id);
        const [
            toDetails, toError
        ] = await getLocationDetails(to.place_id);

        const { data: fromLocationData } = fromDetails;
        const { data: toLocationData } = toDetails;

        const fromLocationInformation = {
            longitude: fromLocationData.result.geometry.location.lng,
            latitude: fromLocationData.result.geometry.location.lat,
        }

        const toLocationInformation = {
            longitude: toLocationData.result.geometry.location.lng,
            latitude: toLocationData.result.geometry.location.lat,
        }

        const request = await fetch("http://localhost:4000/rides/connecting-rides", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fromLocation: fromLocationInformation,
                toLocation: toLocationInformation
            })
        });

        const response = await request.json();

        // console.log(response.data);

        navigation.navigate("AllRides", {
            rides: response.data.rides
        })
    }

    return (
        <View>
            {rides.map((ride, index) => (
                <RideContainer
                    key={index}
                    ride={ride}
                    onSelect={() => handleRideSelect(ride._id)}
                />
            ))}
            {fromFilter && rides.length === 0 && (
                <View>
                    <Button onPress={showConnectingRide} variant={"link"} colorScheme={"blue"}>
                        Show connecting ride
                    </Button>
                </View>
            )}
        </View>
    );
}
