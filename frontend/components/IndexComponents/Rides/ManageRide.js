import React, { useState, useEffect } from 'react';
import { View, Button, Text } from "native-base";
import {TouchableOpacity, StyleSheet,SafeAreaView, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { getRideOfCurrentUserAsDriver, getRideOfCurrentUserAsPassenger } from '../../../api/rides';
import { RideContainer } from './RideContainer';
import { getUser } from '../../../helpers/user';

export default function ManageRide({ navigation }) {

    const [completedRides, setCompletedRides ] = useState([]);
    const [upcompingRides, setUpcomingRides] = useState([]);
    const [user, setUser] = useState({});

    const getRides = async () => {
        const upcompingRides = [];
        const completedRides = [];
        const today = new Date();
        const [rideAsDriverResponse, rideAsDriverError] = await getRideOfCurrentUserAsDriver();
        const [rideAsPassengerResponse, rideAsPassengerError] =
            await getRideOfCurrentUserAsPassenger();
        const { rides: rideAsDriver } = rideAsDriverResponse.data;
        const { rides: rideAsPassenger } = rideAsPassengerResponse.data;
        for (const ride of rideAsDriver) {
            const rideStartDate = new Date(ride.startDateAndTime);
            if (rideStartDate < today) {
                completedRides.push(ride)
            } else {
                upcompingRides.push(ride);
            }
        }
        for (const ride of rideAsPassenger) {
            const rideStartDate = new Date(ride.startDateAndTime);
            if (rideStartDate < today) {
                completedRides.push(ride);
            } else {
                upcompingRides.push(ride);
            }
        }
        return { upcompingRides, completedRides };
    }

    useEffect(() => {
        getRides()
            .then(allRides => {
                const { completedRides, upcompingRides } = allRides;
                setUpcomingRides(upcompingRides);
                setCompletedRides(completedRides);
            })
        getUser()
            .then(setUser)
        }, []);

        const navigateToPostRide = () => {
            navigation.navigate("RideForm");
        }

  return (
      <SafeAreaView style={Styles.container}>
          <ScrollView>
              <View>
                  {(user.role === "admin" ||
                      (user.role === "driver" && user.driverDetailsValid)) && (
                      <Button
                          style={Styles.button}
                          padding={3}
                          margin={3}
                          onPress={navigateToPostRide}
                          underlayColor="#fff"
                      >
                          <Text fontWeight={"bold"} color={"white"}>
                              {" "}
                              + Post New Ride{" "}
                          </Text>
                      </Button>
                  )}

                  <View></View>
                  <View style={Styles.containerViewAll}>
                      <View style={Styles.box}>
                          <Text>Upcoming Rides</Text>
                          <TouchableOpacity
                              onPress={() => {
                                  this.props.navigation.navigate("AllRides");
                              }}
                          >
                              <Text style={{ color: "#0D92DD" }}>View All</Text>
                          </TouchableOpacity>
                      </View>
                      <View
                          style={{
                              borderBottomColor: "#CCCCCC",
                              borderBottomWidth: 1,
                          }}
                      />
                      {upcompingRides.slice(0, 3).map((ride, index) => (
                          <RideContainer ride={ride} />
                      ))}
                  </View>

                  <View></View>
                  <View style={Styles.containerCompleted}>
                      <View style={Styles.box}>
                          <Text>Completed Rides</Text>
                          <TouchableOpacity
                              onPress={() => {
                                  alert("View All");
                              }}
                          >
                              <Text style={{ color: "#0D92DD" }}>View All</Text>
                          </TouchableOpacity>
                          {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('CompletedRides')}><Text style={{color: '#0D92DD', textDecorationLine: 'underline'}}>View All</Text></TouchableOpacity> */}
                      </View>
                      <View
                          style={{
                              borderBottomColor: "#CCCCCC",
                              borderBottomWidth: 1,
                          }}
                      />
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
  );
    }


const Styles = StyleSheet.create({

            container:{
                justifyContent:'center',
                flex:1
            },
            button:{
                backgroundColor:'#2265C9',
                borderRadius: 3,
                borderColor: '#fff'
            },
            containerViewAll:{
                flex:2,
                marginLeft:20,
                marginRight:20,
            },
            containerCompleted:{
                flex:3,
                marginLeft:20,
                marginRight:20,
            },
            box:{
                padding:20,
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            childContainer:{
                height:"50%",
                padding:10,
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
                },
            parentContainer:{
                backgroundColor:'#fff',
                height:"25%",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                elevation: 1,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 10,
            },


            })
