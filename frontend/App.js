import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import DocumentUpload from "./components/IndexComponents/ProfileComponent/DocumentUpload";
import { AuthProvider, AuthStateValue } from "./context/AuthContext";
import Routes from './components/Routes';
import StripeConsent from './components/payment/stripe-consent';
import AboutUs from "./components/Setting/About";
import TermsAndConditions from "./components/Setting/TermsAndConditions";
import Policy from "./components/Setting/Policy";
import Signup from "./components/Signup";

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
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}