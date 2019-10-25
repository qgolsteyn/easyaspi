import * as mongoose from 'mongoose';

import { IAuthInfo } from '@shared/index';

export type IAuthInfoSchema = IAuthInfo & mongoose.Document;

const AuthInfoSchema = new mongoose.Schema({
    authToken: {
        required: true,
        type: String,
        unique: true,
    },
    pushToken: {
        required: true,
        type: String,
    },
    userId: {
        required: true,
        type: String,
        unique: true,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const AuthInfoModel = mongoose.model<IAuthInfoSchema>(
    'auths',
    AuthInfoSchema
);
