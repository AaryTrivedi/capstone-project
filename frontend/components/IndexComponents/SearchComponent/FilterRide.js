import React, { useState,useEffect} from 'react'
import { Text, View, Button, Heading, Input, Image } from "native-base";
import LocationAutoComplete from '../../Input/LocationAutoComplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import NumericInput from 'react-native-numeric-input';
import { getLocationDetails } from '../../../api/map';
import { getRides } from '../../../api/rides';

export default function FilterRide({ navigation }) {

    const [from, setFrom] = useState({}); 
    const [to, setTo] = useState({}); 
    const [date, setDate] = useState(new Date());
    const [pet, setPet] = useState(false);
    const [smokeFree, setSmokeFree] = useState(false);
    const [female, setFemale] = useState(false);
    const [luggage, setLuggage] = useState(false);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const arrow = <Icon name="long-arrow-down" size={60} />
    const [minAmount,setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState(0)
    const [seat,setSeat] = useState(0)
    const [preferences, setPreferences] = useState([''])
    
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onChangeMinAmount = (text)=>{
        setMinAmount(text)
    }

    const onChangeMaxAmount = (text) => {
        setMaxAmount(text)
    }
    const checkPet = () => {
        setPet(!pet)
    }

    const checkSmoke = () => {
        setSmokeFree(!smokeFree)
    }

    const checkFemale = () => {
        setFemale(!female)
    }

    const checkLuggage = () => {
        setLuggage(!luggage)
    }

    const handlePreferences = () => {
        const preferences = [];
        if (pet) { preferences.push("pet") }
        if (smokeFree) { preferences.push("somefree") }
        if (female) { preferences.push("female") }
        if (luggage) { preferences.push("luggage") }
        return preferences;
    }

    const handleSubmit = async () => {
        const filters = {};

        if (from.place_id) {
            filters["from.locationName"] = from.structured_formatting.main_text
        }

        if (to.place_id) {
            filters["to.locationName"] = to.structured_formatting.main_text;
        }

        if (maxAmount > 0) {
            filters["pricePerSeat"] = {
                "$lt": maxAmount
            }
        }

        const preferences = handlePreferences();
        if (preferences.length > 0) {
            filters["preferences"] = preferences;
        }

        const [rides, error] = await getRides(filters);
        if (error) {
            console.error(error);
            return;
        }

        navigation.navigate("AllRides", {
            rides: rides.data.data
        })
    }

    return (
        <View padding={3} flexDirection={"column"} justifyContent={"flex-start"}>
            <View>
                <Heading fontSize={"2xl"}>Filter Rides</Heading>
            </View>
            <View width={"full"}>
                <Text fontSize={"sm"}>From</Text>
                <LocationAutoComplete onChange={setFrom} />
            </View>
            <View width={"full"}>
                <Text fontSize={"sm"}>To</Text>
                <LocationAutoComplete onChange={setTo} />
            </View>
            <View>
                <Text fontSize={"sm"}>Amount</Text>
                <View>
                    <View>
                        <Text fontSize={"xs"}>Max</Text>
                        <NumericInput
                            onChange={setMaxAmount} />
                    </View>
                </View>
            </View>
            <View>
                <Text fontSize={"sm"}>Preferences</Text>
                <View flexDirection={"row"} justifyContent={"space-between"}>
                    <Button
                        marginX={3}
                        padding={3}
                        backgroundColor="white"
                        >
                        <Image
                            source={require("../../../assets/pet.png")}
                            height={25}
                            width={25}
                        ></Image>
                    </Button>
                    <Button
                        marginX={3}
                        padding={3}
                        backgroundColor="white"
                        >
                        <Image
                            source={require("../../../assets/smokeFree.png")}
                            height={25}
                            width={25}
                        ></Image>
                    </Button>
                    <Button
                        marginX={3}
                        padding={3}
                        backgroundColor="white"
                        >
                        <Image
                            source={require("../../../assets/female.png")}
                            height={25}
                            width={25}
                        ></Image>
                    </Button>
                    <Button
                        marginX={3}
                        padding={3}
                        backgroundColor="white"
                        >
                        <Image
                            source={require("../../../assets/luggage.png")}
                            height={25}
                            width={25}
                        ></Image>
                    </Button>
                </View>
            </View>
            <View>
                <Button
                    onPress={handleSubmit}>
                    Search
                </Button>
            </View>
        </View>
    );
}