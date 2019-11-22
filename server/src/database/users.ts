import * as mongoose from 'mongoose';

import { IUser } from '@shared/index';

export type IUserSchema = IUser & mongoose.Document;

const UserSchema = new mongoose.Schema({
    achievements: {
        type: [String],
    },
    email: {
        type: String,
    },
    id: {
        required: true,
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    pushToken: {
        type: String,
    },
    registered: {
        required: true,
        type: Boolean,
    },
    userType: {
        type: String,
    },
    virtualClassroomUid: {
        type: String,
    },
});

export const UserModel = mongoose.model<IUserSchema>('users', UserSchema);
