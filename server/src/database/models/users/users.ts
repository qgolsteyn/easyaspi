import * as mongoose from 'mongoose';

import { IUser } from '@shared/index';

export type IUserSchema = IUser & mongoose.Document;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    virtualClassroomUid: {
        type: String,
        required: true,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const UserModel = mongoose.model<IUserSchema>('users', UserSchema);
