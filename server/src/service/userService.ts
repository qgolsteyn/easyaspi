import Boom from 'boom';
import Expo from 'expo-server-sdk';

import { UserModel } from '@server/database';
import { cleanMongoDocument } from '@server/service/utils/mongo';

import { IUser } from '@shared/index';

import { IAuthInfo } from './authService';

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
                'Cannot change virtual classroom id once it is set',
            );
        }

        if (!user.achievements) {
            user.achievements = [];
        }

        user.registered = !!(user.name &&
            user.email &&
            user.userType &&
            user.virtualClassroomUid);

        await user.save();

        return cleanMongoDocument(user) as IUser;
    } else {
        throw Boom.badRequest('Provided an invalid user id');
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

export const sendPushNotification = async (
    message: string,
    pushToken: string,
) => {
        const expo = new Expo();
        await expo.sendPushNotificationsAsync([
            {
                body: message,
                title: 'New Notification',
                to: pushToken,
            },
        ]);
};
