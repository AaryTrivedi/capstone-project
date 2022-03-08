import axios from 'axios';

export async function getDocumetnByuserId(userId) {
    const token = localStorage.getItem('token')
    try {
        const request = await axios.get(`http://localhost:4000/document/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return request.data;
    } catch (e) {
        return [null, e.message];
    }
}