import axios from 'axios';

const URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: 'http://128.189.76.139:3000',
});
