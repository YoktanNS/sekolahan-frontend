import axios from 'axios';

// Membuat "kurir" khusus dengan alamat dasar API Laravel kamu
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;