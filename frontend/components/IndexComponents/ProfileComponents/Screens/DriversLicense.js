import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Button, Image,Document} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function DriverLicense({navigation}) {
    const [image, setImage] = useState(null);
    const [document,setDocument] = useState(null)
    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMedialibraryPermission
            const { status1 } = await DocumentPicker.requestMedialibraryPermission
            if (status !== 'granted'|| status1 !== 'granted') {
                alert('Permisson denied!')
            }
        }
    }, [])
    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)
        if(!result.cancelled){
            setImage(result.uri)
        }
    }
    const PickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
           
        })
        console.log(result)
        if (!result.cancelled) {
            setDocument(result.uri)
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Choose Image" onPress={PickImage} />
            {image && <Image source={{uri:image}} 
            style={{width:200,height:200}}/>}
            <Button title="Choose Document" onPress={PickDocument} />
            {document && <Document source={{ uri: document }}
                style={{ width: 200, height: 200 }} />}
            <StatusBar style="auto" />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
