import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';

import { IUser, User } from './users';

export interface IUserCreation {
    authToken: string;
    pushToken: string;
    classroomName: string;
    classroomPasscode: string;
    user: IUser;
}

@jsonObject
export class UserCreation {
    @jsonMember
    authToken: string;

    @jsonMember
    pushToken: string;

    @jsonMember
    classroomName: string;

    @jsonMember
    classroomPasscode: string;

    @jsonMember
    user: User;

    constructor(
        authToken?: string,
        pushToken?: string,
        classroomName?: string,
        classroomPasscode?: string,
        user?: User
    ) {
        this.authToken = authToken || '';
        this.pushToken = pushToken || '';
        this.classroomName = classroomName || '';
        this.classroomPasscode = classroomPasscode || '';
        this.user = user || new User();
    }
}

export const userCreationSerializer = new TypedJSON(UserCreation);
