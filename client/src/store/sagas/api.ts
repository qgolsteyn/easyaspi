import axios from 'axios';

export const baseApi = axios.create({
    baseURL: 'https://easyaspi-256520.appspot.com',
});
