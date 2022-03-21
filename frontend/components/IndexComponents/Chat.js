import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";

import { ListItem, SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChatScreen from "./ChatScreen";
const Messages = [
  {
    id: "1",
    userName: "Jess",
    userImg: require("../../assets/user-3.png"),
    messageTime: "4 mins ago",
    messageText: "Have a good one!",
  },
  {
    id: "2",
    userName: "Sandra",
    userImg: require("../../assets/user-1.png"),
    messageTime: "2 hours ago",
    messageText: "Hello! Are you available for tonight",
  },
  {
    id: "3",
    userName: "Samantha",
    userImg: require("../../assets/user-4.png"),
    messageTime: "1 hours ago",
    messageText: "Good Bye!",
  },
  {
    id: "4",
    userName: " Jack",
    userImg: require("../../assets/user-6.png"),
    messageTime: "1 day ago",
    messageText: "See you Again !",
  },
  // {
  //   id: "5",
  //   userName: " George",
  //   userImg: require("../../assets/user-5.png"),
  //   messageTime: "2 days ago",
  //   messageText: "Ok Thank You !",
  // },
  // {
  //   id: "6",
  //   userName: " Daniel",
  //   messageTime: "2 days ago",
  //   userImg: require("../../assets/user-2.png"),
  //   messageText: "Ok Thank You!",
  // },
  // {
  //   id: "7",
  //   userName: "Jess",
  //   userImg: require("../../assets/user-3.png"),
  //   messageTime: "4 mins ago",
  //   messageText: "Have a good one!",
  // },
  // {
  //   id: "8",
  //   userName: "Jess",
  //   userImg: require("../../assets/user-3.png"),
  //   messageTime: "4 mins ago",
  //   messageText: "Have a good one!",
  // },
  // {
  //   id: "9",
  //   userName: "Jess",
  //   userImg: require("../../assets/user-3.png"),
  //   messageTime: "4 mins ago",
  //   messageText: "Have a good one!",
  // },
];

const Chat = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View style={styles.background}>
          <SearchBar
            style={styles.searchbar}
            inputContainerStyle={{ backgroundColor: "#F2F2F2" }}
            leftIconContainerStyle={{ backgroundColor: "#F2F2F2" }}
            inputStyle={{ backgroundColor: "#F2F2F2" }}
            containerStyle={{
              backgroundColor: "white",
              justifyContent: "space-around",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            lightTheme
            round
            placeholder="Search"
            onChangeText={updateSearch}
            value={search}
          />
          <View style={styles.header}>
            <View style={styles.leftContainer}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 20, fontWeight: "bold", fontFamily: "Arial" },
                ]}
              >
                {"Recents Chats"}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 14, fontWeight: "bold", fontFamily: "Arial",color:"blue" },
                ]}
              >
                {"Requests"}
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <FlatList
              data={Messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("ChatScreen", { userName: item.userName })
                  }
                >
                  <View style={styles.userinfo}>
                    <View style={styles.userimgwrapper}>
                      <Image
                        style={styles.userimg}
                        source={item.userImg}
                      ></Image>
                    </View>
                    <View style={styles.textsection}>
                      <View style={styles.userinfotext}>
                        <Text style={styles.username}>{item.userName}</Text>
                        <Text style={styles.posttime}>{item.messageTime}</Text>
                      </View>
                      <Text style={styles.messagetext}>{item.messageText}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft:"5%",
    margin: 10,
  },

  rightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight:"5%",
    margin: 10,
  },

  background: {
    backgroundColor: "white",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingLeft:"5%",
    paddingRight:"5%",
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    width: "100%",
    paddingTop: 10,
  },
  userinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
  },
  userimgwrapper: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  userimg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textsection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: "80%",
  },

  userinfotext: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  username: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Arial",
  },

  posttime: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Arial",
  },

  messagetext: {
    fontSize: 14,
    color: "#333333",
  },
  searchbar: {},
});