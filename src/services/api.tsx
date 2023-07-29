import axios from 'axios';

export const application = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 6000
})