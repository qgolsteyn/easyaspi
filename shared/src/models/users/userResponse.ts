import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';

import { IUser, User } from './users';

export interface IUserCreationResponse {
    id: string;
    user: IUser;
}

@jsonObject
export class UserCreationResponse {
    @jsonMember
    id: string;

    @jsonMember
    user: User;

    constructor(id?: string, user?: User) {
        this.id = id || '';
        this.user = user || new User();
    }
}

export const userCreationResponseSerializer = new TypedJSON(
    UserCreationResponse
);
