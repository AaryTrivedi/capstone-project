import React from "react";
import { Button, Input, Row } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
} from "react-native";
import { borderColor, flex } from "styled-system";
import { color } from "react-native-reanimated";

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passValidate: false,
      tempPassword: "",
      error: "",
      isError: false,
      submitButton: false,
    };
  }

  handlePassword = (text) => {
    const { password } = this.state;

    if (text.trim() === "") {
      this.setState({
        error: "Please Enter password !",
        isError: true,
        submitButton: false,
      });
      return false;
    } else if (text.length < 6) {
      this.setState({
        error: "Password must be at least 6 character.",
        isError: true,
        submitButton: false,
      });
      return false;
    } else if (text.trim().length > 5) {
      if (text.trim() === password) {
        this.setState({
          submitButton: true,
          tempPassword: text.trim(),
          isError: false,
          error: "",
        });
        return true;
      } else if (password.trim() !== "" && text.trim() !== password) {
        this.setState({
          tempPassword: text.trim(),
          error: "Password does not match.",
          isError: true,
          submitButton: false,
        });
        return false;
      } else {
        this.setState({
          submitButton: true,
          tempPassword: text.trim(),
          isError: false,
          error: "",
        });
        return true;
      }
    }
  };

  handleConfirmPassword = (text) => {
    if (text.trim() === "") {
      this.setState({
        error: "Please Enter password!1",
        isError: true,
        submitButton: false,
      });
      return false;
    } else if (this.state.tempPassword !== text.trim()) {
      this.setState({
        password: text.trim(),
        error: "Passwords does not match.",
        isError: true,
        submitButton: false,
        passValidate: false,
      });
      return false;
    } else {
      this.setState({
        submitButton: true,
        passValidate: true,
        password: text.trim(),
        isError: false,
        error: "",
      });
      return true;
    }
  };

  handleSubmit = () => {
    const { isError, error } = this.state;
    if (this.state.passValidate) {
      alert(` 
           
            ${this.state.tempPassword}
            ${this.state.password}
        `);
    } else if (isError) {
      alert(`${error}`);
    } else {
      alert("Please fill the information");
    }
  };


  render() {
    return (
      <ImageBackground
            source={require("../../../assets/login.png")}
            style={{ height: Dimensions.get("screen") }.height}
        >
      <View style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        
        
          <View style={styles.container}>
            <Text style={styles.title}>Create New Password</Text>
            {/* <View style={styles.warning}>
            <Text style={styles.warningText}>Your new password must be different from previously used password.</Text>
            </View> */}
            
            <Text>Password</Text>
            <TextInput
              style={[styles.input]}
              placeholder="********"
              secureTextEntry={true}
              onChangeText={(value) => this.handlePassword(value)}
            />
            <Text>Confirm Password</Text>
            <TextInput
              style={[styles.input]}
              placeholder="********"
              secureTextEntry={true}
              onChangeText={(value) => this.handleConfirmPassword(value)}
            />
        
            <Text style={styles.errMsg}>{this.state.error}</Text>
            <Button
              enabled={this.state.submitButton} // submitbtn value is true then the button will be disabled
              style={
                this.state.passValidate                
                  ? styles.enabled
                  : styles.disabled
              } //passBtn and emailBtn helps the button to define the css to use if both are true then and then the css of enable will be applied
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.btnText}>Change Password</Text>
            </Button>
          </View>
      </View>
      </ImageBackground>

    );
  }
}
const styles = StyleSheet.create({
    btnText:{
        color:"white",
    },
  errMsg: {
    fontWeight: "bold",
    color: "red",
    marginBottom:'8%',
  },
  warning:{
    marginTop: 10,
    marginBottom:'20%',
    paddingLeft:15,
    paddingRight:10,
    paddingTop:5,
    width: '100%',
    height: 65,
    backgroundColor: '#fff',
    borderRadius:5,
    borderWidth:3,
    borderColor:'#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,

  },
  warningText:{
    fontSize:18,
    color: "#928B8B"
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  success: {
    borderColor: "#006400",
  },
  title: {
    fontSize: 35,
    // clear:"both",
    // display:'inline',
    fontWeight: "bold",
    paddingBottom: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  enabled: {
    backgroundColor: "#21A656",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  disabled: {
    backgroundColor: "#21A656",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    // opacity:0.5,
    color: "black",
  },
});
