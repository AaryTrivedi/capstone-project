import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import { AuthProvider, AuthStateValue } from "./context/AuthContext";
import Routes from './components/Routes'
import Signup from "./components/Signup";
import ResetPassword from "./components/IndexComponents/ProfileComponent/ResetPassword";
import Profile from "./components/IndexComponents/Profile";
import ForgetPassword from "./components/IndexComponents/ProfileComponent/ForgetPassword";
import RideDetails from "./components/RideDetailComponents/RideDetails";
import CusomerRideDetail from "./components/RideDetailComponents/CustomerRideDetail";

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
      {/* <AuthProvider>
        <Routes />
      </AuthProvider> */}
      {/* <Signup /> */}
      {/* <ResetPassword/> */}
      {/* <Profile/> */}
      {/* <RideDetails/> */}
      <CusomerRideDetail/>
      {/* <ForgetPassword/> */}
    </NativeBaseProvider>
  );
}


