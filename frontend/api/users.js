import axios from 'axios';
import { GetCurrentLocation } from '../components/IndexComponents/HomeComponent/GetCurrentLocation';
import { getToken } from '../helpers/Token';

const API_URL =
    Platform.OS === "android"
        ? "http://192.168.0.158:4000"
        : "http://localhost:4000";

export async function getUserById(userId){
    const token = await getToken()
    try {
        const request = await axios.get(
            `${API_URL}/users/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function createReview(reviewDetails) {
    const token = await getToken();
    try {
        const request = await axios.post(
            `${API_URL}/users/review`,
            reviewDetails,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function getReviewsOfUser(userId) {
    const token = await getToken();
    try {
        const request = await axios.get(
            `${API_URL}/users/${userId}/reviews`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return [request, null];
    } catch (e) {
        return [null, e.message];
    }
}