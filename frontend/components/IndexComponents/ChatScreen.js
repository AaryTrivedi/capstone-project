import React , { useCallback,useEffect, useLayoutEffect, useState } from "react";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import io from "socket.io-client";
import { getUser } from "../../helpers/user";
import { getChatsBetweenUser } from "../../api/users";

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

export default function ChatScreen({ route, navigation }) {
    const [messages, setMessages] = useState([]);
    let socket = io("http://localhost:3001/");
    const { userId: id } = route.params;
    // const id = "622a6256935a001986b8bdc4";
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
        socket.on("message_receive", data => {
          if (data.forUserId !== id ) {
            console.log("HERhe");
            const newMessages = messages.slice();
            newMessages.push({ ...data, _id: uuidv4() });
            setMessages(newMessages);
          }
        })
    }, [])
  
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
    socket.emit("message_send", {
      message: newMessage[0].text,
      forUserId: id,
      fromUserId: user._id,
      user: user
    });
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
