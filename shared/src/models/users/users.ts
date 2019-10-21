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
    virtualClassroomUid: string;
}

@jsonObject
export class User {
    @jsonMember
    name: string;

    @jsonMember
    userType: UserType;

    @jsonMember
    virtualClassroomUid: string;

    constructor(
        name?: string,
        userType?: UserType,
        virtualClassroomUid?: string
    ) {
        this.name = name || '';
        this.userType = userType || UserType.UNKNOWN;
        this.virtualClassroomUid = virtualClassroomUid || '';
    }
}

export const userSerializer = new TypedJSON(User);
