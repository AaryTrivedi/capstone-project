import { View, Heading } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet,Text } from 'react-native';
import { getCurrentUserNotifications } from "../../../api/notification";
import NotificationList from './NotificationListComponent';
import { updateSeen } from '../../../api/notification'

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
    //    alert(JSON.stringify(notifications))
    const navigateToRequestList = (rideId,notificationsid) => {
       updateSeen(notificationsid)
        console.log(updateSeen(notificationsid))
        if(notifications.seen){
        const newNotification = notifications.filter(
            (notification) =>(notification.ride._id !== rideId),     
            );
            setNotifications(newNotification)
        }
        
        navigation.navigate("RequestList", {
            rideId,notificationsid
        })
    }
    console.log(notifications)

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
