import React, {Component} from 'react';
import {Text,View,StyleSheet, TouchableOpacity, Alert, Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';


export class RecentTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

     
    
    
   
    render() {
        
        return (
            <View style={Styles.container}>
                <View style={Styles.parentContainer}>
                    <View style={Styles.childContainer}>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>{this.props.FirstName}{' '}{this.props.LastName}</Text>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>{this.props.price}</Text>
                    </View>
                    <View style={Styles.childContainer}>
                            <Text style={{ fontSize: 12, color: "#7C7979"  }}>{this.props.Date}{'   '}{this.props.Time}</Text>
                            <Image
                              source={require("../../assets/Mastercard-logo.png")}
                              style={Styles.icons} ></Image>
                    </View>
                </View>
            </View>
        );
    }
}
    
    
const Styles = StyleSheet.create({

        container:{
            justifyContent:'center',
            
        },
        childContainer:{
            padding:10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            
        },
        parentContainer:{
            backgroundColor:'#fff',
            borderWidth: 1,
            borderRadius: 1,
            borderColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 1,
            marginLeft: 20,
            marginRight: 20,
            marginTop:5,
        },
    
});
