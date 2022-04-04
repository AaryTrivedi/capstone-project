import React from 'react';
import { View, Text, StyleSheet,ImageBackground,Dimensions } from 'react-native';
import {  ScrollView } from 'native-base';

export default function Policy() {
    
    return (
            <ScrollView>
              
            <View style={styles.container}>
           <Text style={styles.bold} >{"\n"} Policy {"\n"}</Text>
            <Text><Text style={styles.bold}>Introduction : {"\n"} </Text>When you use Car Pooling, you trust us with your personal data. We’re committed to keeping that trust. That starts with helping you understand our privacy practices.
                  This notice describes the personal data we collect, how it’s used and shared, and your choices regarding this data. We recommend that you read this along with our privacy overview, which highlights key points about our privacy practices.
            </Text>
            <Text><Text style={styles.bold}>{"\n"}Overview :  {"\n"} 
            {"\n"}A. Scope :{"\n"} {"\n"}</Text>  
                    This notice applies to users of Car Pooling’s services anywhere in the world, including users of Car Pooling’s apps, websites, features, or other services.

                    This notice describes how Car Pooling and its affiliates collect and use personal data. This notice applies to all users of our apps, websites, features, or other services anywhere in the world, unless covered by a separate privacy notice, such as the Car Pooling Freight Privacy Notice or Careem Privacy Policy. This notice specifically applies to:

                    Riders: individuals who request or receive transportation, including those who receive transportation requested by another individual
                    Drivers: individuals who provide transportation to Riders individually or through partner transportation companies
                    Delivery recipients: individuals who request or receive food, or other products and services, including via Car Pooling, Postmates and Cornershop
                    Delivery persons: individuals who provide delivery services, including via Car Pooling, Postmates and Cornershop
                    This notice also governs Car Pooling’s other collections of personal data in connection with its services. For example, we may collect the contact information of individuals who use accounts owned by Car Pooling for Business customers, or of owners or employees of restaurants or other merchants; personal data of those who start but do not complete applications to be drivers or delivery persons; or other personal data in connection with our mapping technology and features.

                    All those subject to this notice are referred to as “users” in this notice.

                    In addition, please note the following:

                    For users in Argentina: The Public Information Access agency, in its role of Regulating Body of Law 25.326, is responsible for receiving complaints and reports presented by any data subjects who believe their rights have been impacted by a violation of the local data protection regulation.
                    For users in Brazil: Please see here for information regarding Car Pooling’s privacy practices required under Brazil’s General Data Protection Law (Lei Geral de Proteção de Dados - LGPD).
                    For California users: Information regarding Car Pooling’s privacy practices related to the California Consumer Privacy Act (CCPA) is available here.
                    For users in Colombia: This notice also applies for the lessors and lessees. For the purposes of this notice, lessors will be considered drivers and lessees will be considered riders.  
                    For users in Mexico: Please see here for information regarding Car Pooling’s privacy practices required under Mexico’s Mexican Personal Data Protection Law (Ley Federal de Protección de Datos Personales en Posesión de los Particulares).
                    For users in Nigeria: Car Pooling does not process the personal data of users in Nigeria for purposes of the legitimate interests of Car Pooling or other parties. Instead, Car Pooling processes such personal data on the grounds that it is necessary to fulfill our obligations to users under our Terms of Use or other agreements with users, or based on users’ consent.
                    For users in South Korea: Please see here for information about Car Pooling affiliate UT LLC's privacy practices.
                    For Guest Users: The personal data of those who order or receive trips or deliveries via partner websites or apps (such as when ordering from a restaurant or other merchant), or arranged by other account owners (collectively “Guest Users”) is used solely to provide such trips, deliveries, or other services requested through a third party, and for purposes of safety and security, customer support, research and development, enabling communication between users, and in connection with legal proceedings and requirements, each as described in “How we use personal data” below. Guest User personal data may be shared with third parties for these purposes. Such data may be associated with, and accessible by, the owner of that account. This specifically includes Guest Users who receive rides/deliveries ordered by owners of Car Pooling Health, Car Pooling Central, Car Pooling Direct or Car Pooling for Business accounts, or who receive rides or deliveries ordered by friends, family members or others. To submit questions, comments or complaints regarding Guest User data, or to submit requests regarding such data, please visit here.
                    Our practices are subject to applicable laws in the places in which we operate. This means that we engage in the practices described in this notice in a particular country or region only if permitted under the laws of those places. Please contact us here or through the addresses below with any questions regarding our practices in a particular country or region.
                    <Text style={styles.bold}>{"\n"} {"\n"}B. Data controller and transfer  {"\n"}{"\n"} 
                                </Text>  

                    Car Pooling B.V. and Car Pooling Technologies Inc. are the data controllers for the personal data collected in connection with use of Car Pooling’s services in the European Economic Area, the United Kingdom and Switzerland.

                    Car Pooling Technologies Inc. is the data controller for the personal data collected in connection with use of Car Pooling’s services everywhere else.

                    Car Pooling B.V. (Mr. Treublaan 7, 1097 DP, Amsterdam, the Netherlands) and Car Pooling Technologies Inc. (1515 3rd Street, San Francisco, CA, 94158, USA) are the data controllers for the personal data collected in connection with use of Car Pooling’s services in the European Economic Area, the United Kingdom and Switzerland. If you’re a driver in the UK, the Car Pooling entity holding the relevant PHV operator license is a controller for complying with licensing requirements.

                    Car Pooling Technologies Inc. is the data controller for the personal data collected in connection with use of Car Pooling’s services everywhere else.

                    Car Pooling operates, and processes personal data, globally. We may also transfer such data to countries other than the one where our users live or use Car Pooling’s services. We do so in order to fulfill our agreements with users, such as our Terms of Use, or based on users’ prior consent, adequacy decisions for the relevant countries, or other transfer mechanisms as may be available under applicable law, such as the Standard Contractual Clauses.

                    Questions, comments, and complaints about Car Pooling’s data practices can be submitted here. You may also use this form to submit a question to Car Pooling’s Data Protection Officer.</Text>
            </View>
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
        top:"5%"
    },
    bold: {fontWeight: 'bold'},
    Text:{
        justifyContent:"center"
    }
})
