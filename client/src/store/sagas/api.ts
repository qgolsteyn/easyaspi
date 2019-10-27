import axios from 'axios';

import { SERVER_URL } from 'react-native-dotenv';

export const baseApi = axios.create({
    baseURL: 'http://192.168.0.107:8080',
});
