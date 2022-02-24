import { Box, View, Text, Button, ScrollView, Actionsheet, useDisclose } from 'native-base';

import React, { useState, useEffect } from "react";

import Ionicons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import {
    getRideById,
    sendRideRequest,
    removeRideRequest,
} from "../../api/rides";
import { getUser } from "../../helpers/user";
import MapView, { Marker } from 'react-native-maps';

export default function RideDetails({ route, navigation }) {

  const { isOpen, onOpen, onClose } = useDisclose();

  const { rideId } = route.params;
  const [rideDetails, setRideDetails] = useState({})
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [showJoinOptions, setShowJoinOptions] = useState(false);

  useEffect(() => {
    getRideById(rideId)
      .then(response => {
        const [result, error] = response;
        if (error) {
          console.error(error);
          return;
        }
        setRideDetails(result.data.ride);
      })
      .finally(() => setLoading(false));
    getUser()
      .then(user => {
        setCurrentUser(user);
      })
  }, [])

  const clock = <Icon name="clock-o" color={"orange"} size={16} />;
  const seat = <Ionicons name="event-seat" size={21} />;
  const dollar = <Icon name="dollar" size={20} />;
  const petIcon = <Ionicons name="pets" size={25} />;
  const smokeIcon = <Ionicons name="smoke-free" size={25} />;
  const editIcon = <Ionicons name="edit" size={25} color={"blue"} />;
  const direction = (
    <Ionicons
      name="arrow-right-alt"
      size={50}
      color={"white"}
      width={100}
      paddingTop={1}
    />
  );
  const genderIcon = <MaterialCommunityIcons name="gender-female" size={25} />;
  const deleteIcon = (
    <MaterialCommunityIcons name="delete" size={25} color={"red"} />
  );
  const Play = (
    <MaterialCommunityIcons name="play-circle" size={25} color={"white"} />
  );
  const luggageIcon = <Ionicons name="luggage" size={25} />;
  const arrowSwap = <Fontisto name="arrow-swap" size={20} />;
  const [time, setTime] = useState(" 10:00 AM");
  const [date, setDate] = useState(" 8th September 2021,");
  const [occurence, Setoccurence] = useState("Mon, Tue, Wed, Sat");

  if (loading) {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  const sendJoinRequest = async (stopId="") => {
    sendRideRequest(rideId, stopId)
      .then(response => {
        const [result, error] = response;
        if (error) {
          console.error(error);
          return;
        }
        const newRideDetails = rideDetails;
        newRideDetails.requests.push({
          _id: "ride",
          userId: currentUser._id,
          stopId
        })
        setRideDetails(newRideDetails);
      });
  }

  const removeJoinRequest = () => {
    removeRideRequest(rideId).then((response) => {
        const [result, error] = response;
        if (error) {
            console.error(error);
            return;
        }
        const newRideDetails = rideDetails;
        const { requests } = rideDetails;
        const newRequests = requests.filter(
            (request) => request.userId !== currentUser._id
        );
        newRideDetails.requests = newRequests;
        setRideDetails(newRideDetails);
    });
  }

  const RequestButton = () => {
    const requestedToJoin = rideDetails.requests.findIndex(request => {
      return request.userId === currentUser._id
    }) > -1;
    let handlePress = requestedToJoin ? removeJoinRequest : sendJoinRequest;
    if (requestedToJoin === false && rideDetails.stops.length > 0 && rideDetails.isRecurring === false) {
      handlePress = onOpen;
    }
    return (
        <Button
            flex={1}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"#2421A6"}
            onPress={handlePress}
        >
            {requestedToJoin ? (
                <Ionicons
                    name="close-circle-sharp"
                    size={25}
                    color={"white"}
                />
            ) : (
                <Ionicons name="person-add" size={25} color={"white"} />
            )}
            <Text color={"white"}>
                {requestedToJoin ? "Cancel Request" : "Send join request"}
            </Text>
        </Button>
    );
  }

  const StartButton = () => {
    return(
      <Button
          flex={1}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"#2421A6"}
          onPress={() => console.log("start pressed")}
      >
          <Ionicons name="play-circle" size={25} color={"white"} />
          <Text color={"white"}>Start</Text>
      </Button>
    );
  }

  const JoinOptions = () => {
    if (!isOpen) { return null; }
    return (
        <Actionsheet minHeight={"50%"} isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                {rideDetails.stops.map((stop, idx) => (
                    <Box h={50} w={"90%"} my={3} key={idx}>
                        <Actionsheet.Item
                            flex={1}
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            backgroundColor={"#2421A6"}
                            onPress={() => sendJoinRequest(stop._id)}
                            height={"30"}
                        >
                            <Ionicons
                                name="person-add"
                                size={25}
                                color={"white"}
                            />
                            <Text color={"white"}>
                                Till {stop.locationName}
                            </Text>
                        </Actionsheet.Item>
                    </Box>
                ))}
                <Box h={50} w={"90%"} my={3}>
                    <Actionsheet.Item
                        flex={1}
                        flexDirection={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        backgroundColor={"#2421A6"}
                        onPress={() => sendJoinRequest("")}
                        height={"30"}
                    >
                        <Ionicons name="person-add" size={25} color={"white"} />
                        <Text color={"white"}>entire ride</Text>
                    </Actionsheet.Item>
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
  }

  const goToEdit = () => {
      navigation.navigate("EditRide", {
          rideId: rideDetails._id
      })
  }

  return (
      <>
          <ScrollView>
              <View textAlign={"center"} backgroundColor="#21A656">
                  <Text mx={3}>{rideDetails.from.locationName}</Text>
                  {direction}
                  <Text mx={3}>{rideDetails.to.locationName}</Text>
              </View>
              <View
                  marginTop={-2}
                  flex={1}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  zIndex={999}
              >
                  <MapView
                      style={{
                          width: 300,
                          height: 400,
                          zIndex: 999,
                      }}
                      initialRegion={{
                          latitude: rideDetails.from.latitude,
                          longitude: rideDetails.from.longitude,
                          latitudeDelta: 3,
                          longitudeDelta: 3,
                      }}
                  >
                      <Marker
                          coordinate={{
                              latitude: rideDetails.from.latitude,
                              longitude: rideDetails.from.longitude,
                          }}
                      ></Marker>
                      <Marker
                          coordinate={{
                              latitude: rideDetails.to.latitude,
                              longitude: rideDetails.to.longitude,
                          }}
                      ></Marker>
                      {rideDetails.stops.map((stop, idx) => (
                          <Marker
                              key={idx}
                              coordinate={{
                                  latitude: stop.latitude,
                                  longitude: stop.longitude,
                              }}
                          ></Marker>
                      ))}
                  </MapView>
              </View>
              {rideDetails.driver === currentUser._id ? (
                  <View
                      flex={1}
                      flexDirection={"row"}
                      justifyContent={"space-around"}
                      alignItems={"center"}
                      my={3}
                  >
                      <Button
                          onPress={() => console.log("Delete Button Pressed")}
                          variant={"outline"}
                          flex={1}
                          flexDirection={"row"}
                          size={"sm"}
                          maxWidth={"120"}
                          leftIcon={deleteIcon}
                      >
                          <Text>Delete</Text>
                      </Button>
                      <Button
                          onPress={goToEdit}
                          flex={1}
                          flexDirection={"row"}
                          size={"sm"}
                          maxWidth={"120"}
                          leftIcon={editIcon}
                          variant={"outline"}
                      >
                          <Text>Edit</Text>
                      </Button>
                  </View>
              ) : null}
              <View
                  marginTop={3}
                  marginX={5}
                  backgroundColor="white"
                  padding={4}
                  alignItems={"center"}
                  borderRadius={3}
                  borderWidth={1}
                  borderColor={"#ccc"}
              >
                  <Text fontSize={"md"}>
                      {clock}
                      {date}
                      {time}
                  </Text>
              </View>
              <View
                  marginY={3}
                  flex={1}
                  flexDirection={"row"}
                  marginX={5}
                  justifyContent={"space-between"}
              >
                  <View
                      backgroundColor={"white"}
                      paddingY={2}
                      paddingX={4}
                      flex={1}
                      flexDirection={"row"}
                      maxWidth={60}
                      justifyContent={"center"}
                      alignItems={"center"}
                  >
                      {dollar}
                      <Text> {rideDetails.pricePerSeat}</Text>
                  </View>
                  <View
                      backgroundColor={"white"}
                      paddingY={2}
                      paddingX={4}
                      flex={1}
                      flexDirection={"row"}
                      marginX={3}
                      justifyContent={"center"}
                      alignItems={"center"}
                  >
                      {arrowSwap}
                      <Text> {occurence}</Text>
                  </View>
                  <View
                      backgroundColor={"white"}
                      paddingY={2}
                      paddingX={4}
                      flex={1}
                      flexDirection={"row"}
                      maxWidth={60}
                      justifyContent={"center"}
                      alignItems={"center"}
                  >
                      {seat}
                      <Text> {rideDetails.numberOfSeats}</Text>
                  </View>
              </View>
              <View
                  flex={1}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  marginX={3}
              >
                  <View
                      borderRadius={2}
                      padding={3}
                      backgroundColor={"white"}
                      marginX={3}
                  >
                      {petIcon}
                  </View>
                  <View
                      borderRadius={2}
                      padding={3}
                      backgroundColor={"white"}
                      marginX={3}
                  >
                      {smokeIcon}
                  </View>
                  <View
                      borderRadius={2}
                      padding={3}
                      backgroundColor={"white"}
                      marginX={3}
                  >
                      {genderIcon}
                  </View>
                  <View
                      borderRadius={2}
                      padding={3}
                      backgroundColor={"white"}
                      marginX={3}
                  >
                      {luggageIcon}
                  </View>
              </View>
              <View
                padding={4}>
                  {currentUser._id === rideDetails.driver ?
                  <StartButton />
                  :
                  <RequestButton />
                  }
                  <JoinOptions />
              </View>
          </ScrollView>
      </>
  );
}
