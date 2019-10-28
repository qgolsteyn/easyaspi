import Boom from 'boom';

import { UserModel } from '@server/database';
import { cleanMongoDocument } from '@server/utils/mongo';

import { IUser } from '@shared/index';

import { IAuthInfo } from './auth';

export const createUserFromAuthInfo = async (authInfo: IAuthInfo) => {
    const user = new UserModel({
        email: authInfo.email,
        id: String(authInfo.sub),
        name: authInfo.name,
        registered: false,
    });
    await user.save();

    return cleanMongoDocument(user) as IUser;
};

export const updateUser = async (userPayload: IUser) => {
    const user = await UserModel.findOne({ id: userPayload.id });

    if (user) {
        user.name = userPayload.name || user.name;
        user.email = userPayload.email || user.email;
        user.pushToken = userPayload.pushToken || user.pushToken;

        if (!user.userType) {
            user.userType = userPayload.userType;
        } else {
            throw Boom.badRequest('Cannot change userType once it is set');
        }

        if (!user.virtualClassroomUid) {
            user.virtualClassroomUid = userPayload.virtualClassroomUid;
        } else {
            throw Boom.badRequest(
                'Cannot change virtual classroom id once it is set'
            );
        }

        if (
            user.name &&
            user.email &&
            user.pushToken &&
            user.userType &&
            user.virtualClassroomUid
        ) {
            user.registered = true;
        } else {
            user.registered = false;
        }

        await user.save();

        return cleanMongoDocument(user) as IUser;
    } else {
        throw Boom.internal('Provided an invalid user id');
    }
};

export const getUserFromId = async (id: string) => {
    const user = await UserModel.findOne({ id });

    if (user) {
        const userObj = cleanMongoDocument(user);
        return userObj as IUser;
    } else {
        return undefined;
    }
};
