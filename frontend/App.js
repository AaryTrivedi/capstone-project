import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
<<<<<<< HEAD
=======
import DocumentUpload from "./components/IndexComponents/ProfileComponent/DocumentUpload";
>>>>>>> CP-114-admin-panel-endpoints
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


