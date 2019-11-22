import axios from 'axios';
import Boom from 'boom';
import { decode, sign, verify } from 'jsonwebtoken';

import * as errors from '@shared/errors';

import { getUserFromId } from './userService';

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
            'https://oauth2.googleapis.com/tokeninfo?id_token=' + token,
        );
    } catch (e) {
        throw Boom.badRequest(errors.AUTH);
    }
};

export const getAuthTokenInfo = (token: string) => {
    const data = decode(token) as IAuthInfo;

    if (data.aud !== process.env.CLIENT_ID) {
        throw Boom.badRequest(errors.AUTH);
    }

    return data;
};

export const generateAccessToken = (
    accessTokenPayload: IAccessTokenPayload,
) => {
    if (process.env.ACCESS_TOKEN_SECRET === undefined) {
        throw Boom.internal(errors.INTERNAL);
    }

    return sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyAccessToken = async (accessToken: string) => {
    if (process.env.ACCESS_TOKEN_SECRET === undefined) {
        throw Boom.internal(errors.INTERNAL);
    }

    try {
        const accessTokenPayload = verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
        ) as IAccessTokenPayload;

        const user = await getUserFromId(accessTokenPayload.sub);

        if (
            user &&
            user.id === accessTokenPayload.sub &&
            user.registered === accessTokenPayload.registered &&
            user.userType === accessTokenPayload.userType
        ) {
            return user;
        } else {
            throw Boom.unauthorized(errors.AUTH);
        }
    } catch (e) {
        throw Boom.unauthorized(errors.AUTH);
    }
};
