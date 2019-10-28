import axios from 'axios';
import Boom from 'boom';
import { decode, sign, verify } from 'jsonwebtoken';

import { getUserFromId } from './user';

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

export const getAuthTokenInfo = (token: string) => {
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

export const verifyAccessToken = async (accessToken: string) => {
    const accessTokenPayload = verify(
        accessToken,
        'easyaspi'
    ) as IAccessTokenPayload;

    const user = await getUserFromId(accessTokenPayload.sub);

    if (
        user &&
        user.id === accessTokenPayload.sub &&
        user.registered === accessTokenPayload.registered &&
        user.virtualClassroomUid === accessTokenPayload.virtualClassroomUid &&
        user.userType === accessTokenPayload.userType
    ) {
        return user;
    } else {
        throw Boom.unauthorized();
    }
};
