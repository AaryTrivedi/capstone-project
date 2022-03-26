import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import {safeAreaView} from 'react-native'
import { View, Button, ScrollView } from 'native-base';
import { GetCurrentLocation } from './GetCurrentLocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUser } from "../../../helpers/user"
import { getRidesAroundUser, getCurrentRideOfCurrentUserAsDriver, getCurrentRideOfCurrentUserAsPassenger } from "../../../api/rides";
import { RideContainer } from '../Rides/RideContainer';



export default function Main({ navigation }) {
    const [location, setLocation] = useState({})
    const [user, setUser] = useState({})
    const [rides, setRides] = useState([])
    const [userRide,setuserRides]=useState([])
    const [isLoading,setIsLoding]=useState(false)
    const [driverRides, setDriverRides] = useState([])
    const [small, setSmall] = useState({})

    const myCar = <Icon name="car" size={20} />;
    const myArrow = <Icon name="arrow-right" size={20} />;

    const getRides= async()=>{ 
        setIsLoding(true)   
        const userRide = []
        const [rideAsDriverResponse, rideAsDriverError] = 
            await getCurrentRideOfCurrentUserAsDriver();
        const [rideAsPassengerResponse, rideAsPassengerError] =
            await getCurrentRideOfCurrentUserAsPassenger();
        const { rides: rideAsDriver } = rideAsDriverResponse.data;
        const { rides: rideAsPassenger } = rideAsPassengerResponse.data;

        {
            user&& (user.role==='driver')?
            userRide.push(rideAsDriver):null
        }
        {
            user && (user.role === 'passenger') ?
            userRide.push(rideAsPassenger) : null
        }
        userRide&&setIsLoding(false)
        return { userRide }
        
    }
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

    useEffect(()=>{
        setIsLoding(true)
            getRides()
                    .then(allRides=>{
                        const { userRide } = allRides
                        setuserRides(userRide)
                    })
        setIsLoding(false)
    }, [])

    // console.log(userRide[0].startDateAndTime!==undefined);
    // useEffect(() => {
    //     getRideOfCurrentUserAsDriver().then((response)=>{
    //         const [result, error] = response;
    //         if (error) {
    //             alert(error);
    //             return;
    //         }
    //         // console.log(response)
    //         setDriverRides(result.data.rides)
    //         // console.log(driverRides);
            
    //     });
    // },[])

    useEffect(() => {
        getRidesAroundUser().then((response) => {
            const [result, error] = response;
            if (error) {
                alert(error);
                return;
            }
            console.log(result.data.data.rides);
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

    // useEffect(() => {
    //     viewCurrentRide()
    // },[])
    
    const navigateToManageRide = () => {
        navigation.navigate("ManageRide")
    }

    // const nvigateToProfile = () => {
    //     navigation.navigate("ManageRide")
    // }
    const navigateToWallet = () => {
        navigation.navigate("Wallet")
    }

    const goToRide = (rideId) => {
        navigation.navigate("RideDetail", {
            rideId,
        });
    }

    const goToProfile = () => {
        navigation.navigate("Profile", {
            userId: "6212b7f83b9ed0931ab83070"
        })
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
                    {
                        userRide.length === 0 ?
                        null:
                            userRide[0]===undefined?
                            null
                            :
                                <>
                                    <Text style={[Styles.containerText, { marginTop: "2%" }]}>
                                    Next ride
                                    </Text>
                                    <Text style={Styles.containerText}>on {
                                        !isLoading && new Date(userRide[0].startDateAndTime).toDateString()
                                    }
                                    </Text>
                                </>
                    }
                </View>

                {   
                 userRide.length===0?
                    <View marginTop={"-12"}style={Styles.backgroundContainer}>
                        <Text style={{ fontSize: '15' }}>Welcome to car pooling please find your next destination</Text>
                    </View>
                    :
                    userRide[0] === undefined ?
                        null
                        :
                        <View marginTop={"-12"} marginBottom={'10'}>
                            {
                            (userRide.map((ride, index) => (
                                <RideContainer
                                    ride={ride}
                                    key={index}
                                    onSelect={() => goToRide(ride._id)} />
                            )))
                    }
                </View>
                }
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
                {userRide.length === 0 ?
                null:
                userRide[0]===undefined?
                null
                :
                <Button onPress={()=>goToRide(userRide[0]._id)}>
                    Go to ride
                </Button>
                }
                {
                    rides.map((ride, index) => (
                        <RideContainer
                            ride={ride}
                            key={index}
                            onSelect={() => goToRide(ride._id)} />
                    ))
                }
            </View>
            <TouchableOpacity onPress={()=>goToProfile()}><Text>to profile</Text></TouchableOpacity>
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
