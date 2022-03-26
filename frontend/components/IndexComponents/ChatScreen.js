import React , { useCallback,useEffect, useLayoutEffect, useState } from "react";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import io from "socket.io-client";
import { getUser } from "../../helpers/user";
import { getChatsBetweenUser } from "../../api/users";

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    let socket = io("http://localhost:3001/");
    const id = "622a6256935a001986b8bdc4";
    const [user, setUser] = useState({});

    useEffect(() => {
      getUser()
        .then(user => {
          setUser(user)
          getChatsBetweenUser(id)
            .then(result => {
              const [response, error] = result;
              if (error) {
                console.error(error);
                return;
              }
              const { messages } = response.data;
              for (const message of messages) {
                message.user = message.fromUser;
                message.text = message.message;
                message.createdAt = message.dateSent;
                message.user.name = message.user.firstName + ' ' + message.user.lastName;
              }
              setMessages(messages)
            })
        })
      // setMessages([
      //   {
      //     _id: 1,
      //     text: 'Hello developer',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'React Native',
      //     },
      //   },
      // ])
    }, [])
  
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
    socket.emit("message_send", {
      message: newMessage[0].text,
      forUserId: id,
      fromUserId: user._id,
      user: user
    })
    socket.on("message_receive", data => {
      const newMessages = messages.slice();
      newMessage.push(data);
      setMessages(newMessages);
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
        user={user}
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
