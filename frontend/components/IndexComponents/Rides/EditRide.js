import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,StyleSheet,Switch,SafeAreaView,Image,Dimensions,ScrollView,TouchableOpacity} from 'react-native'
import {Button,Input} from 'native-base'
import { Radio, Stack } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm from 'react-native-simple-radio-button';
import { LocationAutoComplete } from '../../Input/LocationAutoComplete';
import { getToken } from '../../../helpers/Token';
import axios from 'axios';
import { getLocationDetails } from '../../../api/map';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { getRideById, getRideOfCurrentUserAsDriver } from '../../../api/rides';
import NumericInput from 'react-native-numeric-input'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function EditRide({ route, navigation}) {

    const { rideId } = route.params;
    const [date, setDate] = useState(new Date());
    const [role, setRole] = useState();
    const [from, setFrom] = useState(false);
    const [to, setTo] = useState(false);
    const [amount, setAmount] = useState(0);
    const [seatsAvailable, setSeatsAvailable] = useState(0);
    const [fields, setFields] = useState([{ value: null, key: 1 }]);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [rideDetails, setRideDetails] = useState({})
  
    const [pet, setPet] = useState(false);
    const [smokeFree, setSmokeFree] = useState(false);
    const [female, setFemale] = useState(false);
    const [luggage, setLuggage] = useState(false);
    const [isRecurring, setRecurring] = useState(false);
    const [selectedTeams, setSelectedTeams] = useState([])
    const [rides, setRides] = useState([]);
 
    const [errors,setErrors] = useState(
      {
        fromError : "",
        toError : "",
        dateError : "",
        amountError : "",
        seatError : "",
        stopAmountError : "",
        seatsError: ""
      }
    );

    useEffect(() => {
        getRideById(rideId).then(response => {
          const [result, error] = response;
          if (error) {
            console.error(error);
            return;
          }
          const { ride } = result.data;
         // console.log(ride)
          setRideDetails(result.data.ride)
          setDate(ride.startDateAndTime)
          setSeatsAvailable(ride.numberOfSeats)
          setAmount(ride.pricePerSeat)
          setRole(ride.paymentType)
        })
    }, []);

    
    const setInitialPaymentMethod = (paymentMethod) => {
      if(paymentMethod === "cash"){
        setPaymentInitial(0)
      }
      else if(paymentMethod === "card"){
        setPaymentInitial(1)
      }
    };

    const K_OPTIONS = [
      {
        item: 'Sunday',
        id: 1,
      },
      {
        item: 'Monday',
        id: 2,
      },
      {
        item: 'Tuesday',
        id: 3,
      },
      {
        item: 'Wednesday',
        id: 4,
      },
      {
        item: 'Thursday',
        id: 5,
      },
      {
        item: 'Friday',
        id: 6,
      },
      {
        item: 'Saturday',
        id: 7,
      }
    ]
  
    const toggleSwitch = () => {
      setRecurring(!isRecurring)
    };
    const [submitBtn, setSubmitBtn] = useState(true);
    const [error, setError] = useState([{}]);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      console.log(currentDate);
      setShowDateTimePicker(false)
    };
    const handleChangeStop = (i, loc) =>{
      const values = [...fields];
      values[i].value = loc;
      setFields(values);
    }
    const handleStopAmount = (i, loc) =>{
      const values = [...fields];
      if(fields[0].values === ""){
        setErrors({
                  ...errors,
                  stopAmountError : "Please select stop address first !"
              })  
      }
      else if(loc === null)
      {
        setErrors({
                  ...errors,
                  stopAmountError : "Amount can not be empty"
              })    
      }
      else
      { 
        setErrors({
          ...errors,
          stopAmountError: "",
        });   
        values[i].amount = loc;
        setFields(values);
      }
    }
    const handleAdd =()=> {
      const values = [...fields];
      values.push({ value: null });
      setFields(values);
    }
  
    const handleRemove = (i) => {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
    }
    
    const handleFrom =(text) => {
      if(text === "" || text === undefined || text === null)
      {
        setErrors({
                  ...errors,
                  fromError : "Please select 'from' location"
              })
      }
      else
      {
        setErrors({
                  ...errors,
                  fromError : ""
              })
      }
  
    }
  
    const handleTo = (text)=> {
      if(text === "" || text === undefined || text === null)
      {
        setErrors({
                  ...errors,
                  toError : "Please select 'to' location"
              })
      }
      else
      {
        setErrors({
                  ...errors,
                  toError : ""
              })
      }
    }
    const handleAmount = (value) => {
      let pattern = new RegExp(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/);
      if(value.trim() === "")
      {
        setErrors({
                  ...errors,
                  amountError : "Please enter a valid amount! "
              }) 
      }else if(!pattern.test(value)){ 
        setErrors({
                  ...errors,
                  amountError : "Only numeric values are allowed! "
              }) 
      }else{
        setErrors({
                  ...errors,
                  amountError : ""
              }) 
        setAmount(value)
      };
  
    }

    const handleSeat = (value) => {
        let pattern = new RegExp(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/);
        if(value.trim() === "")
        {
          setErrors({
                    ...errors,
                    seatError : "Please enter a valid seat number! "
                }) 
        }else if(!pattern.test(value)){ 
          setErrors({
                    ...errors,
                    seatError : "Only numeric values are allowed! "
                }) 
        }else{
          setErrors({
                    ...errors,
                    seatError : ""
                }) 
        };
    }
    
    const checkPet = () => {
      setPet(!pet)
    }
    const checkSmoke = () => {
      setSmokeFree(!smokeFree)
    }
    const checkFemale = () =>{
      setFemale(!female)
    }
    const checkLuggage = () =>{
      setLuggage(!luggage)
    }
    const handlePreferences=()=>{
      const preferences = [];
      if (pet) { preferences.push("pet") }
      if (smokeFree) { preferences.push("somefree") }
      if (female) { preferences.push("female") }
      if (luggage) { preferences.push("luggage") }
      return preferences;
    }
    const getStopsValue = async () => {
      const stops = [];
      for (const field of fields) {
        if (field !== undefined && field !== null && field.value !== undefined && field.value !== null) {
          const [locationDetailsResponse, locationDetailsError] = await getLocationDetails(field.value.place_id);
          const { result: locationDetails } = locationDetailsResponse.data;
          const details = {
            locationName: field.value.structured_formatting.main_text,
            latitude: locationDetails.geometry.location.lat,
            longitude: locationDetails.geometry.location.lng,
          };
          stops.push(details);
        }
      }
      return stops;
    }
    const handlePost = async ()=>{
  
      const [fromLocationDetailsResponse, fromLocationDetailsError] =
        await getLocationDetails(from.place_id);
      const [toLocationDetailsResponse, toLocationDetailsError] =
        await getLocationDetails(to.place_id);
  
      const { result: fromLocationDetails } = fromLocationDetailsResponse.data;
      const { result: toLocationDetails } =
        toLocationDetailsResponse.data;
  
      const fromDetails = {
        locationName: from.structured_formatting.main_text,
        latitude: fromLocationDetails.geometry.location.lat,
        longitude: fromLocationDetails.geometry.location.lng,
      };
  
      const toDetails = {
        locationName: to.structured_formatting.main_text,
        latitude: toLocationDetails.geometry.location.lat,
        longitude: toLocationDetails.geometry.location.lng,
      };
  
      const preferences = handlePreferences()
      const stops = await getStopsValue();
      const details = {
        from: fromDetails,
        to: toDetails,
        preferences,
        startDateAndTime: date,
        numberOfSeats: Number(seatsAvailable),
        pricePerSeat: Number(amount),
        paymentType: paymentMethod.toLowerCase(),
        stops
      };
  
      try {
        const token = await getToken();
        const config={
            headers:{
                "Content-type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.post(
            `http://localhost:4000/rides`,
            details,
            config
            );
        } catch (e) {
          console.error(e);
          Alert.alert(e)
        }
   
     }
  
    function onMultiChange() {
      return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }
    
    return (
      <View style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
        <SafeAreaView style={Styles.container}>
          <ScrollView style={Styles.scrollView}>
            <Text style={Styles.header}>Edit a Ride</Text>
            <Text style={Styles.secondaryHeader}>Ride Details</Text>
  
            <Text style={Styles.textLable}>From</Text>
            <LocationAutoComplete initialValue={from} onChange={setFrom} />
            <Text style={Styles.textLable}>To</Text>
            <LocationAutoComplete initialValue={to} onChange={setTo} />
  
            <TouchableOpacity
              onPress={() => {
                setShowDateTimePicker(!showDateTimePicker);
              }}
            >
              <Text style={Styles.textLable}>Date and Time</Text>
            </TouchableOpacity>
  
            <View style={Styles.dateTime}>
              {showDateTimePicker && (
                <DateTimePicker
                  value={date}
                  mode={"datetime"}
                  is24Hour={true}
                  onChange={(e, value) => onChange(e, value)}
                />
              )}
            </View>
  
            <Text style={Styles.textLable}>Amount</Text>
            <Input
              value={`${amount}`}
              style={Styles.input}
              placeholder={" $35"}
              keyboardType="decimal-pad"
              maxLength={6}
              autoCapitalize="none"
              onChangeText={(text) => handleAmount(text)}
            />

            <Text style={Styles.textLable}>Ride recurring ?</Text>
               <View style={{marginLeft:'3%',flex:1,alighItems:"flex-start"}}>
                  <Switch size="sm" value={isRecurring} onValueChange={toggleSwitch} />
                    {isRecurring&& 
                      <View> 
                      <SelectBox   
                         label="Select Days"
                         options={K_OPTIONS}
                         selectedValues={selectedTeams}
                         onMultiSelect={onMultiChange()}
                         onTapClose={onMultiChange()}
                         isMulti
                       />
                      </View>}
               </View>           

  
            <Text style={Styles.textLable}>Seats Available</Text>
            <View style={{marginLeft:'3%', marginTop:'1%'}}>
                   <NumericInput 
                       value = {seatsAvailable}
                       onChange={(value)=>setSeatsAvailable(value)} 
                       onLimitReached={(isMax,msg) => alert(msg)}               
                       valueType='real'
                       rounded 
                       minValue={0}
                    />
            </View>
  
            <Text style={Styles.textLable}>Preferences</Text>
  
            <View style={Styles.img}>
              <TouchableOpacity
                onPress={() => checkPet()}
               // style={rideDetails.preferences.includes('pet')?Styles.iconSelected:null}
              >
                <Image
                  source={require("../../../assets/pet.png")}
                  style={Styles.icons}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => checkSmoke()}
               // style={preferences.includes('smokeFree')?Styles.iconSelected:null}
              >
                <Image
                  source={require("../../../assets/smokeFree.png")}
                  style={Styles.icons}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => checkFemale()}
               // style={preferences.includes('female')?Styles.iconSelected:null}
              >
                <Image
                  source={require("../../../assets/female.png")}
                  style={Styles.icons}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => checkLuggage()}
              //  style={preferences.includes('luggage')?Styles.iconSelected:null}
              >
                <Image
                  source={require("../../../assets/luggage.png")}
                  style={Styles.icons}
                ></Image>
              </TouchableOpacity>
            </View>
  
            <Text style={Styles.textLable}>Payment Type</Text>
            <Radio.Group value={role} onChange={setRole}>
                        <Stack
                            direction={"row"}
                            alignItems="center"
                            space={4}
                            w="75%"
                            maxW="300px"
                        >
                            <Radio value="cash">Cash</Radio>
                            <Radio value="card">Card</Radio>
                        </Stack>
            </Radio.Group>
            {/* <View style={({ paddingTop: "5%" }, { marginLeft: "5%" })}>
              <RadioForm
                style={Styles.radio}
                radio_props={radio_props}
                itemShowKey="label"
                itemRealKey="value"
                formHorizontal={true}
                initial={paymentInitial}
                onPress={(value) => handleRole(value)}
              />

            </View> */}
  
            <Text style={Styles.secondaryHeader}>Stops</Text>
            <Text style={{color:"red"}}>
                             {errors.stopAmountError}
            </Text>
            <View>
              {fields.map((field, idx) => {
                return (
                  <View style={Styles.stopContainer} key={idx}>
                    <View style={{ width: "90%" }}>
                    <LocationAutoComplete
                      value={field.value}
                      onChange={(loc) => handleChangeStop(idx, loc)}
                    />
                    </View>
                    <Input placeholder = "$ 15" 
                           onChange = {(loc) => handleStopAmount(idx, loc)}>
                    </Input>
                    <TouchableOpacity
                      disabled={fields.length === 1}
                      style={Styles.stopButton}
                      onPress={() => handleRemove(idx)}
                    >
                     <Icon color="red" name="remove" size={25} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
  
            <View style={Styles.addBtnText}>
              <TouchableOpacity
                disabled={fields[fields.length - 1].value === null}
                onPress={() => handleAdd()}
              >
                <Text> + Add Stop</Text>
              </TouchableOpacity>
            </View>
            <Button style={Styles.enabled} onPress={() => alert(rides)}>
              Update Ride
            </Button>
          </ScrollView >
        </SafeAreaView >
      </View >
    );
  }

  
  const Styles = StyleSheet.create({
    header: {
      fontSize: 30,
      padding: 10,
      marginLeft: "3%"
    },
    enabled: {
      backgroundColor: '#21A656',
      justifyContent: "center",
      alignItems: "center",
      width: '90%',
      alignSelf: "center",
      textAlign: "center",
    },
    disabled:{
      backgroundColor:'#90d3ab',
      justifyContent : "center",
      alignItems : "center",
      width : '100%',
      alignSelf : "center",
      textAlign : "center",
      opacity: 0.5,
      color:'black'
    },
  
    innerText: {
      color: 'red',
      fontWeight : '700',
      fontSize : 18,
    },
  
    icons: {
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
  
    iconSelected: {
      borderWidth: 2,
      width: 30
    },
  
    addBtn:{
      width : '100%',
      height : 50,
      justifyContent : "center"  
    },
  
    addBtnText: {
      alignSelf: 'center',
      alignItems: 'center',
      padding: '3%',
      marginTop: '3%',
      textDecorationColor: 'pink',
      width: '50%',
    },
  
    Button: {
      borderBottomLeftRadius: 10,
      borderColor: 'pink'
    },
  
    item: {
      marginLeft: "5%",
      fontSize: 18,
    },
  
    textLable:{
      marginTop : "6%",
      marginLeft : "3%"
    },
  
    input:{
      borderColor:'black',
      height: 35 , 
      width : "90%" , 
      marginLeft : "3%",
      borderRadius :5,
    },
  
    dateTime : {
      width : "90%" , 
      marginLeft : "5%",
      
    },
    stopContainer:{
      flexDirection:"row",
      marginLeft : "1%",
      width : "88%",
    },
  
    img: {
      marginLeft: "5%",
      flexDirection: "row",
      justifyContent: 'space-between',
      marginRight: "8%",
    },
  
    stopInput: {
      flex: 1,
      borderColor: 'black',
      height: 35,
      borderWidth: 0.5,
      marginLeft: "5%",
      borderRadius: 5,
      marginRight: '15%',
      marginBottom: '2%'
    },
    stopButton:{
      marginRight : "15%",
      color:'#FF0000',
      alignSelf : "center",
      fontWeight: '100',
    },
  
    recurring:{
      borderColor:'black',
      height: 35 , 
      width : "90%" , 
      marginLeft : "3%",
      borderRadius :5,
      flexDirection:'row',
      alignItems:'center'
    },
  
  
    radio: {
      flex: 1,
      alignItems: 'center',
      marginRight: '3%'
    },
  
    secondaryHeader: {
      fontSize: 20,
      paddingLeft: 10,
      marginLeft: "3%",
      marginTop: '3%'
    },
  
    container:{
        flex: 1,
        marginRight:'3%',
        marginLeft : "3%",
    },
    screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
  
    viewWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  
    Input: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
    },
  
  
  })
  