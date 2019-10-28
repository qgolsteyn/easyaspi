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

export const getUserFromAuthInfo = async (authInfo: IAuthInfo) => {
    console.log(String(authInfo.sub));
    const user = await UserModel.findOne({ id: String(authInfo.sub) });

    if (user) {
        const userObj = cleanMongoDocument(user);
        return userObj as IUser;
    } else {
        return undefined;
    }
};
