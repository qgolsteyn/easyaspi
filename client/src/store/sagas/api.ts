import axios from 'axios';

import { SERVER_URL } from 'react-native-dotenv';

export const baseApi = axios.create({
    baseURL: 'http://192.168.1.13:8080',
});
