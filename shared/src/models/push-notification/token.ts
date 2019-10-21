import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

export interface IToken {
    pushToken: string;
}

@jsonObject
export class Token {
    @jsonMember
    public pushToken: string;

    constructor(
        pushToken?: string
    ) {
        this.pushToken = pushToken || '';
    }
}

export const tokenSerializer = new TypedJSON(Token);
