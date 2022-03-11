import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import { AuthProvider, AuthStateValue } from "./context/AuthContext";
import Routes from './components/Routes';
import Chat from "./components/IndexComponents/Chat";
import Chats from "./components/IndexComponents/Chat";
import ChatScreen from "./components/IndexComponents/ChatScreen";

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
        {/* <Routes /> */}
        {/* <Chat/> */}
        <ChatScreen/>
      </AuthProvider>
    </NativeBaseProvider>
  );
}


