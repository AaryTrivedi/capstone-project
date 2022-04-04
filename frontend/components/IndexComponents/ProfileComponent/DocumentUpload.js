import React, { useState, useEffect } from 'react';
import { Dimensions,Platform, View,ScrollView, TouchableOpacity, ImageBackground,Image,StyleSheet } from 'react-native';
import { Heading,Button,Text } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { uploadDocument ,uploadImage} from '../../../api/document'
import {getUser} from '../../../helpers/user'

export default function DocumentUpload({navigation}) {
  const win = Dimensions.get('window');
  const [workDoc, setWorkDoc] = useState(null);
  const [profile, setProfile] = useState(null);
  const [licence, setLicence] = useState(null);
  const [image,setImage]=useState()
  const [insuranceDoc, setInsuranceDoc] = useState();
  const [uploading, setUploading] = useState(false);
  const [varification,setVarification] = useState(false)
  const [errors, setErrors] = useState({
    workDocError: " ",
    profileError: " ",
    licenceError: " ",
    insuranceDocError: " ",
    profileError:" "
  })
  useEffect(() => {
    (async () => {
      const user = await getUser()
      setVarification(user.driverDetailsValid)
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickDoc = async (type) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({})
      if (result.type === 'cancel') {
        console.log(result)
      }
      else {
        let { name, size, uri } = result;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        let fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };
        let formData = new FormData();
        formData.append('file', fileToUpload)

        if (type === 'Workpermit') {
          formData.append('type', type)
          setWorkDoc(formData)
        }

        if (type === 'Licence') {
          formData.append('type', type)
          setLicence(formData)
        }

        if (type === 'Insurance') {
          formData.append('type', type)
          setInsuranceDoc(formData)
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let { uri, type } = result;
    let uriParts = uri.split('/ImagePicker/')
    let name = uriParts[uriParts.length - 1]

    let fileToUpload = {
      name: name,
      uri: uri,
      type: "application/" + type
    };

    let formData = new FormData();
    formData.append('myimage', fileToUpload)
    setProfile(formData)
    if (!result.cancelled) {
      setImage(result.uri)
    }

  };


  useEffect(() => {
    if (workDoc === null) {
      setErrors({
        ...errors,
        workDocError: "Please Provide work document",
      });
    }
    else if(workDoc){
        if(insuranceDoc){
            if (workDoc._parts[0][1].name === insuranceDoc._parts[0][1].name) {
              setErrors({
                ...errors,
                workDocError: "work Document and Insurance can not be same",
              });
            }
            else {
              setErrors({
                ...errors,
                workDocError: "",
              });
            }
        }
        else if (licence) {
          if (workDoc._parts[0][1].name === licence._parts[0][1].name) {
            setErrors({
              ...errors,
              workDocError: "Work Document and Licence can not be same",
            });
          }
          else {
            setErrors({
              ...errors,
              workDocError: "",
            });
          }
        }
        else {
          setErrors({
            ...errors,
            workDocError: "",
          });
        }
      }
    else {
      setErrors({
        ...errors,
        workDocError: "",
      });
    }
  },[workDoc])

  useEffect(() => {
    if (insuranceDoc === null) {
      setErrors({
        ...errors,
        insuranceDocError: "Please Provide Insurance document",
      });
    }
    else if (insuranceDoc){
    if (workDoc) {
      if (insuranceDoc._parts[0][1].name === workDoc._parts[0][1].name) {
        setErrors({
          ...errors,
          insuranceDocError: "Insurance and Work Document can not be same",
        });
      }
      else {
        setErrors({
          ...errors,
          insuranceDocError: "",
        });
      }
    }
    else if (licence) {
      if (insuranceDoc._parts[0][1].name === licence._parts[0][1].name) {
        setErrors({
          ...errors,
          insuranceDocError: "Insurance and Licence can not be same",
        });
      }
      else {
        setErrors({
          ...errors,
          insuranceDocError: "",
        });
      }
    }
    else {
      setErrors({
        ...errors,
        insuranceDocError: "",
      });
    }
  }
    else {
      setErrors({
        ...errors,
        insuranceDocError: "",
      });
    }
  }, [insuranceDoc])

  useEffect(() => {
    if (licence === null) {
      setErrors({
        ...errors,
        licenceError: "Please Provide Licence",
      });
    }
    else if(licence){
      if (workDoc) {
        if (licence._parts[0][1].name===workDoc._parts[0][1].name) {
          setErrors({
            ...errors,
            licenceError: "Licence and Work permit can not be same",
          });
        }
        else {
          setErrors({
            ...errors,
            licenceError: ""
          });
        }
      }
      else if (licence && insuranceDoc) {
        if (licence._parts[0][1].name === insuranceDoc._parts[0][1].name) {
          setErrors({
            ...errors,
            licenceError: "Licence and Insurance can not be same",
          });
        }
        else {
          setErrors({
            ...errors,
            licenceError: ""
          });
        }
      }
      else {
        setErrors({
          ...errors,
          licenceError: ""
        });
      }
    }
    else{
      setErrors({
        ...errors,
        licenceError: ""
      });
    }
  }, [licence])

  useEffect(() => {
    if (profile === null) {
      setErrors({
        ...errors,
        profileError: "Please Upload Profile Picture",
      });
    } 
    else {
      setErrors({
        ...errors,
        profileError: "",
      });
    }
  },[profile])

  const isDisabled = () => {
    return (
      errors.workDocError.trim() !== "" ||
      errors.insuranceDocError.trim() !== "" ||
      errors.licenceError.trim() !== ""||
      errors.profileError.trim() !== ""
    );
  }
  const onSubmit = async() => {
    try{
      setUploading(true)
          await uploadDocument(workDoc).then(setWorkDoc(null))
          await uploadDocument(insuranceDoc).then(setInsuranceDoc(null))
          await uploadDocument(licence).then(setLicence(null))
          await uploadImage(profile).then(
          setProfile(null), 
          setImage(null),
          alert("Documents are under review Please check back later"))
          setErrors({
            workDocError: " ",
            profileError: " ",
            licenceError: " ",
            insuranceDocError: " ",
            profileError: " "
          })
          navigation.navigate("Home")
        setUploading(false)
    }
    catch(e){
      console.log(e)
      }
    }
  return (
    <ScrollView>
        <ImageBackground
          source={require('../../../assets/DocumentUpload.png')}
          style={
            { width: win.width,
              height: win.width/2,
           }}
        ></ImageBackground>
      {
      varification ? 
          <View style={style.container}>
            <Heading size={"2xl"}>Congratulations!</Heading>
            <Heading size={"md"}>Your documents have been approved</Heading>
          </View> 
      : 
      <View style={style.container}>
        <Heading size={"lg"}>Documents</Heading>

        <TouchableOpacity style={
            !errors.workDocError ?
            style.valid
            :
            style.uploadContainer
        }
          
          onPress={() => pickDoc('Workpermit')}>
          <Text style={style.text}>Proof of work Eligibility</Text>
          {workDoc && <Text style={style.uploadedDocText}>{(workDoc._parts[0][1].name)}</Text>}
        </TouchableOpacity>

            <Text fontSize={"sm"} color={"red.600"}>
              {errors.workDocError}
            </Text>

        <TouchableOpacity style={
          !errors.insuranceDocError ?
            style.valid
            :
            style.uploadContainer}
          onPress={() => pickDoc('Insurance')}>
          <Text style={style.text}>Legal Agreement</Text>
          {insuranceDoc && <Text style={style.uploadedDocText}>{(insuranceDoc._parts[0][1].name)}</Text>}
        </TouchableOpacity>

            <Text fontSize={"sm"} color={"red.600"}>
              {errors.insuranceDocError}
            </Text>

        <TouchableOpacity style={
          !errors.licenceError ?
            style.valid
            :
            style.uploadContainer}
          onPress={() => pickDoc('Licence')}>
          <Text style={style.text}>Driver Licence</Text>
          {licence && <Text style={style.uploadedDocText}>{(licence._parts[0][1].name)}</Text>}
        </TouchableOpacity>

            <Text fontSize={"sm"} color={"red.600"}>
              {errors.licenceError}
            </Text>

        <TouchableOpacity style={
          !errors.profileError ?
            style.validImageContainer :
            style.uploadContainer
        }
          onPress={() => pickImage()}>
          <View>
            <Text style={style.text}>Profile Photo</Text>
            {image && <Text style={style.uploadedDocText}>Preview:</Text>}
            {image && <Image source={{ uri: image }}
              style={{ height: 200 }} />}
          </View>
        </TouchableOpacity>

            <Text fontSize={"sm"} color={"red.600"}>
              {errors.profileError}
            </Text>

        {
          uploading ?
            <Button isLoading _loading={{
              bg: "#21A656",
              _text: {
                color: "white"
              }
            }} _spinner={{
              color: "white"
            }} isLoadingText="Uploading">
              Button
            </Button>
            :
            <Button
              width={"full"}
              colorScheme="green"
              isDisabled={isDisabled()}
              onPress={onSubmit}
            >
              Upload
            </Button>
        }
      </View>}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    padding:'3%'
  },
  uploadContainer:{
    height: 65,
    borderWidth:0.4,
    padding:5,
    marginVertical:8,
    justifyContent: "center",
  },
  text:{
    fontSize: 20,
  },
  uploadedDocText:{
    fontWeight: 'bold'
  },
  validImageContainer: {
    borderColor: "green",
    borderWidth: 1.4,
    padding: 5,
    marginVertical: 8,
    justifyContent: "center",
    borderRadius: 5
  },
  valid:{
    borderColor:"green",
    borderWidth:1.4,
    height: 65,
    padding: 5,
    marginVertical: 8,
    justifyContent: "center",
    borderRadius: 5
  },
  invalid:{
    borderColor: "red",
    borderWidth: 1.4,
    height: 65,
    padding: 5,
    marginVertical: 8,
    justifyContent: "center",
    borderRadius: 5
  }
})

