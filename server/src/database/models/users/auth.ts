import * as mongoose from 'mongoose';

import { IAuthInfo } from 'shared';

export type IAuthInfoSchema = IAuthInfo & mongoose.Document;

const AuthInfoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    authToken: {
        type: String,
        required: true,
        unique: true,
    },
    pushToken: {
        type: String,
        unique: true,
        required: true,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const AuthInfoModel = mongoose.model<IAuthInfoSchema>(
    'auth',
    AuthInfoSchema
);
