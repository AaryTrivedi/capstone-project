import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function createCustomer() {
    try {
        const request = await axios.post(
            "http://192.168.0.158:4000/payments/customer",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWYxODNiNWI5ZTdiZjE0YTY5NWI4ZjIiLCJlbWFpbCI6ImFhcnl0cml2ZWRpQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFhcnkiLCJsYXN0TmFtZSI6IlRyaXZlZGkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInJvbGUiOiJwYXNzZW5nZXIiLCJkcml2ZXJEZXRhaWxzVmFsaWQiOmZhbHNlLCJfX3YiOjAsImlhdCI6MTY0MzIxODExMX0.NVTWMZjj3B9yi8Pl2VCvCZf9YySrO16gyFu4kPqSu7o"
                }
            }
        );
        return [request, null];
    } catch (e) {
        return [null, e.message];
    }
}

export async function getSetupIntentId() {
    try {
        const request = await axios.post(
            "http://192.168.0.158:4000/payments/setup",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWYxODNiNWI5ZTdiZjE0YTY5NWI4ZjIiLCJlbWFpbCI6ImFhcnl0cml2ZWRpQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFhcnkiLCJsYXN0TmFtZSI6IlRyaXZlZGkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInJvbGUiOiJwYXNzZW5nZXIiLCJkcml2ZXJEZXRhaWxzVmFsaWQiOmZhbHNlLCJfX3YiOjAsImlhdCI6MTY0MzIxODExMX0.NVTWMZjj3B9yi8Pl2VCvCZf9YySrO16gyFu4kPqSu7o"
                }
            }
        );
        return [request.data, null];
    } catch (e) {
        return [null, e.message]
    }
}