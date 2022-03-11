import React , { useCallback,useEffect, useLayoutEffect, useState } from "react";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    // const onSend = useCallback((messages = []) => {
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])
  
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
        user={{ _id: 1, name: 'Aarya' }}
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
