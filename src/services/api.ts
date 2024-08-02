import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-eli.vercel.app',
})

export default api;