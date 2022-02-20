import { Button, View, Text } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function NotificationItem({
    notification
}) {
    return (
        <View backgroundColor="#F5F5F5" marginTop={3} padding={3}>
            <View style={styles.header}>
                <View width={"80%"} style={styles.headerText}>
                    <NotificationText notification={notification} />
                </View>
                <View style={styles.headerTime}>
                    <Text>{
                        new Date(notification.createdDate).getHours()
                    }</Text>
                </View>
            </View>
        </View>
    );
}

function NotificationText({ notification }) {

    const typeTextMap = {
        "join-request": () => {
            const username =
                notification.fromUser.firstName +
                " " +
                notification.fromUser.lastName;
            return `${username} wants to join ${notification.ride.rideIdentifier}`;
        },
        "cancel-ride": () => {
            const username =
                notification.fromUser.firstName +
                " " +
                notification.fromUser.lastName;
            return `${username} has cancelled ${notification.ride.rideIdentifier}`;
        },
        "accept-request": () => {
            const username =
                notification.fromUser.firstName +
                " " +
                notification.fromUser.lastName;
            return `${username} has accepted request to join ${notification.ride.rideIdentifier}`;
        },
        "reject-request": () => {
            const username =
                notification.fromUser.firstName +
                " " +
                notification.fromUser.lastName;
            return `${username} has rejected to join ${notification.ride.rideIdentifier}`;
        },
    };

    return (
        <Text>
            { typeTextMap[notification.type]() }
        </Text>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row"
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    }
})