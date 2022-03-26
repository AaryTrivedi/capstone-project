import React from 'react'
import { View } from 'native-base';
import RequestList from '../IndexComponents/Rides/RequestList';

export default function AllRideRequest({ navigation, route }) {
    const { rideId } = route.params;
    return (
        <View>
            <RequestList
                rideId={rideId} />
        </View>
    )
}
