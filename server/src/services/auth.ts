import axios from 'axios';
import Boom from 'boom';
import { decode, sign } from 'jsonwebtoken';

export interface IAuthInfo {
    aud: string;
    sub: number;
    email: string;
    email_verified: boolean;
    name: string;
}

export interface IAccessTokenPayload {
    sub: string;
    registered: boolean;
    userType?: string;
    virtualClassroomUid?: string;
}

export const verifyAuthToken = async (token: string) => {
    try {
        await axios.get(
            'https://oauth2.googleapis.com/tokeninfo?id_token=' + token
        );
    } catch (e) {
        throw Boom.badRequest('Token is invalid');
    }
};

export const getAuthInfo = (token: string) => {
    const data = decode(token) as IAuthInfo;

    if (
        data.aud !==
        '1045897314106-fds1dsf16nesvidoscda541jq3rt2622.apps.googleusercontent.com'
    ) {
        throw Boom.badRequest('Token is invalid');
    }

    return data;
};

export const generateAccessToken = (
    accessTokenPayload: IAccessTokenPayload
) => {
    return sign(accessTokenPayload, 'easyaspi');
};
