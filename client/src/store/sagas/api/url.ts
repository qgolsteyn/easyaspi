import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';

export const baseApi = axios.create({
    baseURL: 'http://128.189.75.140:8080',
});
