import React,{Component} from 'react';
import { Text, View,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './IndexComponents/Home';
import Search from './IndexComponents/Search';
import Chat from './IndexComponents/Chat';
import Notification from './IndexComponents/Notification';
import Profile from './IndexComponents/Profile';

const Tab = createBottomTabNavigator();
export default class DashBoard extends Component {


  
  
  render() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home': 'ios-home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          }
          else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbox-ellipses' : 'ios-chatbox-ellipses-outline';
          }
          else if (route.name === 'Notification') {
            iconName = focused ? 'notifications-circle' : 'notifications-circle-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Search" component={Search}/>
          <Tab.Screen name= "Chat" component={Chat} options={{ headerShown:false,tabBarBadge: 1 }}/>
          <Tab.Screen name="Notification" component={Notification} options={{ tabBarBadge: 1 }}/>
          <Tab.Screen name="Profile" component={Profile}/>
      </Tab.Navigator>
      
     )
  }
}