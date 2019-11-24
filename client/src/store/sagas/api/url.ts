import axios from 'axios';
import Constants from 'expo-constants';
import { SERVER_URL } from 'react-native-dotenv';

const { manifest } = Constants;
const localip =
    typeof manifest.packagerOpts === `object` && manifest.debuggerHost
        ? `http://${manifest.debuggerHost.split(`:`).shift()}:8080`
        : 'http://localhost:8080';

export const baseApi = axios.create({
    baseURL: __DEV__ ? localip : SERVER_URL,
    timeout: 3000,
});
