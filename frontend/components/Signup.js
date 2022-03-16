import React from "react";
import { Button,Input } from 'native-base'
import {
  StyleSheet,  
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import axios from 'axios';
import  RadioForm from 'react-native-simple-radio-button';
import { setToken } from "../../frontend/helpers/Token";

const radio_props = [
  {label: 'Driver', value: 0 },
  {label: 'Passenger', value: 1 }
];
export default class Signup extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
          firstname: "",
          lastname: "",
          fnameValidate:false,
          lnameValidate:false,
          email:"",
          emailValidate:false,
          phonenumber:"",
          numValidate:false,
          password: "",
          passValidate:false,
          tempPassword:"",
          error:'',
          isError : false,
          submitButton : false,
          tempConfirmPassword:"",
          changedPassword:"",
          role:"",
          tester:false,
        }
        this.handleFirstName=this.handleFirstName.bind(this)
        this.handleLastName=this.handleLastName.bind(this)
        this.handleEmail=this.handleEmail.bind(this)
        this.handleNumber=this.handleNumber.bind(this)
        this.handlePassword=this.handlePassword.bind(this)
        this.handleConfirmPassword=this.handleConfirmPassword.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
      }
        
      handleFirstName =(text)=>{
        if(text.trim() === ""){
          this.setState({
            error:"Please enter First Name .",
            isError:true,
            submitButton:false,
            fnameValidate:false
          })
          return false
        }
        else{
          this.setState({
            isError:false,
            // submitButton:true,
            firstname:text,
            error:"",
            fnameValidate:true
          })
          return true
        }
      }
      handleLastName =(text)=>{
        if(text.trim() === ""){
          this.setState({
            error:"Please enter Last Name",
            isError:true,
            submitButton:false,
            lnameValidate:false
          })
          return false
        }
        if(this.state.numValidate&&this.state.passValidate && this.state.emailValidate && this.state.fnameValidate && this.state.lnameValidate){
          this.setState({submitButton:true})
        }
        else{
          this.setState({
            //submitButton:true,
            isError:false,
            lastname:text,
            error:"",
            lnameValidate:true,
          })
          return true
        }
      }
      handleEmail =(text)=>{
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(!pattern.test(text)){
          this.setState({
            error:"Email is not valid",
            isError:true,
            submitButton:false,
            emailValidate:false
        })
        return false
        }

        if(this.state.numValidate && this.state.passValidate && this.state.emailValidate && this.state.fnameValidate && this.state.lnameValidate){
          this.setState({submitButton:true})
        }
        else{
          this.setState({
            isError:false,
            email:text,
            emailValidate:true,
            error:''
        }) 
        return true
        }
      }
      handleNumber =(text)=>{
        let pattern = new RegExp(/^[0-9\b]+$/);
        if(text.trim() === "")
        {
          this.setState({
            error:"Phone Number is not valid",
            isError:true,
            submitButton:false,
            numValidate:true
        })
        return false
        }
        if (!pattern.test(text)) {
          this.setState({
            error:"Only numbers are accepted!",
            isError:true,
            submitButton:false,
            numValidate:false
        })
          return false;
        }
        else if(text.length < 10){
          this.setState({
            error:"Enter valid phone number!",
            isError:true,
            submitButton:false,
            numValidate:false
        })
          return false;
        }
        if(this.state.numValidate && this.state.passValidate && this.state.emailValidate && this.state.fnameValidate && this.state.lnameValidate){
          this.setState({submitButton:false})
        }
        else{
          this.setState({
            // submitButton:true,
            isError:false,
            phonenumber: text,
            numValidate:true,
            error:'',
        }) 
        return true
        }
      }
      handlePassword =(text)=>{
        const{password} = this.state
        
        if(text.trim() === ""){
            this.setState({
              error:"Please Enter password !",
              isError:true,
              submitButton:false
          })
          return false;
        }
        
        else if(text.length < 6)
        {
            this.setState({
              error:"Password must be at least 6 character.",
              isError:true,
              submitButton:false
          })
          return false
        }
        
       else if(text.trim().length > 5){
         if(text.trim() === password)
        {
          this.setState({
            submitButton:true,
            tempPassword:text.trim(),
            isError:false,
            error:""  
          }) 
          return true
        }
        else if(password.trim() !== "" && text.trim() !== password)
        {
            this.setState({
              tempPassword : text.trim(),
              error:"Password does not match.",
              isError:true,
              submitButton:false
          })
          return false
        }
        else
        {
          this.setState({
            // submitButton:true,
            tempPassword:text.trim(),
            isError:false,
            error:""  
          }) 
          return true
        }
       } 
      }
      handleConfirmPassword=(text)=>{
        if(text.trim() === ""){
            this.setState({
              error:"Please Enter password!",
              isError:true,
              submitButton:false
          })
          return false;
        } 
        else if(this.state.tempPassword !== text.trim()) {
            this.setState({
              password:text.trim(),
              error:"Passwords does not match.",
              isError:true,
              submitButton:false,
              passValidate:false
          })
          return false;
        }
        
        else
        {
          this.setState({
            submitButton:true,
            passValidate:true,
            password:text.trim(),
            isError:false,
            error:""  
          }) 
          return true
        }
      }
      handleRole=(text)=>
      {
        if(!text)
        {
          this.setState({
            role:radio_props[1].label
          })
        }
        else
        {
          this.setState({
          role : radio_props[text].label
          }) 
        return true 
        }  
      }
      handleSubmit= async (e) => {
        if(this.state.fnameValidate && this.state.lnameValidate && this.state.emailValidate && this.state.numValidate && this.state.passValidate)
        {
          try{
            const config={
              headers: {
                "Content-type" : "application/json"
              }
            }
            const {data} = await axios.post(`http://localhost:4000/users/`,
              {
                email: this.state.email,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                password:this.state.password,
                phonenumber : this.state.phonenumber.toString(),
                role:this.state.role,
              },
              config
              );  
              setToken('token',data.data.token).then(
                this.props.navigation.navigate('DashBoard',{screen:'Profile'})                    
              );
            } catch (e) {
                alert(e.response.data.error)  
                this.setState({error:e.response.data.error})
            }
        }
       else{
            Alert.alert("Something went wrong")
       }
    }
      
    render(){   
    return (
      <View
      style={{flex:1}}
      showsVerticalScrollIndicator={false}>
        <ImageBackground
           source={require('../assets/login.png')}
           style={styles.imgBackground}
           > 
        <View style={styles.container}>
        <Text style={styles.title}>Create an</Text><Text style={styles.title}>Account</Text>
            <Text>First Name</Text>
            <Input
                style={[styles.input]}
                placeholder="John"
                keyboardType="ascii-capable"
                onChangeText = {(value)=>this.handleFirstName(value)}
            />
            <Text></Text>
            <Text>Last Name</Text>
            <Input
                style={[styles.input]}
                placeholder="Doe"
                keyboardType="ascii-capable"
                onChangeText = {(value)=>this.handleLastName(value)} 
            />
            <Text></Text>
            <Text>Email</Text>
            <Input
                placeholder="johndoe@domain.com"
                keyboardType='email-address'
                autoCapitalize="none"
                style={[styles.input,
                this.state.emailValidate? styles.success : null]}
                onChangeText = {(value)=>this.handleEmail(value)} 
            />
            <Text></Text>
            <Text>Phone Number</Text>
            <Input
                style={[styles.input]}
                type="number"
                placeholder="412-123-4567"
                keyboardType='numeric'
                onChangeText = {(value)=>this.handleNumber(value)}
                maxLength={10} 
            />
            <Text></Text>
            <Text>Password</Text>
            <Input
                style={[styles.input]}
                placeholder="********"
                secureTextEntry={true}
                onChangeText = {(value)=>this.handlePassword(value)} 
                />
            <Text></Text>
            <Text>Confirm Password</Text>
            <Input
                style={[styles.input]}
                placeholder="********"
                secureTextEntry={true}
                onChangeText = {(value)=>this.handleConfirmPassword(value)} 
                    />
            <Text></Text>
            <Text>Role</Text>
                <RadioForm
                    radio_props={radio_props}
                    itemShowKey="label"
                    itemRealKey="value"
                    formHorizontal={true}
                    initial={0}
                    value={0}
                    onPress={(value) =>this.handleRole(value)}
                />
            <Text style={styles.errMsg}>{this.state.error}</Text>

             <Button disabled={!this.state.submitButton} // submitbtn value is true then the button will be disabled
              style={this.state.passValidate && this.state.emailValidate && this.state.numValidate
                && this.state.fnameValidate && this.state.lnameValidate? styles.enabled : styles.disabled}//passBtn and emailBtn helps the button to define the css to use if both are true then and then the css of enable will be applied
              onPress={()=> this.handleSubmit()}
              >Sign Up</Button> 
              
              <View style={styles.signupTextCont}>
                  <Text style={styles.signupText}>Already have account?</Text>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}><Text style={styles.signupButton}> Login</Text></TouchableOpacity>
              </View>
        </View>
        </ImageBackground>
      </View>
        );
    }
} 
const styles = StyleSheet.create({
  imgBackground:{
    height:'100%'
  },
signupTextCont:{
  padding:20,
  alignItems : "center",
  alignSelf : "center",
  justifyContent:"flex-end",
  flexDirection:"row"
},
signupText:{
    fontSize:16,
},
signupButton:{
    fontSize:20,
    justifyContent : "center",
    alignSelf : "center",
    fontWeight:'500',
},
input:{
  height:'4%'
},
errMsg:{
  fontWeight:'bold',
  color:'red'
},
success:{
    borderColor:'#006400',
},
title:{
    justifyContent:'center',
    alignContent:'center',
    fontSize:25,
    fontWeight:'bold',
},
container:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    paddingLeft:50,
    paddingRight:50
},
enabled:{
  backgroundColor:'#21A656',
  justifyContent : "center",
  alignItems : "center",
  width : '100%',
  alignSelf : "center",
  textAlign : "center",
},
disabled:{
  backgroundColor:'#90d3ab',
  justifyContent : "center",
  alignItems : "center",
  width : '100%',
  alignSelf : "center",
  textAlign : "center",
  opacity:0.5,
  color:'black'
},
  role:{
    flexDirection: 'row',
    borderColor:'black',
    borderRadius:3,
  }
  })