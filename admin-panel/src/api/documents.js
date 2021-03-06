import axios from 'axios';

export async function getDocumentByuserId(userId) {
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
        return  e.message;
    }
}