import { ScrollView } from 'native-base';
import React from 'react'
import NotificationItem from './NotificationItemComponent';

export default function NotificationList({ navigateToRequestList, notifications }) {

    return (
        <ScrollView paddingX={3}>
            { notifications.map((notification, idx) => (
                <NotificationItem
                    key={idx}
                    notification={notification}
                    navigateToRequestList={navigateToRequestList} />
            ))}
        </ScrollView>
    );
}
