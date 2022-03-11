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
  TextInput,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { display, flex, width } from "styled-system";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default class ForgetPassword extends React.Component {

    
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValidate: false,
      error: "",
      isError: false,
      submitButton: false,
    };
  }

  handleEmail = (text) => {
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(text)) {
      this.setState({
        error: "Email is not valid",
        isError: true,
        submitButton: false,
        emailValidate: false,
      });
      return false;
    }

    if (
      this.state.numValidate &&
      this.state.passValidate &&
      this.state.emailValidate &&
      this.state.fnameValidate &&
      this.state.lnameValidate
    ) {
      this.setState({ submitButton: true });
    } else {
      this.setState({
        isError: false,
        email: text,
        emailValidate: true,
        error: "",
      });
      return true;
    }
  };

  handleSubmit = () => {
    const { isError, error } = this.state;
    if (this.state.emailValidate) {
      alert(` 
         
            ${this.state.email}
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
          <Text style={styles.title}>Forgot Your Password ?</Text>
          

          <Text>Email</Text>
          <TextInput
            placeholder="johndoe@domain.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              this.state.emailValidate ? styles.success : null,
            ]}
            onChangeText={(value) => this.handleEmail(value)}
          />

          <Text style={styles.errMsg}>{this.state.error}</Text>
          <Button
            enabled={this.state.submitButton} // submitbtn value is true then the button will be disabled
            style={this.state.emailValidate ? styles.enabled : styles.disabled} //passBtn and emailBtn helps the button to define the css to use if both are true then and then the css of enable will be applied
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.btnText}>Send Email</Text>
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
    marginBottom:'5%',
  },
  warning:{
    marginTop: 10,
    marginBottom:'10%',
    paddingLeft:7,
    paddingRight:5,
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
    flexDirection:"row",


  },
  warningText:{
    fontSize:18,
    color: "#928B8B",
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
    textAlign:"center",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 5,
    marginBottom: '10%',
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