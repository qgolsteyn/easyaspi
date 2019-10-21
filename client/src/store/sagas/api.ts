import axios from 'axios';

export const baseApi = axios.create({
    baseURL: 'http://128.189.72.168:3000',
});
