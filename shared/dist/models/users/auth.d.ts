import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
export interface IAuthInfo {
    userId: string;
    authToken: string;
    pushToken: string;
}
export declare class AuthInfo {
    userId: string;
    authToken: string;
    pushToken: string;
    constructor(userId?: string, authToken?: string, pushToken?: string);
}
export declare const authSerializer: TypedJSON<AuthInfo>;
