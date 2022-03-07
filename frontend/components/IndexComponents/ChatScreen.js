import React from "react";
import { useState } from "react";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        {
          _id: 0,
          text: '',
          createdAt: new Date().getTime(),
          system: true
        },
   
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'Nishtha'
          }
        }
      ]);
function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
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
        user={{ _id: 1, name: 'Nishtha' }}
      messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        placeholder='Type your message here...'
        showUserAvatar
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
