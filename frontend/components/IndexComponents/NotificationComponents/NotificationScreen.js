import { View, Heading } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet,Text } from 'react-native';
import { getCurrentUserNotifications } from "../../../api/notification";
import NotificationList from './NotificationListComponent';

const dummyData = [
    {
        id: 1,
        type: "join-request",
        user: {
            id: 1,
            name: "Joe",
        },
        createdAt: new Date(),
    },
    {
        id: 2,
        type: "cancel-ride",
        user: {
            id: 1,
            name: "Joe",
        },
        createdAt: new Date(),
    },
    {
        id: 3,
        type: "cancel-request",
        user: {
            id: 1,
            name: "Joe",
        },
        createdAt: new Date(),
    },
];

export default function NotificationScreen() {

    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        getCurrentUserNotifications()
            .then(response => {
                const [result, error] = response;
                debugger;
                debugger;
                debugger;
                if (error) {
                    console.error(error);
                    return;
                }
                setNotifications(result.data.notifications);
            })
    }, [])

    return (
        <View backgroundColor="white" style={styles.container}>
            <View style={styles.headingContainer}>
                <Heading size="xl">
                    Notifications
                </Heading>
            </View>
            <View>
                <NotificationList
                    notifications={notifications} />
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})
