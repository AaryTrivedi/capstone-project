import axios from "axios";
import { getToken } from "../helpers/Token";

const API_URL =
    Platform.OS === "android"
        ? "http://192.168.0.158:4000"
        : "http://localhost:4000";

export async function getCurrentUserNotifications() {
    const token = await getToken();
    try {
        const request = await axios.get(
            `${API_URL}/notifications`,
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
export async function updateSeen(id) {
    const token = await getToken();
    try {
        const request = await axios.post(
            `${API_URL}/notifications/update/${id}`,
            {seen:true},
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