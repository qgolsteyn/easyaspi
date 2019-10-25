import axios from 'axios';

import { SERVER_URL } from 'react-native-dotenv';

export const baseApi = axios.create({
    baseURL: SERVER_URL,
});
