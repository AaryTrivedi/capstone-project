import axios from 'axios';

export async function approvedDriversList() {
    const token = localStorage.getItem('token')
    try {
        const request = await axios.get(
            `http://localhost:4000/users/approved-driver-details-list`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        // return [request.data.data[0], null];
        return request.data
    } catch (e) {
        return [null, e.message];
    }
}
export async function pendingDriversList() {
    const token = localStorage.getItem('token')
    try {
        const request = await axios.get(
            `http://localhost:4000/users/pending-driver-details-list`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        // return [request.data.data[0], null];
        return request.data
    } catch (e) {
        return [null, e.message];
    }
}