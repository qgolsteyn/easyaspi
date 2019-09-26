import axios from 'axios';

const URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});
