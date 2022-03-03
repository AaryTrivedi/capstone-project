import { View, Heading } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet,Text } from 'react-native';
import { getCurrentUserNotifications } from "../../../api/notification";
import NotificationList from './NotificationListComponent';

export default function NotificationScreen({ navigation }) {

    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        getCurrentUserNotifications()
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.error(error);
                    return;
                }
                setNotifications(result.data.notifications);
            })
    }, [])

    const navigateToRequestList = (rideId) => {
        navigation.navigate("RequestList", {
            rideId
        })
    }

    return (
        <View backgroundColor="white" style={styles.container}>
            <View style={styles.headingContainer}>
                <Heading size="xl">
                    Notifications
                </Heading>
            </View>
            <View>
                <NotificationList
                    navigateToRequestList={navigateToRequestList}
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
