import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';

export interface IAuthInfo {
    userId: string;
    authToken: string;
    pushToken: string;
}

@jsonObject
export class AuthInfo {
    @jsonMember
    userId: string;

    @jsonMember
    authToken: string;

    @jsonMember
    pushToken: string;

    constructor(userId?: string, authToken?: string, pushToken?: string) {
        this.userId = userId || '';
        this.authToken = authToken || '';
        this.pushToken = pushToken || '';
    }
}

export const authSerializer = new TypedJSON(AuthInfo);
