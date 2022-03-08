import axios from 'axios';
import * as Loc from "expo-location";
import { GetCurrentLocation } from '../components/IndexComponents/HomeComponent/GetCurrentLocation';
import { getToken } from '../helpers/Token';
import { getUser } from '../helpers/user'

const API_URL =
    Platform.OS === "android"
        ? "http://192.168.0.158:4000"
        : "http://localhost:4000";


export async function uploadDocument(userId,documentUri) {
    const token = await getToken();
    try {
        const request = await axios.post(
            `${API_URL}/document/upload/${userId}`,
            {
                documentUri
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request.data, null];
    } catch (e) {
        return [null, e.message];
    }
}
