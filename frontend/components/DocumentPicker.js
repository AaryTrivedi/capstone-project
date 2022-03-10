import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, } from 'react-native';
import { Input } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getUser } from '../helpers/user';
import { uploadDocument } from '../api/document'
import { getToken } from '../helpers/Token';
import axios from 'axios';

export default function DocumentPickerExample() {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [doc, setDoc] = useState(null);
    const [userId, setUserId] = useState();
    const [uploading, startUploading] = useState(false);
    useEffect(() => {
        (async () => {
            await getUser().then((user) => setUserId(user._id))
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
    //         if (response.type == 'success') {
    //             let { name } = response;
    //             var photoToUpload = {
    //                 docuemntName: name,
    //                 documentType: "profilePhoto"
    //             };
    //             setDoc(photoToUpload)
    //             const url = "http://localhost:4000/document/upload";

    //             const formData = new FormData();
    //             formData.append('document', doc);

    //             console.log(formData)
    //             // uploadDocument(formData).then((response) => console.log(response))
    //         }
    //     });
    //     console.log(result)
    // }
    const pickFile = async (type) => {
        try {
            const token = await getToken()
            let result = await DocumentPicker.getDocumentAsync({})
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
            formData.append('type', type)
            uploadDocument(formData)
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick a Licence from mobile" onPress={()=>pickFile('Licence')} />
            <View style={{ height: 50 }} />

            <Button title="Pick a Insurance from mobile" onPress={()=>pickFile('Insurance')} />
            <View style={{ height: 50 }} />

            <Button title="Pick a Workpermit from mobile" onPress={()=>pickFile('Workpermit')} />
            <View style={{ height: 50 }} />

            <Button title="Pick a profilePhoto from mobile" onPress={pickImage} />
            <View style={{ height: 50 }} />
        </View>
    );
}