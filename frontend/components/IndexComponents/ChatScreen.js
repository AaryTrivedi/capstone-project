import React , { useCallback,useEffect, useLayoutEffect, useState } from "react";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import io from "socket.io-client";

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    let socket = io("http://localhost:3001/");

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ])
    }, [])
  
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
    socket.emit("message_send", {
      msg: "Test"
    })
  }
  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#21A656' />
        </View>
      </Send>
    );
  }
  return (
    <GiftedChat
        user={{ _id: 1, name: 'Aarya' }}
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        placeholder='Type your message here...'
        alwaysShowSend
        renderSend={renderSend}
    />
  );
}


const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
