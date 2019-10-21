import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';

export enum UserType {
    STUDENT = 'student',
    TEACHER = 'teacher',
    UNKNOWN = 'unknown',
}

export interface IUser {
    name: string;
    userType: string;
    authToken: string;
    virtualClassroomUid: string;
}

@jsonObject
export class User {
    @jsonMember
    name: string;

    @jsonMember
    authToken: string;

    @jsonMember
    userType: UserType;

    @jsonMember
    virtualClassroomUid: string;

    constructor(
        name?: string,
        authToken?: string,
        userType?: UserType,
        virtualClassroomUid?: string
    ) {
        this.name = name || '';
        this.authToken = authToken || '';
        this.userType = userType || UserType.UNKNOWN;
        this.virtualClassroomUid = virtualClassroomUid || '';
    }
}

export const userSerializer = new TypedJSON(User);
