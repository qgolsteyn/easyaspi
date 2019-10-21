import axios from 'axios';

<<<<<<< Updated upstream
const URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
=======
export const baseApi = axios.create({
    baseURL: 'http://192.168.0.107:3000',
>>>>>>> Stashed changes
});
