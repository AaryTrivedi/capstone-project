import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import ManageRide from './components/IndexComponents/Rides/ManageRide'
import Routes from './components/Routes'
import { RideContainer } from "./components/IndexComponents/Rides/RideContainer";
import Chat from "./components/IndexComponents/Chat";
import Document from "./components/IndexComponents/ProfileComponents/Document.js"
import codePush from "react-native-code-push";


// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
      <NativeBaseProvider>
        {/* <ManageRide/> */}
        {/* <Routes/> */}
        <Document/>
      </NativeBaseProvider>
  );
}


