import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

export interface IMessage {
    message: string;
}

@jsonObject
export class Message {
    @jsonMember
    public message: string;

    constructor(
        message?: string
    ) {
        this.message = message || '';
    }
}

export const messageSerializer = new TypedJSON(Message);
