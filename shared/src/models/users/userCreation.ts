import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';

import { IUser, User } from './users';

export interface IUserCreation {
    classroomName: string;
    classroomPasscode: string;
    user: IUser;
}

@jsonObject
export class UserCreation {
    @jsonMember
    classroomName: string;

    @jsonMember
    classroomPasscode: string;

    @jsonMember
    user: User;

    constructor(
        classroomName?: string,
        classroomPasscode?: string,
        user?: User
    ) {
        this.classroomName = classroomName || '';
        this.classroomPasscode = classroomPasscode || '';
        this.user = user || new User();
    }
}

export const userCreationSerializer = new TypedJSON(UserCreation);
