import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import {safeAreaView} from 'react-native'
import { View, Button, ScrollView } from 'native-base';
import { GetCurrentLocation } from './GetCurrentLocation';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUser } from "../../../helpers/user"
import { getRidesAroundUser,getRideOfCurrentUserAsDriver } from "../../../api/rides";
import { RideContainer } from '../Rides/RideContainer';


export default function Main({ navigation }) {
    const [location, setLocation] = useState({})
    const [user, setUser] = useState({})
    const [rides, setRides] = useState([])
    const [driverRides,setDriverRides] = useState([])
    const[ small,setSmall] =useState({})
    const myCar = <Icon name="car" size={20} />;
    const myArrow = <Icon name="arrow-right" size={20} />;
    const map = <Icon name="map-marker" size={18} />;
    const arrow = <Ionicons name="ray-start-arrow" size={25} />
    const clock = <Icon name="clock-o" color={'orange'} size={16} />;
    const seat = <Ionicons name="seat" size={16} />
    const star = <Icon name="star" size={16} />
    const flag = <Icon name="flag" size={16} />

    // console.log(new Date(Date.now()))
    // // console.log(new Date(rides[0].startDateAndTime));
    // console.log((rides[0].startDateAndTime))

    
    const list = () => {
        
        

        try {
            return [].map((element) => {
                return (
                    <View key={element._id}>
                        <View>
                            <View style={Styles.backgroundContainer}>
                                <View style={Styles.childContainer}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}> {map} {element.from['locationName']}</Text>
                                    <Text> {arrow} </Text>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}> {map} {element.to['locationName']}</Text>
                                    <Text style={{ fontSize: 20, marginRight: 5 }}>${element.pricePerSeat}</Text>
                                </View>
                                <View style={{ borderBottomColor: '#F5F5F5', borderBottomWidth: 1, }} />
                                <View style={Styles.childContainer}>
                                    <Text style={{ fontSize: 16 }}> {clock} {element.startDateAndTime}</Text>
                                    <Text style={{ fontSize: 16 }}> {seat} {element.numberOfSeats}</Text>
                                    <Text style={{ fontSize: 16 }}> {star} 2</Text>
                                    <Text style={{ fontSize: 16 }}> {flag} {element.stops.length}</Text>
                                    <TouchableOpacity onPress={() => { navigation.navigate('RideDetails') }} ><Text style={{ color: '#0D92DD', }}>Details</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            });
        }
        catch (e) {
            alert(JSON.stringify(e.message))
        }

    };
    // setUser(getUser())
    // to access the lattitude and longitude the use location.lat and location.long 
    useEffect(() => {
        GetCurrentLocation().then((value) => {
            setLocation(value)
        });
        getUser().then((user) => {
            setUser(user);
            if (user.isNew) {
                navigation.navigate("StripeConsent")
            }
        })
    }, [])

    useEffect(() => {
        getRideOfCurrentUserAsDriver().then((response)=>{
            const [result, error] = response;
            if (error) {
                alert(error);
                return;
            }
            // console.log(response)
            setDriverRides(result.data.rides)
            // console.log(driverRides);
            
        });
    },[])

    useEffect(() => {
        getRidesAroundUser().then((response) => {
            const [result, error] = response;
            if (error) {
                alert(error);
                return;
            }
            setRides(result.data.data.rides);
            // console.log(rides)
        });
    },[])
    const viewCurrentRide=()=>{
        const newDriverRides = driverRides.filter(
            (rides)=>
            (rides.startDateAndTime > new Date().toISOString())
        )
        setDriverRides(newDriverRides)

        var smallest = driverRides[0]
        for(var i=1; i<driverRides.length; i++){
            if(driverRides[i].startDateAndTime < smallest.startDateAndTime){
                smallest = driverRides[i];   
            }
        }
        console.log(smallest)
        setDriverRides(smallest)
        setSmall(smallest)
        console.log(small)
        console.log(driverRides[0]);
    }

    useEffect(() => {
        viewCurrentRide()
    },[])
    
    const navigateToManageRide = () => {
        navigation.navigate("ManageRide")
    }

    const navigateToWallet = () => {
        navigation.navigate("Wallet")
    }

    const goToRide = (rideId) => {
        navigation.navigate("RideDetail", {
            rideId,
        });
    }

    return (
        <ScrollView style={Styles.container}>
            <View
                flex={1}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"3"}
            >
                <View style={Styles.welcome}>
                    <Text>Welcome</Text>
                    <Text style={Styles.userName}>
                        {user.firstName} {user.lastName}
                    </Text>
                </View>
                <Button
                    height={"10"}
                    variant={"solid"}
                    onPress={navigateToWallet}
                >
                    <Text>Wallet</Text>
                </Button>
            </View>
            <View height={"95"} style={Styles.background}>
                <Text style={[Styles.containerText, { marginTop: "2%" }]}>
                    Next ride
                </Text>
                <Text style={Styles.containerText}>in 0000 hours</Text>
            </View>
            <View marginTop={"-10"} style={Styles.backgroundContainer}>
                <TouchableOpacity >
                    {/* <Text>Details{console.log(driverRides[0])}</Text> */}

                    {/* <RideContainer ride={driverRides[0]} onSelect={() => goToRide(driverRides[0]._id)}/> */}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={navigateToManageRide}>
                <View
                    flex={"1"}
                    flexDirection={"row"}
                    background={"#fff"}
                    marginX={"3"}
                    padding={"3"}
                    justifyContent={"center"}
                    borderColor={"#cccccc"}
                    borderWidth={"1"}
                >
                    <Text style={Styles.manageRideText}>
                        {" "}
                        {myCar} Manage Rides
                    </Text>
                    <Text>{"  "}</Text>
                    <Text style={Styles.manageRideText}> {myArrow} </Text>
                </View>
            </TouchableOpacity>
            <View marginY={"2"}>
                <Text style={{ marginLeft: 20, fontSize: 20 }}>
                    Rides around you
                </Text>
                {
                    rides.map((ride, index) => (
                        <RideContainer
                            ride={ride}
                            key={index}
                            onSelect={() => goToRide(ride._id)} />
                    ))
                }
            </View>
        </ScrollView>
    );
}

const Styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    welcome: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // marginRight: "55%",
        marginLeft: '1%',
    },
    userName: {
        fontSize: 26,
        fontWeight: "700",
    },
    background: {
        backgroundColor: '#21A656',
        height: 100,
        borderRadius: 4,
    },
    wallet: {
        alignSelf: 'center'
    },
    backgroundContainer: {
        margin: 10,
        borderWidth: 0.4,
        backgroundColor: '#FFFFFF',
        height: 100,
        shadowColor: '#000000',
        borderRadius: 2,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    containerText: {
        marginLeft: '2%',
        color: "white",
        fontWeight: '500'
    },
    manageRide: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: '20%',
        margin: '10%',
        borderWidth: 0.4,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        shadowColor: '#000000',
        height: 40,
        borderRadius: 3,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    manageRideText: {
        alignSelf: 'center'
    },
    childContainer: {
        height: "50%",
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },

})
