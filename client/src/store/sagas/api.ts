import axios from 'axios';

export const baseApi = axios.create({
    baseURL: 'http://128.189.72.139:3000',
});
