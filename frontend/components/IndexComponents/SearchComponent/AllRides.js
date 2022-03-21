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
                    <Button variant={"link"} colorScheme={"blue"}>
                        Notify when a ride is available
                    </Button>
                    <Button variant={"link"} colorScheme={"blue"}>
                        Show connecting ride
                    </Button>
                </View>
            )}
        </View>
    );
}
