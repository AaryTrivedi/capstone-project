import { View, Text, Divider } from 'native-base'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';

export default function DriverActions({ rideDetails }) {

    const url = "mark present url";

    return (
        <View>
            <Text>Driver Actions</Text>
            <Divider />
            <Text>Scan QR Code</Text>
            <QRCode value={url} />
            <Divider />
            <Text>Ride Code</Text>
            <Text>{rideDetails.code}</Text>
        </View>
    );
}
