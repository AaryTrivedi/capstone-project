import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import DocumentPickerExample from "./components/DocumentPicker";
import { AuthProvider, AuthStateValue } from "./context/AuthContext";
import Routes from './components/Routes'

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


