import {React, useState, useEffect} from 'react';
import { Text,View,StyleSheet,TouchableOpacity,Linking } from 'react-native'
import { Location } from './Location';
import { getRides } from '../../api/rides';
import { Button, Center } from 'native-base';
import {getToken} from '../../helpers/Token'

export default function ManageRide() {
    const[location,setLocation] =useState({})
    const[user,setUser] = useState({})
  
        getRides() .then(response => {
                const [result, error] = response;
                if (error) {
                    alert(error);
                    return;
                }
                alert(result.data.message);
            });
     useEffect(() => {     
        Location().then((value) => setLocation(value))   
        getUser().then((value)=>setUser(value))
    }, [location]) 

    return (
        <View style={Styles.container}>
            <TouchableOpacity
            style={Styles.button}
            onPress={() => {
                alert('Post a Ride Page');
              }}
            // onPress={()=>this.props.navigation.navigate('PostRide')}
            underlayColor='#fff'>
            <Text style={Styles.buttonText}> + Post New Ride </Text>
            </TouchableOpacity>
            
            <View></View>
             <View style={Styles.containerViewAll}> 
                <View style={Styles.box}>
                    <Text>Upcoming Rides</Text>
                    <TouchableOpacity onPress={()=>{alert('View All');}}><Text style={{color: '#0D92DD', textDecorationLine: 'underline'}}>View All</Text></TouchableOpacity> 
                    {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('AllRides')}><Text style={{color: '#0D92DD', textDecorationLine: 'underline'}}>View All</Text></TouchableOpacity> */}
                </View>
                <View style={{
                    borderBottomColor: '#CCCCCC',
                    borderBottomWidth: 1,
                    }}
                />
                <View style={Styles.ABC}>
                
          <Text>{location.long}</Text>
                </View>
                
            </View>
        

             <View></View>
            <View style={Styles.containerCompleted}> 
             <View style={Styles.box}> 
                <Text>Completed Rides</Text>
                <TouchableOpacity onPress={()=>{alert('View All');}}><Text style={{color: '#0D92DD', textDecorationLine: 'underline'}}>View All</Text></TouchableOpacity> 
                {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('CompletedRides')}><Text style={{color: '#0D92DD', textDecorationLine: 'underline'}}>View All</Text></TouchableOpacity> */}
             </View>
             <View style={{
                    borderBottomColor: '#CCCCCC',
                    borderBottomWidth: 1,
                    }}
                />
            <View style={Styles.ABC}>
                    
            </View>
            </View>

         </View>


    
    );
}

const Styles = StyleSheet.create({
    
    container:{
        justifyContent:'center',
        flex:1
    },
    button:{
        marginRight:40,
        marginLeft:40,
        marginTop:80,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#2265C9',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      buttonText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
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
      ABC:{
          height:"20%",
          borderBottomWidth: 1,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
      },
      

})
