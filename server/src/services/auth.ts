import axios from 'axios';
import { decode } from 'jsonwebtoken';

export interface IAuthInfo {
    aud: string;
    sub: number;
    email: string;
    email_verified: boolean;
    name: string;
}

export const verifyAuthToken = async (token: string) => {
    try {
        await axios.get(
            'https://oauth2.googleapis.com/tokeninfo?id_token=' + token
        );
    } catch (e) {
        throw new Error('Invalid token');
    }
};

export const getAuthInfo = (token: string) => {
    const data = decode(token) as IAuthInfo;

    if (
        data.aud !==
        '1045897314106-fds1dsf16nesvidoscda541jq3rt2622.apps.googleusercontent.com'
    ) {
        throw new Error('Invalid token');
    }

    return data;
};
