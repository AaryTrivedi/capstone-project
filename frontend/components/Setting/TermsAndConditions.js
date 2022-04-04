import React from 'react';
import { View, Text, StyleSheet,ImageBackground,Dimensions } from 'react-native';
import {  ScrollView } from 'native-base';

export default function TermsAndConditions() {
    
    return (
        <ScrollView>
        <ImageBackground
                source={require('../../assets/login.png')}
                style={
                    { height: Dimensions.get('screen') }.height
                }
            >
            <View style={styles.container}>
            <Text style={styles.bold}>  {"\n"} Terms and Conditions </Text>
            <Text>Last updated: April 02, 2022
            {"\n"}Please read these terms and conditions carefully before using Our Service.</Text>
           
            <Text style={styles.bold}>  {"\n"} Interpretation and Definitions</Text>
            <Text style={styles.bold}>  {"\n"} Interpretation {"\n"}</Text>
           <Text>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
           <Text style={styles.bold}>  {"\n"} Definitions </Text>
           <Text style={{ paddingLeft: 20, paddingRight: 20, textAlign: "justify" }}>  {"\n"} For the purposes of these Terms and Conditions:

            Application means the software program provided by the Company downloaded by You on any electronic device, named Car Pooling

            Application Store means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.

            Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

            Country refers to: Ontario, Canada

            Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Car Pooling.

            Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.

            Service refers to the Application.

            Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the Terms and Conditions Generator.

            Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.

            You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.      {"\n"}
            </Text>
      
           
            
            
            </View>
        </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width:"90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#fff',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#21A656',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 1,
        marginLeft: "5%",
        marginBottom : "5%",
        marginRight: "5%",
        top:"10%"
    },
    bold: {fontWeight: 'bold'},
    Text:{
        justifyContent:"center"
    }
})
