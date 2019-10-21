import axios from 'axios';

export const baseApi = axios.create({
    baseURL: 'http://192.168.0.107:3000',
});
