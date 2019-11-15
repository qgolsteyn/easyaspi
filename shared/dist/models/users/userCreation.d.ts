import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
import { IUser, User } from './users';
export interface IUserCreation {
    authToken: string;
    pushToken: string;
    classroomName: string;
    classroomPasscode: string;
    user: IUser;
}
export declare class UserCreation {
    authToken: string;
    pushToken: string;
    classroomName: string;
    classroomPasscode: string;
    user: User;
    constructor(authToken?: string, pushToken?: string, classroomName?: string, classroomPasscode?: string, user?: User);
}
export declare const userCreationSerializer: TypedJSON<UserCreation>;
