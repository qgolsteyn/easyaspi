import { UserModel } from '@server/database';

import { IUser } from '@shared/index';

import { IAuthInfo } from './auth';

export const getRegisteredUser = async (authInfo: IAuthInfo) => {
    const user = await UserModel.findOne({ id: String(authInfo.sub) });

    if (user && user.registered) {
        return user as IUser;
    } else {
        return undefined;
    }
};
