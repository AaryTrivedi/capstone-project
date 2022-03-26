import { ScrollView, View, Heading, Button } from 'native-base'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getRequestList, requestAccept, requestReject } from '../../../api/rides'
import Icon from 'react-native-vector-icons/FontAwesome';

const RequestList = ({rideId,limit=null}) => {
    const user = <Icon name="user-circle-o" size={20}/>
    const [requestList, setRequestList] = useState([])
    const getRides = async () => {
        const [requestList, error] = await getRequestList(rideId);
        if (error) {
            console.log(error);
            return;
        }
        return requestList.data
    }

    useEffect(() => {
        getRides()
            .then(allRequest => {
                if(limit === null){
                    setRequestList(allRequest)
                }
                else{
                    setRequestList(allRequest.slice(0, limit))
                }
            })
        
    }, []);

    const acceptRequest = async (rideId, userId, requestId) => {
        requestAccept(rideId, userId).then((result) => {
            const [response, error] = result;
            if (error) {
                console.error(error);
                return;
            }
            const newAllRequests = requestList.filter(
                (request) => request.id !== requestId
            );
            setRequestList(newAllRequests);
        });
    };

    const rejectRequest = async (rideId, userId, requestId) => {
        requestReject(rideId, userId).then((result) => {
            const [response, error] = result;
            if (error) {
                console.log(error);
                return;
            }
            const newAllRequests = requestList.filter(
                (request) => request.id !== requestId
            );
            setRequestList(newAllRequests);
        });
    };

    return (
        <View>
            <Heading size="xl">Requests</Heading>
            <ScrollView>
                {requestList.map((request, index) => (
                    <View
                        key={index}
                        style={[Styles.container, Styles.requestContainer]}
                    >
                        <Text
                            style={{ marginLeft: 10, justifyContent: "center" }}
                        >
                            {user} {request.userId.firstName}{" "}
                            {request.userId.lastName}
                        </Text>
                        <View style={Styles.buttonContainer}>
                            <Button
                                onPress={() =>
                                    rejectRequest(rideId, request.userId._id, request._id)
                                }
                                variant={"link"}
                                colorScheme={"red"}
                            >
                                Decline
                            </Button>
                            <Button
                                onPress={() =>
                                    acceptRequest(
                                        rideId,
                                        request.userId._id,
                                        request._id
                                    )
                                }
                                variant={"outline"}
                                colorScheme={"emerald"}
                            >
                                Accept
                            </Button>
                            {/* <TouchableOpacity
                                onPress={() =>
                                    requestReject(
                                        rideId,
                                        request.userId._id
                                    ).then((value) => alert(value))
                                }
                            >
                                <Text style={{ color: "red", fontSize: 18 }}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                            <Text> </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    requestAccept(
                                        rideId,
                                        request.userId._id
                                    ).then((value) =>
                                        alert(JSON.stringify(value))
                                    )
                                }
                            >
                                <Text style={Styles.innerText}> Accept </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
export default RequestList

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    requestContainer: {
        margin: 10,
        borderWidth: 0.2,
        backgroundColor: '#FFFFFF',
        shadowColor: '#FFFFFF',
        borderRadius: 4,
        shadowColor: '#171717',
        width:'95%',
        shadowOpacity: 0.2,
        shadowRadius: 9,
        height:60,
    },
    buttonContainer:{
        flexDirection: 'row',
        marginRight:10,
    },
    innerText:{
        color: 'green',
        fontSize: 18, 
        borderWidth: 0.5, 
        borderColor: 'green',
        justifyContent:'center'
    }
})