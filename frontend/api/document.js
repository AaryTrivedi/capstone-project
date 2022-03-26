import axios from 'axios';
import { getToken } from '../helpers/Token';

const API_URL =
    Platform.OS === "android"
        ? "http://192.168.0.158:4000"
        : "http://localhost:4000";


export async function uploadDocument(formData) {
    const token = await getToken();
    try {
        fetch(
            "http://localhost:4000/document/upload",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
            .then(function (response) {
                //handle success
                return response
                // console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    } catch (e) {
        return e.message;
    }
}

export async function uploadImage(formData) {
    const token = await getToken();
    try {
        fetch(
            "http://localhost:4000/document/uploadimage",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
            .then(function (response) {
                return response
                //handle success
                // console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    } catch (e) {
        return e.message;
    }
}
