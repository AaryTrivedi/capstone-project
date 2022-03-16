import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DocumentScreen from './DocumentScreen';
import ProfileScreen from './Screens/ProfileScreen'
import DriverLicense from './Screens/DriversLicense'
import LegalAgreement from './Screens/LegalAgreemnet'
import ProofOfWorkEligibility  from './Screens/ProofOfWorkEligibility'
import VehicalInsurance from './Screens/VehicalInsurance'
import VehicalInscpection from './Screens/VehicalInscpection'
import VehicalRegistration from './Screens/VehicalRegistration'



const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator headerMode= "none" initialRouteName='DocumentScreen'>
            <Stack.Screen name="Document Screen" component={DocumentScreen}/>
              <Stack.Screen name="Profile Screen" component={ProfileScreen} />
              <Stack.Screen name="ProofOfWorkEligibility" component={ProofOfWorkEligibility} />
              <Stack.Screen name="Legal Agreement" component={LegalAgreement} />
              <Stack.Screen name="Drivers License" component={DriverLicense} />
              <Stack.Screen name="Vehical Insepection" component={VehicalInscpection} />
              <Stack.Screen name="Vehical Insurance" component={VehicalInsurance} />
              <Stack.Screen name="Vehical Registration" component={VehicalRegistration} />


        </Stack.Navigator>
    </NavigationContainer>
  );
}