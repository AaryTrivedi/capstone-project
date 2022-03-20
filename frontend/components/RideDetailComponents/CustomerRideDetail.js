import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import MapView from "react-native-maps";

import React, { useState, useEffect, useContext } from "react";

import Ionicons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Button } from "native-base";
import { paddingTop, right } from "styled-system";

export default function CusomerRideDetail() {
  const clock = <Icon name="clock-o" color={"orange"} size={16} />;
  const user = <Icon name="user" size={25} />;

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

  const [pet, setPet] = useState(false);
  const [smokeFree, setSmokeFree] = useState(false);
  const [female, setFemale] = useState(false);
  const [luggage, setLuggage] = useState(false);
  const [time, setTime] = useState(" 10:00 AM");
  const [ride, SetRide] = useState("Rides:365");
  const [date, setDate] = useState(" 8th September 2021,");
  const [price, SetPrice] = useState("20");
  const [occurence, Setoccurence] = useState("Mon, Tue, Wed, Sat");
  const [numberSeat, SetnumberSeat] = useState("2");
  const [depature, Setdepature] = useState("To");
  const [arrival, Setarrival] = useState("V");
  const [name, Setname] = useState(" John Doe");
  const [duration, SetDuration] = useState(" Years:3");
  const [rating, SetRating] = useState(" Rating:4.8");

  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const checkPet = () => {
    setPet(!pet);
  };

  const checkSmoke = () => {
    setSmokeFree(!smokeFree);
  };

  const checkFemale = () => {
    setFemale(!female);
  };

  const checkLuggage = () => {
    setLuggage(!luggage);
  };

  return (
    <SafeAreaView style={Styles.mainContainer}>
      <View style={Styles.TopSection}>
        <Text style={{ paddingLeft: "25%", color: "white" }}>{depature}</Text>
        <Text style={{ padding: 5, color: "white" }}>{direction}</Text>
        <Text style={{ padding: 5, color: "white" }}>{arrival}</Text>
      </View>
      <View style={Styles.map}></View>
      <View style={Styles.body}>
        <View style={Styles.Button}>
          <TouchableOpacity
            onPress={() => console.log("Delete Button Pressed")}
            style={Styles.DeleteButton}
          >
            <Text style={{ paddingLeft: 10, fontSize: 1 }}>{deleteIcon}</Text>
            <Text style={{ color: "red", paddingTop: 5 }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Edit Button Pressed")}
            style={Styles.EditButton}
          >
            <Text style={{ paddingLeft: 10, fontSize: 1 }}>{editIcon}</Text>
            <Text style={{ color: "blue", paddingTop: 5 }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.TopBAR}>
          <View style={Styles.backgroundContainer}>
            <Text
              style={{
                padding: 15,
                paddingLeft: "20%",
                fontSize: 15,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {clock}
              {date}
              {time}
            </Text>
          </View>
        </View>
        <View style={Styles.MiddleBAR}>
          <View style={Styles.backgroundContainer2}>
            <Text style={{ padding: 20, fontSize: 18 }}>
              {dollar} {price}
            </Text>
          </View>
          <View style={Styles.backgroundContainer4}>
            <Text style={{ padding: 20, fontSize: 18 }}>
              {arrowSwap} {occurence}
            </Text>
          </View>
          <View style={Styles.backgroundContainer2}>
            <Text style={{ padding: 20, fontSize: 18 }}>
              {" "}
              {seat} {numberSeat}{" "}
            </Text>
          </View>
        </View>
        <View style={Styles.LastSection}>
          <View style={Styles.backgroundContainer3}>
            <TouchableOpacity
              onPress={() => checkPet()}
              style={pet ? Styles.iconSelected : Styles.icons}
            >
              <Text style={{ paddingLeft: 30, paddingTop: 8, fontSize: 1 }}>
                {" "}
                {petIcon}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.backgroundContainer3}>
            <TouchableOpacity
              onPress={() => checkSmoke()}
              style={smokeFree ? Styles.iconSelected : Styles.icons}
            >
              <Text style={{ paddingLeft: 30, paddingTop: 8, fontSize: 1 }}>
                {smokeIcon}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.backgroundContainer3}>
            <TouchableOpacity
              onPress={() => checkFemale()}
              color="red"
              style={female ? Styles.iconSelected : Styles.icons}
            >
              <Text style={{ paddingLeft: 30, paddingTop: 8, fontSize: 1 }}>
                {genderIcon}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.backgroundContainer3}>
            <TouchableOpacity
              onPress={() => checkLuggage()}
              style={luggage ? Styles.iconSelected : Styles.icons}
            >
              <Text style={{ paddingLeft: 30, paddingTop: 8, fontSize: 1 }}>
                {luggageIcon}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.detail}>
          <Text
            style={{
              padding: 10,
              paddingLeft: "5%",
              fontSize: 20,
            
            }}
          >
            {user}
            {name}
            <View
              style={{
                fontSize: 20,
                paddingLeft: 190,
                // paddingTop:5,
              }}
            >
              <Button onPress={() => console.log("Preview Button Pressed")}>
                Preview
              </Button>
            </View>
          </Text>
          <Text
            style={{
              padding: 10,
              paddingLeft: "5%",
              fontSize: 15,
            }}
          >
            {ride}
            {duration}
            {rating}
          </Text>
          <View
            style={{
              fontSize: 20,
              paddingBottom: 20,
              paddingLeft: 290,
              marginRight: 25,
              // paddingTop:5,
            }}
          >
            <Button onPress={() => console.log("Message Button Pressed")}>
              Message
            </Button>
          </View>
        </View>
        <View style={Styles.buttonSection}>
          <TouchableOpacity
            onPress={() => console.log("start pressed")}
            style={Styles.StartButton}
          >
            <Text style={{ paddingLeft: "40%", fontSize: 1 }}>{Play}</Text>
            <Text style={{ color: "white", paddingTop: 5, paddingLeft: 10 }}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    display: "flex",
  },
  map: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 0.5,
    backgroundColor: "#FFFFFF",
    height: 200,
    borderRadius: 2,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    width: "95%",
  },
  iconSelected: {
    borderWidth: 3.2,
    width: "100%",
    height: "100%",
  },
  icons: {
    width: "100%",
  },
  MiddleBAR: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "10%",
    marginBottom: "7%",
  },
  TopBAR: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "10%",
  },
  LastSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "15%",
    paddingBottom: "10%",
  },
  buttonSection: {
    paddingTop: "15%",
  },
  backgroundContainer: {
    margin: 10,
    marginBottom: 25,
    borderWidth: 0.4,
    backgroundColor: "#FFFFFF",
    height: 50,
    shadowColor: "#000000",
    borderRadius: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: "95%",
  },
  detail: {
    margin: 10,
    marginBottom: 25,
    borderWidth: 0.4,
    backgroundColor: "#FFFFFF",
    height: 100,
    shadowColor: "#000000",
    borderRadius: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    width: "95%",
  },
  backgroundContainer2: {
    margin: 10,
    marginTop: 60,
    borderWidth: 0.4,
    backgroundColor: "#FFFFFF",
    height: 60,
    shadowColor: "#000000",
    borderRadius: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: "18.5%",
  },

  backgroundContainer5: {
    margin: 10,
    marginTop: 60,
    borderWidth: 0.4,
    backgroundColor: "#FFFFFF",
    height: 10,
    shadowColor: "#000000",
    borderRadius: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: "18.5%",
  },
  backgroundContainer4: {
    margin: 10,
    marginTop: 60,
    borderWidth: 0.4,
    backgroundColor: "#FFFFFF",
    height: 60,
    shadowColor: "#000000",
    borderRadius: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: "48.5%",
  },
  backgroundContainer3: {
    margin: 10,
    backgroundColor: "#FFFFFF",
    height: 40,
    shadowColor: "#000000",
    borderRadius: 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: "20%",
    marginBottom: 10,
  },
  TopSection: {
    flexDirection: "row",
    padding: 50,
    alignItems: "center",
    backgroundColor: "#21A656",
    height: "20%",
  },
  body: {
    display: "flex",
  },
  DeleteButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
  },
  StartButton: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "blue",
    padding: 10,
    color: "white",
    backgroundColor: "blue",
    width: "90%",
    fontSize: 20,
  },
  EditButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
  },
  Button: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "space-evenly",
    paddingTop: "5%",
  },
});
