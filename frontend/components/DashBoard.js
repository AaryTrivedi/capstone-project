import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './IndexComponents/Search';
import Chat from './IndexComponents/Chat';
import Profile from './IndexComponents/ProfileComponent/Profile';
import Main from './IndexComponents/HomeComponent/Home.DashBoard';
import NotificationScreen from './IndexComponents/NotificationComponents/NotificationScreen';

const Tab = createBottomTabNavigator();
export default class DashBoard extends Component {

  render() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "ios-home" : "ios-home-outline";
                    } else if (route.name === "Search") {
                        iconName = focused
                            ? "ios-search"
                            : "ios-search-outline";
                    } else if (route.name === "Chat") {
                        iconName = focused
                            ? "ios-chatbox-ellipses"
                            : "ios-chatbox-ellipses-outline";
                    } else if (route.name === "Notification") {
                        iconName = focused
                            ? "notifications-circle"
                            : "notifications-circle-outline";
                    } else if (route.name === "You") {
                        iconName = focused
                            ? "ios-person"
                            : "ios-person-outline";
                    }

                    // You can return any component that you like here!
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen
                name="Home"
                component={Main}
                options={{ headerShown: true }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{ headerShown: true }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: true, tabBarBadge: 1 }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ headerShown: true, tabBarBadge: 1 }}
            />
            <Tab.Screen
                name="You"
                component={Profile}
                options={{ headerShown: true }}
            />
        </Tab.Navigator>
    );
  }
}