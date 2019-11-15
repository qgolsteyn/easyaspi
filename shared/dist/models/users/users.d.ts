import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
export declare enum UserType {
    STUDENT = "student",
    TEACHER = "teacher",
    UNKNOWN = "unknown"
}
export interface IUser {
    name: string;
    userType: string;
    virtualClassroomUid: string;
}
export declare class User {
    name: string;
    userType: UserType;
    virtualClassroomUid: string;
    constructor(name?: string, userType?: UserType, virtualClassroomUid?: string);
}
export declare const userSerializer: TypedJSON<User>;
