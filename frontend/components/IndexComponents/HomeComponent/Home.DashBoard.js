import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Button, ScrollView } from 'native-base';
import { GetCurrentLocation } from './GetCurrentLocation';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUser } from "../../../helpers/user"
import { getRidesAroundUser, getCurrentRideOfCurrentUserAsDriver } from "../../../api/rides";
import { RideContainer } from '../Rides/RideContainer';
import Loading from '../../Loading'


export default function Main({ navigation }) {
    const [location, setLocation] = useState({})
    const [user, setUser] = useState({})
    const [rides, setRides] = useState([])
    const [driverRide,setDriverRides]=useState([])
    const [isLoading,setIsLoding]=useState(false)

    const myCar = <Icon name="car" size={20} />;
    const myArrow = <Icon name="arrow-right" size={20} />;
    const map = <Icon name="map-marker" size={18} />;
    const arrow = <Ionicons name="ray-start-arrow" size={25} />
    const clock = <Icon name="clock-o" color={'orange'} size={16} />;
    const seat = <Ionicons name="seat" size={16} />
    const star = <Icon name="star" size={16} />
    const flag = <Icon name="flag" size={16} />

    // const list = () => {
    //             return (
    //                 <View style={Styles.container}>
    //                     <View style={Styles.parentContainer}>
    //                         <View style={Styles.childContainer}>
    //                             <View>
    //                                 <View>
    //                                     <Text
    //                                         style={{ fontSize: 13, fontWeight: "bold" }}
    //                                     >
    //                                         {map}{" "}
    //                                         {driverRide.from.locationName.substring(
    //                                             0,
    //                                             40
    //                                         )}
    //                                     </Text>
    //                                 </View>
    //                                 <Text>{arrow}</Text>
    //                                 <View>
    //                                     <Text
    //                                         style={{ fontSize: 13, fontWeight: "bold" }}
    //                                     >
    //                                         {map}{" "}
    //                                         {driverRide.to.locationName.substring(
    //                                             0,
    //                                             40
    //                                         )}
    //                                     </Text>
    //                                 </View>
    //                             </View>
    //                             <Text style={{ fontSize: 20 }}>
    //                                 {dollar} {driverRide.pricePerSeat}
    //                             </Text>
    //                         </View>
    //                         <View
    //                             style={{
    //                                 borderBottomColor: "#F5F5F5",
    //                                 borderBottomWidth: 1,
    //                             }}
    //                         />
    //                         <View style={Styles.childContainer}>
    //                             <Text style={{ fontSize: 15 }}>
    //                                 {clock} {driverRide.startDateAndTime}
    //                             </Text>
    //                             <Text style={{ fontSize: 15 }}>
    //                                 {seat} {driverRide.numberOfSeats}
    //                             </Text>
    //                             <Text style={{ fontSize: 15 }}>
    //                                 {flag} {driverRide.stops.length}
    //                             </Text>
    //                             <TouchableOpacity
    //                                 onPress={()=>goToRide(driverRide._id)}
    //                             >
    //                                 <Text style={{ color: "#0D92DD" }}>Details</Text>
    //                             </TouchableOpacity>
    //                         </View>
    //                     </View>
    //                 </View>
    //             );
    // };
    // setUser(getUser())
    // to access the lattitude and longitude the use location.lat and location.long 
    useEffect(() => {
        getRidesAroundUser().then((response) => {
            const [result, error] = response;
            if (error) {
                alert(error);
                return;
            }
            setRides(result.data.data.rides);
        });
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

    useEffect(()=>{
        setIsLoding(true)
        getCurrentRideOfCurrentUserAsDriver().then((response)=>{
            const [result,error] = response
            if (error) {
                alert(error);
                return;
            }
            setDriverRides(result.data.rides)
            setIsLoding(false)
            console.log(driverRide);
            // console.log(driverRides._id);
        })
    },[driverRide===null])
    const navigateToManageRide = () => {
        navigation.navigate("ManageRide")
    }

    const navigateToWallet = () => {
        navigation.navigate("Wallet")
    }

    const goToRide = (rideId ="6209e0ccd1302a1731b61b66") => {
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
            {
                driverRide === undefined || driverRide === null || driverRide === ''?
                <Loading loading={driverRide}/>
                :
                
                <View style={Styles.container}>
                    <View style={Styles.parentContainer}>
                      <View style={Styles.childContainer}>
                            <View>
                                <View>
                                    <Text
                                        style={{ fontSize: 13, fontWeight: "bold" }}
                                    >
                                        {map}{" "}
                                        {driverRide.from.locationName.substring(0, 35)}
                                    </Text>
                                </View>
                                <Text>{arrow}</Text>
                                <View>
                                    <Text
                                        style={{ fontSize: 13, fontWeight: "bold" }}
                                    >
                                        {map}{" "}
                                        {driverRide.to.locationName.substring(0, 35)}
                                    </Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 20 }}>
                                    {driverRide.pricePerSeat}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#F5F5F5",
                                borderBottomWidth: 1,
                            }}
                        />
                        <View style={Styles.childContainer}>
                            <Text style={{ fontSize: 15 }}>
                                    {driverRide.startDateAndTime.substring(0, 10)}
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                                    {driverRide.startDateAndTime.substring(11, 16)}
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                                {seat} {driverRide.numberOfSeats}
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                                {flag} {driverRide.stops.length}
                            </Text>
                            <TouchableOpacity
                                onPress={() => goToRide(driverRide._id)}
                            >
                                <Text style={{ color: "#0D92DD" }}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                         
            }
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
                <Button onPress={goToRide}>
                    Go to ride
                </Button>
                {
                    rides.map((ride, index) => (
                        <RideContainer
                            ride={ride}
                            key={index}
                            navigation={navigation} />
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
        marginRight: "55%",
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
